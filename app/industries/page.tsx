import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentGrid from "@/components/ContentGrid";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/PageHeader";
import { certifications, industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "PCB assembly for aerospace & defense, medical devices, industrial equipment, and semiconductor test. ISO 9001 and ISO 13485 certified quality systems.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries We Serve | Symprotek Corporation",
    description:
      "Electronics manufacturing for defense, medical, industrial, and semiconductor programs.",
    url: "/industries",
  },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        title="Industries We Serve"
        description="Electronics manufacturing for programs that depend on quality, traceability, and reliable lifecycle support."
      />
      <Breadcrumbs crumbs={[{ name: "Industries", href: "/industries" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            The work we are built for
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-gray">
            <p>
              Symprotek supports defense, medical, industrial, and semiconductor
              programs with disciplined process controls, component and lot
              traceability, and responsive engineering collaboration.
            </p>
            <p>
              Our team works across PCB assembly, design support, supply chain
              planning, and production so customers can move from early builds
              into ongoing manufacturing with one accountable partner.
            </p>
            <p>
              Our quality systems, registrations, and manufacturing credentials
              support customer qualification and the documentation needs of
              regulated, long-lifecycle products.
            </p>
          </div>

          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Certifications and manufacturing credentials"
          >
            {certifications.map((certification) => (
              <li
                key={certification.label}
                className="flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-brand-light px-3 py-2 text-xs font-semibold text-brand-dark"
              >
                <span>{certification.label}</span>
                {certification.certPdf && (
                  <a
                    href={certification.certPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${certification.validity ? "View historical" : "View"} ${certification.label} documentation (PDF, opens in a new tab)`}
                    className="inline-flex min-h-7 items-center gap-1 rounded px-1.5 text-brand-red transition-colors hover:bg-white hover:text-brand-red-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                  >
                    {certification.validity
                      ? "Historical document"
                      : "View documentation"}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContentGrid entries={industries} basePath="/industries" />

      <CtaSection
        heading="Don't see your industry?"
        description="If your program carries traceability, export control, or long-lifecycle requirements, it's worth a conversation."
      />
    </>
  );
}
