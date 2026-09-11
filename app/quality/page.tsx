import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { CertCard } from "@/components/CertBadge";
import { certifications } from "@/lib/data";
import { faqs } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Quality & Certifications",
  description:
    "Symprotek maintains ISO 9001 and ISO 13485 quality systems with AOI, X-ray, flying probe, and in-circuit testing capabilities plus full component and lot traceability.",
  alternates: { canonical: "/quality" },
  openGraph: {
    title: "Quality & Certifications | Symprotek Corporation",
    description:
      "ITAR registered, SBA 8(a) certified, ISO 9001 and ISO 13485. Full component and lot traceability on every build.",
    url: "/quality",
  },
};

const qualityFaqs = faqs.filter(
  (faq) => faq.category === "Quality & Certifications",
);

// Keep downloadable proof at the top of the Quality page while preserving the
// configured order within both groups.
const documentationOrder = new Map([
  ["ISO 9001:2015", 0],
  ["ISO 13485:2016", 1],
  ["RoHS Compliant", 2],
  ["ITAR Registered", 3],
]);

const remainingCertificationOrder = new Map([
  ["Assembled in the USA", 0],
  ["SBA 8(a) Certified", 1],
  ["FDA Registered", 2],
  ["MIL-SPEC", 3],
]);

const orderedCertifications = [
  ...certifications
    .filter((cert) => cert.certPdf)
    .sort(
      (a, b) =>
        (documentationOrder.get(a.label) ?? Number.MAX_SAFE_INTEGER) -
        (documentationOrder.get(b.label) ?? Number.MAX_SAFE_INTEGER),
    ),
  ...certifications
    .filter((cert) => !cert.certPdf)
    .sort(
      (a, b) =>
        (remainingCertificationOrder.get(a.label) ?? Number.MAX_SAFE_INTEGER) -
        (remainingCertificationOrder.get(b.label) ?? Number.MAX_SAFE_INTEGER),
    ),
];

const inspectionSteps = [
  {
    heading: "Incoming inspection & traceability",
    body: "Components are verified and recorded against the bill of materials on receipt. Every part and lot is tied to the assemblies it goes into, so traceability starts before the first board is built rather than being reconstructed afterwards.",
  },
  {
    heading: "Automated optical inspection (AOI)",
    body: "AOI checks placement, polarity, and solder joint quality across the assembly at production speed, catching the defect classes that are invisible once a board is in an enclosure.",
  },
  {
    heading: "X-ray inspection",
    body: "BGAs and other bottom-terminated packages hide their solder joints under the component body. X-ray inspection is the only way to verify them, and it is part of our standard process rather than an upcharge.",
  },
  {
    heading: "Flying probe & in-circuit testing",
    body: "Flying probe testing provides fixtureless electrical checks suited to prototypes, lower volumes, and changing designs. In-circuit testing uses dedicated test access for faster, repeatable electrical verification on stable production builds. The method is selected according to board design, test access, production volume, and customer requirements.",
  },
  {
    heading: "First article inspection",
    body: "New builds and revisions go through first article inspection before production quantities run, so a documentation or process error is caught on one board rather than a hundred.",
  },
];

export default function QualityPage() {
  return (
    <>
      <JsonLd data={faqSchema(qualityFaqs)} />

      <PageHeader
        title="Quality & Certifications"
        description="The credentials and process controls behind every board we ship."
      />
      <Breadcrumbs crumbs={[{ name: "Quality", href: "/quality" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Quality is a system, not an inspection
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-gray">
            <p>
              Any manufacturer can inspect a board at the end of the line. What
              separates suppliers for regulated work is whether the controls,
              documentation, and traceability existed the whole way through — and
              whether the records are still retrievable when someone asks about
              a unit built years ago.
            </p>
            <p>
              Symprotek maintains ISO 9001 and ISO 13485 certified quality
              management systems, is ITAR registered, and is certified under the
              SBA 8(a) Business Development Program. Those credentials carry
              real ongoing cost. We maintain them because the programs we serve
              cannot place work with a manufacturer that does not.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Our certifications
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-gray">
            View the supporting documentation below. Need another document or
            a current copy for your supplier qualification package?{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              Get in touch
            </Link>{" "}
            and we&apos;ll send current documentation.
          </p>

          <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {orderedCertifications.map((cert) => (
              <CertCard key={cert.label} cert={cert} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Inspection &amp; test process
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-gray">
            Every build passes through the same sequence, regardless of volume
            or turn time.
          </p>

          <ol className="mt-8 space-y-6">
            {inspectionSteps.map((step, index) => (
              <li key={step.heading} className="flex gap-5">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">
                    {step.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-gray sm:text-base">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Common quality questions
          </h2>
          <dl className="mt-8 space-y-5">
            {qualityFaqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl bg-white p-6 shadow-soft"
              >
                <dt className="flex items-start gap-2.5 text-base font-bold text-brand-dark">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    aria-hidden="true"
                  />
                  {faq.question}
                </dt>
                <dd className="mt-3 pl-7 text-sm leading-relaxed text-brand-gray">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              See all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Need documentation for supplier qualification?"
        description="Send us your qualification package requirements and we'll turn around current certificates and quality documentation."
      />
    </>
  );
}
