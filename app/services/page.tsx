import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentGrid from "@/components/ContentGrid";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/PageHeader";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "PCB assembly, global supply chain, design, and quick-turn manufacturing services from Symprotek Corporation in Milpitas, California.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Symprotek Corporation",
    description:
      "Turnkey PCB assembly, supply chain, design, and quick-turn manufacturing services.",
    url: "/services",
  },
};

/* Comparison rows. Values are drawn from claims already made on the
   individual service pages — no new capability claims are introduced here.

   Keyed by service slug, not by array position. These were previously
   positional arrays that had to stay in lockstep with the order of `services`
   in lib/data.ts, so reordering the services silently paired each one with
   another service's data. */
interface ComparisonRow {
  label: string;
  values: Record<string, string>;
}

const comparison: ComparisonRow[] = [
  {
    label: "Best for",
    values: {
      "pcb-assembly": "Production programs needing one accountable partner",
      "quick-turn": "Programs where the schedule cannot slip",
      "supply-chain": "Teams fighting component availability",
      "design-service": "Products still being designed",
    },
  },
  {
    label: "Volume",
    values: {
      "pcb-assembly": "Prototype to volume production",
      "quick-turn": "Prototype & low volume",
      "supply-chain": "Any volume",
      "design-service": "Prototype & pre-production",
    },
  },
  {
    label: "We source components",
    values: {
      "pcb-assembly": "Yes (turnkey or consigned)",
      "quick-turn": "Yes, expedited",
      "supply-chain": "Yes",
      "design-service": "Advisory",
    },
  },
  {
    label: "Engineering involvement",
    values: {
      "pcb-assembly": "DFM review on request",
      "quick-turn": "DFM review on request",
      "supply-chain": "Obsolescence & multi-sourcing",
      "design-service": "Full DFx / DFM / DFT review",
    },
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Turnkey electronics manufacturing built around your production schedule, from prototype through volume."
      />
      <Breadcrumbs crumbs={[{ name: "Services", href: "/services" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            One partner from BOM to finished board
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-gray">
            <p>
              Most electronics programs do not fail on the assembly line. They
              fail in the seams: between the designer and the manufacturer,
              between the manufacturer and the component broker, between a
              prototype that worked and a production run that has to be
              re-qualified because the vendor changed.
            </p>
            <p>
              Symprotek is structured to remove those seams. We source, build,
              test, and support in one place, so a design that works as a
              prototype is built the same way at volume, by the same people, in
              the same Milpitas facility.
            </p>
            <p>
              Our four service lines below are usually combined rather than
              chosen between. A typical program engages design services during
              layout, quick-turn for the first articles, and turnkey assembly
              with supply chain management once it moves to production.
            </p>
          </div>
        </div>
      </section>

      <ContentGrid entries={services} basePath="/services" />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Comparing our services
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-gray">
            Not sure where your program fits? Here is how the four lines differ
            in practice.
          </p>

          {/*
            Below lg this renders as one card per service. The table version
            needs ~52rem to stay legible, so on a 375px screen it showed only
            the first of the four services with no indication the rest were
            scrolled off to the right.
          */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
            {services.map((service) => (
              <div
                key={service.slug}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-soft"
              >
                <h3 className="text-base font-bold text-brand-red">
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-brand-red-dark"
                  >
                    {service.title}
                  </Link>
                </h3>

                <dl className="mt-4 space-y-3">
                  {comparison.map((row) => (
                    <div key={row.label}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5 text-sm leading-relaxed text-brand-gray">
                        {row.values[service.slug]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 flex items-center gap-1.5 border-t border-gray-100 pt-3 text-sm text-brand-dark">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-brand-red"
                    aria-hidden="true"
                  />
                  Assembled in the USA
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 pr-4 font-semibold text-brand-dark">
                    <span className="sr-only">Attribute</span>
                  </th>
                  {services.map((service) => (
                    <th
                      key={service.slug}
                      scope="col"
                      className="px-4 py-4 align-bottom"
                    >
                      <Link
                        href={`/services/${service.slug}`}
                        className="font-bold text-brand-red transition-colors hover:text-brand-red-dark"
                      >
                        {service.title}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100">
                    <th
                      scope="row"
                      className="py-4 pr-4 align-top font-semibold text-brand-dark"
                    >
                      {row.label}
                    </th>
                    {services.map((service) => (
                      <td
                        key={`${row.label}-${service.slug}`}
                        className="px-4 py-4 align-top text-brand-gray"
                      >
                        {row.values[service.slug]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top">
                    <span className="sr-only">Assembled in the USA</span>
                  </th>
                  {services.map((service) => (
                    <td key={service.slug} className="px-4 py-4 align-top">
                      <span className="inline-flex items-center gap-1.5 text-brand-dark">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-brand-red"
                          aria-hidden="true"
                        />
                        Assembled in the USA
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
