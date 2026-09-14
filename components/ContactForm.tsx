"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, FileText, Loader2, Paperclip, X } from "lucide-react";
import { companyInfo, services } from "@/lib/data";
import {
  ACCEPT_ATTRIBUTE,
  validateAttachment,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/validation";

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

export default function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [renderedAt, setRenderedAt] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set on mount rather than at render so it reflects when the user actually
  // saw the form. Read by the API route's bot-timing check.
  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const clearFile = () => {
    setFile(null);
    setErrors((current) => ({ ...current, file: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (selected: File | undefined) => {
    if (!selected) {
      clearFile();
      return;
    }
    const fileError = validateAttachment(selected);
    if (fileError) {
      setErrors((current) => ({ ...current, file: fileError }));
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setErrors((current) => ({ ...current, file: undefined }));
    setFile(selected);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      name: String(formData.get("name") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    const clientErrors = validateContact(payload);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
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
              `Something went wrong. Please try again, or email us at ${companyInfo.email}.`,
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
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-xl bg-white p-6 shadow-soft lg:col-span-3"
    >
      <input type="hidden" name="renderedAt" value={renderedAt} />

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-brand-dark">
            Name <span className="text-brand-red">*</span>
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
          <label
            htmlFor="company"
            className="text-sm font-medium text-brand-dark"
          >
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <label htmlFor="phone" className="text-sm font-medium text-brand-dark">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={FIELD_CLASS}
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium text-brand-dark">
          What can we help with?
        </label>
        <select id="service" name="service" className={FIELD_CLASS}>
          <option value="">Select a service (optional)</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="General enquiry">General enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-brand-dark">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          placeholder="Tell us about your build: board complexity, quantities, target turn time, and anything else we should know."
          className={`resize-none ${errors.message ? ERROR_FIELD_CLASS : FIELD_CLASS}`}
        />
        <FieldError message={errors.message} />
      </div>

      <div>
        <span className="text-sm font-medium text-brand-dark">
          Attach your BOM or Gerber files
        </span>
        <p className="mt-0.5 text-xs text-brand-gray">
          Optional. Accepts .xls, .xlsx, .csv, .pdf, or .zip up to 10 MB.
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
            className="mt-2 inline-flex min-h-[2.75rem] w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:border-brand-red hover:text-brand-red sm:w-auto"
          >
            <Paperclip className="h-4 w-4" />
            Choose a file
          </button>
        )}

        <input
          ref={fileInputRef}
          id="attachment"
          name="attachment"
          type="file"
          accept={ACCEPT_ATTRIBUTE}
          className="hidden"
          onChange={(event) => handleFileChange(event.target.files?.[0])}
        />
        <FieldError message={errors.file} />
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
        {isSubmitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
