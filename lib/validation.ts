/**
 * Shared contact-form rules. Imported by both the client form and the API
 * route so the two can never drift apart.
 */

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB

/** Extensions we accept for BOMs, Gerber archives, and drawings. */
export const ACCEPTED_EXTENSIONS = [
  ".xls",
  ".xlsx",
  ".csv",
  ".pdf",
  ".zip",
] as const;

/** Ready to drop into an <input type="file" accept={...} />. */
export const ACCEPT_ATTRIBUTE = ACCEPTED_EXTENSIONS.join(",");

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload | "file", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  if (!payload.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!payload.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(payload.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!payload.message.trim()) {
    errors.message = "Please tell us about your project.";
  } else if (payload.message.trim().length < 10) {
    errors.message = "Please add a little more detail (at least 10 characters).";
  }

  return errors;
}

export function validateAttachment(file: File): string | null {
  const hasAcceptedExtension = ACCEPTED_EXTENSIONS.some((extension) =>
    file.name.toLowerCase().endsWith(extension),
  );

  if (!hasAcceptedExtension) {
    return `That file type isn't supported. Please upload ${ACCEPTED_EXTENSIONS.join(", ")}.`;
  }

  if (file.size > MAX_ATTACHMENT_BYTES) {
    return "That file is larger than 10 MB. Please email it to us directly.";
  }

  return null;
}
