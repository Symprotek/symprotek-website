import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

/**
 * The design mockups render this section with a world-map "supply chain
 * dashboard" graphic. That has been replaced with a capability panel: a map
 * dashboard implies live telemetry the site does not have, and inventing one
 * would misrepresent the product to a sourcing engineer.
 */
const CAPABILITIES = [
  "Component risk monitoring",
  "Approved vendor management",
  "Alternative & second sourcing",
  "Obsolescence & EOL programs",
  "Inventory & kitting programs",
  "Forecast-driven planning",
  "Global logistics coordination",
  "Warranty & aftermarket service",
];

export default function SupplyChain() {
  return (
    <section className="bg-brand-dark py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Supply Chain Built Into Every Program
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Manufacturing Without
            <br className="hidden sm:block" /> Supply Chain Surprises
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            We combine global sourcing with local fulfillment and proactive
            obsolescence tracking, so a discontinued part or an allocation
            window doesn&apos;t stop a program that still has years of service
            ahead of it.
          </p>

          <Link href="/services/supply-chain" className="btn-primary mt-8">
            Explore Supply Chain Solutions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                aria-hidden="true"
              />
              <span className="text-sm leading-snug text-gray-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
