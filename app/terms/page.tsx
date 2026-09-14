import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms governing use of the Symprotek Corporation website at symprotek.com.",
  alternates: { canonical: "/terms" },
};

/* TODO — LEGAL REVIEW REQUIRED BEFORE LAUNCH.
   These are WEBSITE terms of use only. They deliberately do NOT purport to
   be terms of sale.

   Green Circuits publishes separate purchase-order terms and conditions
   covering pricing, delivery, tooling, warranty, cancellation, and
   limitation of liability. If Symprotek has standard PO terms, they should
   be published as their own page and linked from here — sourcing teams look
   for them during supplier qualification, and their absence is a real gap.  */

const sections = [
  {
    heading: "Acceptance",
    paragraphs: [
      "By accessing this website you agree to these terms. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "Use of this website",
    paragraphs: [
      "This website is provided for information about Symprotek Corporation and our services. You agree not to use it in any way that could damage, disable, or impair the site, or interfere with anyone else's use of it.",
      "You may not attempt to gain unauthorized access to any part of this site or to any systems connected to it.",
    ],
  },
  {
    heading: "Information you submit",
    paragraphs: [
      "Information and files you submit through this website are handled as described in our Privacy Policy. You represent that you have the right to send us any file you upload, and that doing so does not breach any obligation you owe to a third party.",
      "If material you intend to send is subject to export control, tell us before you transmit it.",
    ],
  },
  {
    heading: "No offer or contract",
    paragraphs: [
      "Nothing on this website constitutes an offer to sell or a binding quotation. Descriptions of our services, capabilities, and certifications are provided for general information. A binding agreement arises only from a written quotation and accepted purchase order.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The content of this website, including text, layout, and graphics, is owned by Symprotek Corporation unless otherwise indicated, and may not be reproduced for commercial purposes without our written permission.",
      "Third-party names, standards, and certification marks referenced on this site remain the property of their respective owners.",
    ],
  },
  {
    heading: "Accuracy and availability",
    paragraphs: [
      "We work to keep this site accurate and current, but we do not warrant that it is free of errors or that it will be available uninterrupted. Content may change without notice.",
    ],
  },
  {
    heading: "External links",
    paragraphs: [
      "This site may link to third-party websites. We do not control those sites and are not responsible for their content or practices.",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the State of California, without regard to its conflict of law provisions.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        description="Terms governing your use of this website."
      />
      <Breadcrumbs crumbs={[{ name: "Terms & Conditions", href: "/terms" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Remove this banner once counsel has approved the text. */}
          <div className="mb-10 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-5">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-amber-900">
              <strong>Draft: pending legal review.</strong> These are website
              terms of use only and are not terms of sale. Have counsel review
              before publishing, and consider adding separate purchase-order
              terms and conditions, which sourcing teams look for during
              supplier qualification.
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
              <h2 className="text-xl font-bold text-brand-dark">Contact</h2>
              <address className="mt-3 not-italic text-base leading-relaxed text-brand-gray">
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
              </address>
            </div>
          </div>

          <p className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 text-sm text-brand-gray">
            See also our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
