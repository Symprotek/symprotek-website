import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Email your resume to Symprotek Corporation to apply for a role or express general interest.",
  // Canonicalizes the ?role=... query variants back to the plain page, same
  // as every other page here — avoids each role link becoming its own
  // indexed URL.
  alternates: { canonical: "/careers/apply" },
  openGraph: {
    title: "Apply | Symprotek Corporation",
    description: "Email your resume to apply for a role at Symprotek Corporation.",
    url: "/careers/apply",
  },
};

/* TODO — CONFIRM HR EMAIL BEFORE LAUNCH.
   Per PR #4 review: applications go to Maria directly rather than through a
   resume-upload form/API (removed here — see that PR's discussion). This
   page instead points candidates at an email, prefilled via mailto. There is
   no dedicated hiring address anywhere in this codebase, so it falls back to
   companyInfo.email (sales@symprotek.com) — swap in Maria's real address
   before this goes live, and consider giving it its own companyInfo field
   (e.g. `hiringEmail`) rather than reusing the sales inbox long-term.        */
const APPLICATION_EMAIL = companyInfo.email;

interface ApplyPageProps {
  searchParams: { role?: string };
}

export default function ApplyPage({ searchParams }: ApplyPageProps) {
  const role = searchParams.role?.trim() || "";

  const subject = role ? `Job Application: ${role}` : "Job Application";
  const body = [
    `Hi ${companyInfo.name},`,
    "",
    role
      ? `I'd like to apply for the ${role} role. My resume is attached as a PDF.`
      : "I'd like to apply. My resume is attached as a PDF.",
    "",
    "Name:",
    "Phone:",
  ].join("\n");
  const mailtoHref = `mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <>
      <PageHeader
        title="Apply"
        description={
          role
            ? `Email your resume to apply for the ${role} role.`
            : "Email your resume and we'll reach out as roles open up."
        }
      />
      <Breadcrumbs
        crumbs={[
          { name: "Careers", href: "/careers" },
          { name: "Apply", href: "/careers/apply" },
        ]}
      />

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="rounded-xl bg-white p-6 shadow-soft sm:p-8 lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
              What to include
            </h2>

            {role && (
              <p className="mt-3 text-sm font-medium text-brand-gray">
                Applying for: <span className="text-brand-dark">{role}</span>
              </p>
            )}

            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-brand-gray">
              <li>Your full name and phone number</li>
              <li>The role you&apos;re interested in, if any</li>
              <li>Your resume, attached as a PDF</li>
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-brand-gray">
              The button below opens an email to us with the subject line and
              a starting template already filled in — attach your resume as a
              PDF before sending.
            </p>

            <a
              href={mailtoHref}
              className="btn-primary mt-6 inline-flex w-full sm:w-auto"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email Your Résumé
            </a>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-soft lg:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
              {companyInfo.name}
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-brand-gray">
              <li className="flex items-start gap-2.5 py-1.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <span>{companyInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded px-2 font-medium text-brand-dark transition-colors hover:text-brand-red"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-red" />
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${APPLICATION_EMAIL}`}
                  className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded px-2 font-medium text-brand-dark transition-colors hover:text-brand-red"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                  <span className="break-all">{APPLICATION_EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 py-1.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <span>{companyInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
