/**
 * Shared job-application rules. Imported by both the client form and the API
 * route so the two can never drift apart. Mirrors lib/validation.ts, which
 * covers the general contact form — kept separate because the two forms
 * have different required fields (a resume is mandatory here; the contact
 * form's attachment is optional).
 */

export const MAX_RESUME_BYTES = 10 * 1024 * 1024; // 10 MB

/** Extensions we accept for resumes. */
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

/** Ready to drop into an <input type="file" accept={...} />. */
export const RESUME_ACCEPT_ATTRIBUTE = RESUME_EXTENSIONS.join(",");

export interface ApplicationPayload {
  name: string;
  email: string;
  phone: string;
  /** The role applied for, e.g. "SMT Operator" — or "" for a general application. */
  role: string;
  /** Preferred interview date/time as submitted by <input type="datetime-local">; optional. */
  availability: string;
}

export type ApplicationErrors = Partial<
  Record<keyof ApplicationPayload | "resume", string>
>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateApplication(
  payload: ApplicationPayload,
): ApplicationErrors {
  const errors: ApplicationErrors = {};

  if (!payload.name.trim()) {
    errors.name = "Please enter your full name.";
  }

  if (!payload.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(payload.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!payload.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  }

  return errors;
}

/** Unlike the contact form's attachment, a resume is required. */
export function validateResume(file: File | null): string | null {
  if (!file) {
    return "Please attach your resume.";
  }

  const hasAcceptedExtension = RESUME_EXTENSIONS.some((extension) =>
    file.name.toLowerCase().endsWith(extension),
  );

  if (!hasAcceptedExtension) {
    return `That file type isn't supported. Please upload ${RESUME_EXTENSIONS.join(", ")}.`;
  }

  if (file.size > MAX_RESUME_BYTES) {
    return "That file is larger than 10 MB. Please email it to us directly.";
  }

  return null;
}
