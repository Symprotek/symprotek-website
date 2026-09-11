import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Lifecycle from "@/components/Lifecycle";
import SupplyChain from "@/components/SupplyChain";
import ContentGrid from "@/components/ContentGrid";
import CtaSection from "@/components/CtaSection";
import { CertBadge } from "@/components/CertBadge";
import { certifications, industries, services } from "@/lib/data";

export const metadata: Metadata = {
  title: "PCB Assembly in Milpitas, CA | Symprotek Corporation",
  description:
    "Turnkey PCB assembly, supply chain, and quick-turn manufacturing from Milpitas, California. ITAR registered, SBA 8(a) certified, ISO 9001 and ISO 13485. Assembled in the USA since 1994.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PCB Assembly in Milpitas, CA | Symprotek Corporation",
    description:
      "Turnkey PCB assembly, supply chain, and quick-turn manufacturing from Milpitas, California. ITAR registered and ISO certified.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <ValueProps />

      <Lifecycle />

      <ContentGrid
        entries={services}
        basePath="/services"
        heading="Our Services"
        description="Turnkey electronics manufacturing, from sourcing through production, backed by engineering support at every step."
      />

      <SupplyChain />

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
              Industries We Serve
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-gray">
              Regulated, long-lifecycle programs where traceability and a
              domestic supply chain are requirements, not preferences.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red hover:shadow-lift"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-light text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-brand-dark transition-colors group-hover:text-brand-red">
                    {industry.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-gray">
                    {industry.summary}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-brand-red">
                    Learn more →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
              Certified for Regulated Work
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-gray">
              Every board is assembled in the USA under quality systems built
              for defense, medical, industrial, and semiconductor programs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {certifications.map((cert) => (
              <CertBadge key={cert.label} cert={cert} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/quality"
              className="text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              View our quality system &amp; certificates →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
