import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/PageHeader";
import { CertBadge } from "@/components/CertBadge";
import { certifications, companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  // Was the generic "Capabilities" (SEO-ROADMAP.md, Section 3.1) — carries
  // more keyword weight now instead of just the nav label.
  title: "PCB Assembly Capabilities & Equipment",
  description:
    "SMT and through-hole assembly, AOI and X-ray inspection, flying probe and in-circuit testing, and certified quality systems at Symprotek Corporation in Milpitas, California.",
  alternates: { canonical: "/capabilities" },
  openGraph: {
    title: "PCB Assembly Capabilities & Equipment | Symprotek Corporation",
    description:
      "Assembly, inspection, testing, and quality capabilities for demanding electronics programs.",
    url: "/capabilities",
  },
};

/* TODO — VERIFY THESE FIGURES BEFORE LAUNCH.
   "±0.02mm", "24\" x 24\"", and "98%+ on-time delivery" were already on this
   page but are unsourced, and no equipment list backs them up. On-time
   delivery in particular is a performance claim a customer may hold us to
   contractually.

   Either confirm each figure against real data (and ideally state the period
   the OTD figure covers), or replace it. Removing a number is better than
   publishing one nobody can substantiate.                                   */
const stats = [
  { label: "In business since", value: String(companyInfo.foundedYear) },
  { label: "SMT placement accuracy", value: "±0.02mm" },
  { label: "Max board size", value: '24" x 24"' },
  { label: "On-time delivery", value: "98%+" },
];

const capabilityGroups = [
  {
    heading: "Assembly",
    items: [
      "SMT, through-hole & mixed technology assembly",
      "Fine-pitch & BGA rework",
      "Conformal coating & potting",
      "Box build & full system integration",
    ],
  },
  {
    heading: "Testing & Inspection",
    items: [
      "Automated optical inspection (AOI)",
      "X-ray inspection",
      "Flying probe testing",
      "In-circuit testing",
      "First article inspection",
    ],
  },
  {
    heading: "Quality Systems",
    items: [
      "ISO 9001 & ISO 13485 certified",
      "ITAR registered",
      "Full component & lot traceability",
      "RoHS compliant processes",
    ],
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        title="Capabilities"
        description="Manufacturing capacity and quality systems built for demanding electronics programs."
      />
      <Breadcrumbs crumbs={[{ name: "Capabilities", href: "/capabilities" }]} />

      <section className="border-b border-gray-100 bg-white py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-brand-light p-6 text-center"
            >
              <div className="text-2xl font-extrabold text-brand-red sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium text-brand-gray sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilityGroups.map((group) => (
              <div
                key={group.heading}
                className="rounded-xl bg-white p-6 shadow-soft"
              >
                <h2 className="text-lg font-bold text-brand-red">
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-brand-gray"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-brand-gray">
            Looking for a detailed equipment list?{" "}
            <Link
              href="/facility"
              className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              See our facility &amp; equipment
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
              Certifications
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-gray">
              Credentials our customers&apos; programs require before work can
              be placed.
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
              Read about our quality system →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
