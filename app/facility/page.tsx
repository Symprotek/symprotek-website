import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Facility & Equipment",
  description:
    "Symprotek's PCB assembly facility in Milpitas, California: SMT and through-hole lines, AOI and X-ray inspection, flying probe and in-circuit test.",
  alternates: { canonical: "/facility" },
  openGraph: {
    title: "Facility & Equipment | Symprotek Corporation",
    description:
      "Our PCB assembly facility in Milpitas, California, in the heart of Silicon Valley.",
    url: "/facility",
  },
};

/* TODO — SUPPLY REAL DATA AND PHOTOGRAPHY.
   The equipment groups below list process capabilities already claimed on
   the capabilities page. They deliberately contain NO machine makes, models,
   line counts, or throughput figures, because none are published anywhere we
   could verify.

   Before launch:
   - Add real facility photography to /public/images/facility/ and render it
     in the gallery section below (currently a labelled placeholder).
   - Replace the capability lists with the actual equipment inventory
     (placement machines by make/model, line count, oven zones, AOI and X-ray
     systems, test platforms). Green Circuits publishes "5 SMT lines with
     Juki machines"; a specific inventory is one of the strongest trust
     signals an EMS site can carry, and ours is currently absent.
   - Add square footage and shift coverage.                                */

const equipmentGroups = [
  {
    heading: "Surface Mount Assembly",
    items: [
      "Automated SMT placement",
      "Fine-pitch and BGA placement",
      "Reflow soldering",
      "Solder paste inspection",
    ],
  },
  {
    heading: "Through-Hole & Mixed Technology",
    items: [
      "Wave soldering",
      "Selective and hand soldering",
      "Mixed-technology assembly",
      "Fine-pitch and BGA rework",
    ],
  },
  {
    heading: "Inspection & Test",
    items: [
      "Automated optical inspection (AOI)",
      "X-ray inspection",
      "Flying probe testing",
      "In-circuit testing",
    ],
  },
  {
    heading: "Finishing & Integration",
    items: [
      "Conformal coating and potting",
      "Box build and system integration",
      "Cable and harness assembly",
      "Packaging and fulfillment",
    ],
  },
];

export default function FacilityPage() {
  return (
    <>
      <PageHeader
        title="Facility & Equipment"
        description="One facility in Milpitas, California. Every board we ship is built here."
      />
      <Breadcrumbs crumbs={[{ name: "Facility", href: "/facility" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            In the middle of Silicon Valley
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-gray">
            <p>
              Symprotek operates a single assembly facility at{" "}
              {companyInfo.address}, inside the semiconductor equipment corridor
              and within driving distance of most of the engineering teams we
              build for.
            </p>
            <p>
              Operating one facility rather than several is a deliberate choice.
              It means a prototype and the production run that follows it are
              built on the same lines, by the same operators, under the same
              quality system, and it means there is exactly one place to visit
              when you want to see how your hardware is made.
            </p>
            <p>
              For customers with export control obligations, it also means your
              technical data and your hardware stay within a single domestic,
              ITAR-registered site.
            </p>
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl bg-brand-light p-5">
            <MapPin
              className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
              aria-hidden="true"
            />
            <div className="text-sm">
              <div className="font-bold text-brand-dark">
                {companyInfo.name}
              </div>
              <div className="mt-1 text-brand-gray">{companyInfo.address}</div>
              <div className="mt-1 text-brand-gray">{companyInfo.hours}</div>
              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
                className="mt-1 inline-flex min-h-[2.75rem] items-center font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
              >
                {companyInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Process capabilities
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-gray">
            From bare board to finished, tested, packaged assembly.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {equipmentGroups.map((group) => (
              <div
                key={group.heading}
                className="rounded-xl bg-white p-6 shadow-soft"
              >
                <h3 className="text-lg font-bold text-brand-red">
                  {group.heading}
                </h3>
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
            Need a detailed equipment list or specific process capability for a
            supplier qualification?{" "}
            <Link
              href="/contact"
              className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
            >
              Ask us
            </Link>{" "}
            and we&apos;ll send current documentation.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
