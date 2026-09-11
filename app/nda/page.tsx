import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Download, ShieldCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mutual NDA",
  description:
    "Download Symprotek Corporation's standard mutual non-disclosure agreement before sharing your design files, BOM, or Gerber data.",
  alternates: { canonical: "/nda" },
  openGraph: {
    title: "Mutual NDA | Symprotek Corporation",
    description:
      "Download our standard mutual non-disclosure agreement before sharing design data.",
    url: "/nda",
  },
};

/* TODO — SUPPLY THE NDA DOCUMENT.
   Place the approved mutual NDA at:
     /public/documents/symprotek-mutual-nda.pdf
   then set NDA_DOCUMENT_PATH below. Until it is set, the page shows a
   "request by email" state instead of a broken download link.

   Green Circuits publishes a downloadable mutual NDA and it removes real
   friction for defense and medical customers, who often cannot send design
   data until one is in place.                                              */

const NDA_DOCUMENT_PATH: string | null = null;

const points = [
  {
    heading: "Mutual by default",
    body: "The agreement protects both directions. You are often sharing design data with us while we share process and capability information with you.",
  },
  {
    heading: "Sign before you send files",
    body: "If your bill of materials, Gerber files, or drawings are confidential, get the NDA in place first. We would rather wait a day than have you send data you are not comfortable sending.",
  },
  {
    heading: "Or send us yours",
    body: "If your organization has its own standard mutual NDA, send it over. We are used to reviewing customer paper and we do not insist on our own form.",
  },
  {
    heading: "Export-controlled data",
    body: "An NDA is not a substitute for export control compliance. If your data is ITAR or EAR controlled, tell us before transmitting anything so we can handle it correctly.",
  },
];

export default function NdaPage() {
  return (
    <>
      <PageHeader
        title="Mutual NDA"
        description="Put confidentiality in place before you send us design data."
      />
      <Breadcrumbs crumbs={[{ name: "Mutual NDA", href: "/nda" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gray-200 bg-brand-light p-8 text-center shadow-soft">
            <ShieldCheck
              className="mx-auto h-12 w-12 text-brand-red"
              aria-hidden="true"
            />
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-brand-dark">
              Standard Mutual Non-Disclosure Agreement
            </h2>

            {NDA_DOCUMENT_PATH ? (
              <>
                <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-brand-gray">
                  Download, review, sign, and send it back with your enquiry.
                </p>
                <a
                  href={NDA_DOCUMENT_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download the mutual NDA (PDF)
                </a>
              </>
            ) : (
              <>
                {/* Remove this block once NDA_DOCUMENT_PATH is set. */}
                <div className="mx-auto mt-5 flex max-w-xl items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-left">
                  <AlertTriangle
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-amber-900">
                    <strong>Document not yet uploaded.</strong> Add the approved
                    PDF to <code>/public/documents/</code> and set{" "}
                    <code>NDA_DOCUMENT_PATH</code> in this page to switch on the
                    download button.
                  </p>
                </div>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-gray">
                  Request a copy of our standard mutual NDA and we&apos;ll send
                  it straight over.
                </p>
                <Link href="/contact" className="btn-primary mt-6">
                  Request the NDA
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 sm:mt-12 space-y-8">
            {points.map((point) => (
              <div key={point.heading}>
                <h2 className="text-xl font-bold text-brand-dark">
                  {point.heading}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-brand-gray">
                  {point.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 text-sm leading-relaxed text-brand-gray">
            Questions about the agreement? Email{" "}
            <a
              href={`mailto:${companyInfo.email}`}
              className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              {companyInfo.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
              className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              {companyInfo.phone}
            </a>
            .
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
