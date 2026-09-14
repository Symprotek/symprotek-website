import { Resend } from "resend";
import { companyInfo } from "@/lib/data";
import type { ContactPayload } from "@/lib/validation";

/**
 * Thin wrapper around the mail provider. The API route only ever calls
 * sendContactEmail(), so swapping Resend for SendGrid/HubSpot later touches
 * this file and nothing else.
 */

export interface ContactAttachment {
  filename: string;
  content: Buffer;
}

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || companyInfo.email;
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Symprotek Website <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  if (!value.trim()) return "";
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#5b6879;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:6px 0;color:#132c54;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`;
}

function internalHtml(payload: ContactPayload, attachmentName?: string) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;">
    <h2 style="color:#132c54;font-size:18px;margin:0 0 4px;">New website enquiry</h2>
    <p style="color:#5b6879;font-size:13px;margin:0 0 20px;">
      Submitted from the symprotek.com contact form.
    </p>
    <table style="border-collapse:collapse;width:100%;">
      ${row("Name", payload.name)}
      ${row("Company", payload.company)}
      ${row("Email", payload.email)}
      ${row("Phone", payload.phone)}
      ${row("Service", payload.service)}
      ${attachmentName ? row("Attachment", attachmentName) : ""}
    </table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e5e5;">
      <div style="color:#5b6879;font-size:13px;margin-bottom:6px;">Message</div>
      <div style="color:#132c54;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
    </div>
  </div>`;
}

function autoReplyHtml(payload: ContactPayload) {
  const firstName = payload.name.trim().split(/\s+/)[0] || "there";
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;color:#132c54;">
    <p style="font-size:15px;line-height:1.6;">Hi ${escapeHtml(firstName)},</p>
    <p style="font-size:15px;line-height:1.6;">
      Thanks for reaching out to Symprotek. We've received your message and a
      member of our team will get back to you shortly.
    </p>
    <p style="font-size:15px;line-height:1.6;">
      If your request is urgent, call us directly at
      <a href="tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}" style="color:#e2231a;">${companyInfo.phone}</a>.
    </p>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e5e5;color:#5b6879;font-size:13px;line-height:1.6;">
      <strong style="color:#132c54;">${companyInfo.name}</strong><br />
      ${companyInfo.address}<br />
      ${companyInfo.phone}
    </div>
  </div>`;
}

/**
 * Sends the internal notification and the customer auto-reply.
 *
 * Throws if the internal notification fails — the caller must surface that to
 * the user rather than showing a false success. A failed auto-reply is logged
 * but not thrown: the lead is already captured, which is what matters.
 */
export async function sendContactEmail(
  payload: ContactPayload,
  attachment?: ContactAttachment,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const resend = new Resend(apiKey);
  const subject = payload.company.trim()
    ? `Website enquiry: ${payload.name} (${payload.company})`
    : `Website enquiry: ${payload.name}`;

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: payload.email,
    subject,
    html: internalHtml(payload, attachment?.filename),
    attachments: attachment
      ? [{ filename: attachment.filename, content: attachment.content }]
      : undefined,
  });

  if (error) {
    throw new Error(error.message || "Failed to send the enquiry email.");
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      replyTo: TO_EMAIL,
      subject: "Symprotek Corporation: We've received your message",
      html: autoReplyHtml(payload),
    });
  } catch (autoReplyError) {
    console.error("Contact auto-reply failed:", autoReplyError);
  }
}
