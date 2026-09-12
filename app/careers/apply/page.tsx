import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply for a role at Symprotek Corporation — submit your resume and preferred interview availability.",
  // Canonicalizes the ?role=... query variants back to the plain page, same
  // as every other page here — avoids each role link becoming its own
  // indexed URL.
  alternates: { canonical: "/careers/apply" },
  openGraph: {
    title: "Apply | Symprotek Corporation",
    description: "Submit your resume for a role at Symprotek Corporation.",
    url: "/careers/apply",
  },
};

interface ApplyPageProps {
  searchParams: { role?: string };
}

export default function ApplyPage({ searchParams }: ApplyPageProps) {
  const role = searchParams.role?.trim() || "";

  return (
    <>
      <PageHeader
        title="Apply"
        description={
          role
            ? `Submit your resume for the ${role} role.`
            : "Submit your resume and we'll reach out as roles open up."
        }
      />
      <Breadcrumbs
        crumbs={[
          { name: "Careers", href: "/careers" },
          { name: "Apply", href: "/careers/apply" },
        ]}
      />

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-soft">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                What to send us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                A current resume and a phone number are all we need to get
                started. If you have a time that generally works for a first
                call, let us know and we&apos;ll do our best to match it.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-soft">
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
                    href={`mailto:${companyInfo.email}`}
                    className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded px-2 font-medium text-brand-dark transition-colors hover:text-brand-red"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                    <span className="break-all">{companyInfo.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 py-1.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <span>{companyInfo.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          <ApplicationForm role={role} />
        </div>
      </section>
    </>
  );
}
