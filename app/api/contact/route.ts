import { NextResponse } from "next/server";
import { companyInfo } from "@/lib/data";
import { sendContactEmail, type ContactAttachment } from "@/lib/mail";
import {
  validateAttachment,
  validateContact,
  type ContactPayload,
} from "@/lib/validation";

export const runtime = "nodejs";

/** Minimum time a genuine user takes to fill the form, in milliseconds. */
const MIN_FILL_TIME_MS = 3000;

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "We couldn't read that submission. Please try again." },
      { status: 400 },
    );
  }

  // Honeypot: hidden from real users, irresistible to bots. Return 200 so the
  // bot believes it succeeded and doesn't retry with a different shape.
  if (field(form, "website")) {
    return NextResponse.json({ ok: true });
  }

  // Timing check: a form completed faster than a human could type is a bot.
  const renderedAt = Number(field(form, "renderedAt"));
  if (
    Number.isFinite(renderedAt) &&
    renderedAt > 0 &&
    Date.now() - renderedAt < MIN_FILL_TIME_MS
  ) {
    return NextResponse.json({ ok: true });
  }

  const payload: ContactPayload = {
    name: field(form, "name"),
    company: field(form, "company"),
    email: field(form, "email"),
    phone: field(form, "phone"),
    service: field(form, "service"),
    message: field(form, "message"),
  };

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  let attachment: ContactAttachment | undefined;
  const file = form.get("attachment");
  if (file instanceof File && file.size > 0) {
    const fileError = validateAttachment(file);
    if (fileError) {
      return NextResponse.json({ errors: { file: fileError } }, { status: 400 });
    }
    attachment = {
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
    };
  }

  try {
    await sendContactEmail(payload, attachment);
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        error: `We couldn't send your message. Please try again, or email us directly at ${companyInfo.email}.`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
