"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, type FormEvent } from "react";
import { AlertCircle, FileText, Loader2, Paperclip, X } from "lucide-react";
import { companyInfo } from "@/lib/data";
import {
  RESUME_ACCEPT_ATTRIBUTE,
  validateApplication,
  validateResume,
  type ApplicationErrors,
  type ApplicationPayload,
} from "@/lib/application";

/* `.field` (globals.css) carries the 44px min-height and the 16px mobile font
   size that stops iOS zooming the page when a field takes focus. */
const FIELD_CLASS = "field";
const ERROR_FIELD_CLASS = "field field-error";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-red">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

interface ApplicationFormProps {
  /** Carried from the Careers page's "Apply for this role" link; "" for a general application. */
  role?: string;
}

export default function ApplicationForm({ role = "" }: ApplicationFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [renderedAt, setRenderedAt] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set on mount rather than at render so it reflects when the applicant
  // actually saw the form. Read by the API route's bot-timing check.
  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const clearFile = () => {
    setFile(null);
    setErrors((current) => ({ ...current, resume: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (selected: File | undefined) => {
    if (!selected) {
      clearFile();
      return;
    }
    const fileError = validateResume(selected);
    if (fileError) {
      setErrors((current) => ({ ...current, resume: fileError }));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setErrors((current) => ({ ...current, resume: undefined }));
    setFile(selected);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ApplicationPayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
      availability: String(formData.get("availability") ?? "").trim(),
    };

    const clientErrors = validateApplication(payload);
    const resumeError = validateResume(file);
    if (resumeError) clientErrors.resume = resumeError;

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setSubmitError(
            result.error ??
              `Something went wrong. Please try again, or email your resume to ${companyInfo.email}.`,
          );
        }
        setIsSubmitting(false);
        return;
      }

      router.push("/thank-you");
    } catch {
      setSubmitError(
        "We couldn't reach the server. Please check your connection and try again.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-xl bg-white p-6 shadow-soft lg:col-span-3"
    >
      <input type="hidden" name="renderedAt" value={renderedAt} />
      <input type="hidden" name="role" value={role} />

      {/* Honeypot — hidden from users and screen readers, visible to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {role && (
        <p className="text-sm font-medium text-brand-gray">
          Applying for: <span className="text-brand-dark">{role}</span>
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-brand-dark">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={errors.name ? ERROR_FIELD_CLASS : FIELD_CLASS}
          />
          <FieldError message={errors.name} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-brand-dark">
            Phone <span className="text-brand-red">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={errors.phone ? ERROR_FIELD_CLASS : FIELD_CLASS}
          />
          <FieldError message={errors.phone} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-brand-dark">
          Email <span className="text-brand-red">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          className={errors.email ? ERROR_FIELD_CLASS : FIELD_CLASS}
        />
        <FieldError message={errors.email} />
      </div>

      <div>
        <label
          htmlFor="availability"
          className="text-sm font-medium text-brand-dark"
        >
          Interview availability
        </label>
        <p className="mt-0.5 text-xs text-brand-gray">
          Optional. A date and time that generally works for a first call —
          we&apos;ll confirm by email.
        </p>
        <input
          id="availability"
          name="availability"
          type="datetime-local"
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <span className="text-sm font-medium text-brand-dark">
          Resume <span className="text-brand-red">*</span>
        </span>
        <p className="mt-0.5 text-xs text-brand-gray">
          Accepts .pdf, .doc, or .docx up to 10 MB.
        </p>

        {file ? (
          <div className="mt-2 flex min-h-[2.75rem] items-center gap-2.5 rounded-lg border border-gray-300 bg-brand-light py-1.5 pl-3.5 pr-1.5">
            <FileText className="h-4 w-4 shrink-0 text-brand-red" />
            <span className="min-w-0 flex-1 truncate text-sm text-brand-dark">
              {file.name}
            </span>
            <button
              type="button"
              onClick={clearFile}
              className="tap-target shrink-0 text-brand-gray transition-colors hover:bg-white hover:text-brand-red"
              aria-label={`Remove attached file ${file.name}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`mt-2 inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-medium transition-colors hover:border-brand-red hover:text-brand-red sm:w-auto ${
              errors.resume
                ? "border-brand-red text-brand-red"
                : "border-gray-300 text-brand-dark"
            }`}
          >
            <Paperclip className="h-4 w-4" />
            Choose a file
          </button>
        )}

        <input
          ref={fileInputRef}
          id="resume"
          name="resume"
          type="file"
          accept={RESUME_ACCEPT_ATTRIBUTE}
          className="hidden"
          onChange={(event) => handleFileChange(event.target.files?.[0])}
        />
        <FieldError message={errors.resume} />
      </div>

      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-brand-red bg-red-50 px-3.5 py-3 text-sm text-brand-red-dark"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
