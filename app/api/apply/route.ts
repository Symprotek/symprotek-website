import { NextResponse } from "next/server";
import { companyInfo } from "@/lib/data";
import {
  validateApplication,
  validateResume,
  type ApplicationPayload,
} from "@/lib/application";
import { sendApplicationEmail, type ContactAttachment } from "@/lib/mail";

export const runtime = "nodejs";

/** Minimum time a genuine applicant takes to fill the form, in milliseconds. */
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

  const payload: ApplicationPayload = {
    name: field(form, "name"),
    email: field(form, "email"),
    phone: field(form, "phone"),
    role: field(form, "role"),
    availability: field(form, "availability"),
  };

  const errors = validateApplication(payload);

  const file = form.get("resume");
  const resumeFile = file instanceof File && file.size > 0 ? file : null;
  const resumeError = validateResume(resumeFile);
  if (resumeError) {
    errors.resume = resumeError;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const resume: ContactAttachment = {
    filename: resumeFile!.name,
    content: Buffer.from(await resumeFile!.arrayBuffer()),
  };

  try {
    await sendApplicationEmail(payload, resume);
  } catch (error) {
    console.error("Job application submission failed:", error);
    return NextResponse.json(
      {
        error: `We couldn't send your application. Please try again, or email your resume directly to ${companyInfo.email}.`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
