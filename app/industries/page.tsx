import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentGrid from "@/components/ContentGrid";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/PageHeader";
import { industries } from "@/lib/data";

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
        description="Regulated, long-lifecycle programs where traceability and a domestic supply chain are requirements, not preferences."
      />
      <Breadcrumbs crumbs={[{ name: "Industries", href: "/industries" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            The work we are built for
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-gray">
            <p>
              Symprotek is not the right partner for every electronics program.
              We are a poor fit for consumer hardware chasing the lowest
              possible unit cost at very high volume.
            </p>
            <p>
              We are built for the opposite case: programs where a board has to
              be traceable years after it shipped, where the supply chain has to
              stay domestic, where a component going end-of-life is a program
              risk rather than an inconvenience, and where the certifications on
              the manufacturer&apos;s wall determine whether the work can be
              awarded at all.
            </p>
            <p>
              Each vertical below maps to the quality systems, process controls,
              and manufacturing capabilities its programs require. Those
              requirements are often the gate a supplier has to clear before
              anyone evaluates price or lead time.
            </p>
          </div>
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
