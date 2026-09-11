import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Symprotek Corporation collects, uses, and protects information submitted through symprotek.com.",
  alternates: { canonical: "/privacy" },
};

/* TODO — LEGAL REVIEW REQUIRED BEFORE LAUNCH.
   This policy describes what the site actually does today: a contact form
   that collects name, company, email, phone, message, and an optional file,
   and transmits them by email via Resend. There is currently no analytics,
   no advertising pixel, and no cookie beyond what Next.js requires.

   It has NOT been reviewed by counsel. It also does not yet address CCPA/CPRA
   consumer rights in the detail a California business may require. Have
   counsel review before this goes live, and revisit it the moment analytics
   or a CRM is added — both change what this document has to say.            */

const sections = [
  {
    heading: "Information we collect",
    paragraphs: [
      "We collect information you choose to give us. When you submit our contact form, we collect your name, and — if you provide them — your company name, email address, telephone number, the service you selected, the content of your message, and any file you attach.",
      "We do not require you to create an account, and we do not ask for payment information through this website.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "We use the information you submit to respond to your enquiry, prepare a quote, and communicate with you about your project. Attached files, such as bills of materials or design archives, are used solely to evaluate and quote the work you have asked us about.",
      "We do not sell your personal information, and we do not share it with third parties for their own marketing purposes.",
    ],
  },
  {
    heading: "How it is transmitted and stored",
    paragraphs: [
      "Contact form submissions are delivered to us by email through Resend, a third-party email delivery provider, which processes the submission in order to transmit it. The resulting email is stored in our business email systems along with our other correspondence.",
      "We retain enquiries for as long as needed to respond to them and to maintain our normal business records.",
    ],
  },
  {
    heading: "Confidential design data",
    paragraphs: [
      "We understand that a bill of materials or a Gerber archive may be commercially sensitive or export-controlled. We are happy to execute a mutual non-disclosure agreement before you send design data.",
      "If your files are subject to export control, please tell us before transmitting them so we can handle them appropriately.",
    ],
  },
  {
    heading: "Cookies and tracking",
    paragraphs: [
      "This website does not currently use analytics cookies, advertising cookies, or third-party tracking pixels. If that changes, this policy will be updated before those technologies are deployed.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You may ask us to correct or delete the information you have submitted, or to stop contacting you, at any time. Write to us at the address below and we will act on your request.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. Material changes will be reflected here.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="How we handle information you send us through this website."
      />
      <Breadcrumbs crumbs={[{ name: "Privacy Policy", href: "/privacy" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Remove this banner once counsel has approved the text. */}
          <div className="mb-10 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-5">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-amber-900">
              <strong>Draft — pending legal review.</strong> This policy
              accurately describes what this website does today, but it has not
              been reviewed by counsel. Have it reviewed before publishing the
              site, and remove this notice once approved.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-brand-dark">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-3 text-base leading-relaxed text-brand-gray"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            <div>
              <h2 className="text-xl font-bold text-brand-dark">Contact us</h2>
              <p className="mt-3 text-base leading-relaxed text-brand-gray">
                Questions about this policy, or about information you have sent
                us, can be directed to:
              </p>
              <address className="mt-4 not-italic text-base leading-relaxed text-brand-gray">
                <strong className="text-brand-dark">{companyInfo.name}</strong>
                <br />
                {companyInfo.address}
                <br />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-brand-red transition-colors hover:text-brand-red-dark"
                >
                  {companyInfo.email}
                </a>
                <br />
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="text-brand-red transition-colors hover:text-brand-red-dark"
                >
                  {companyInfo.phone}
                </a>
              </address>
            </div>
          </div>

          <p className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 text-sm text-brand-gray">
            See also our{" "}
            <Link
              href="/terms"
              className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
