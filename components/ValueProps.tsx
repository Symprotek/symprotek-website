import Link from "next/link";
import { HeartPulse, ShieldCheck, PencilRuler, Globe2 } from "lucide-react";
import { valueProps } from "@/lib/data";

/** Icons live here rather than in lib/data so the data stays presentation-free. */
const ICONS = [HeartPulse, ShieldCheck, PencilRuler, Globe2];

export default function ValueProps() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
            Why Choose Symprotek
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
            More Than a Contract Manufacturer
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-gray">
            We help technology companies launch products faster, reduce supply
            chain risk, and scale production without changing vendors.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop, index) => {
            const Icon = ICONS[index] ?? ShieldCheck;
            return (
              <Link
                key={prop.title}
                href={prop.href}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red hover:shadow-lift"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-light text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold text-brand-dark transition-colors group-hover:text-brand-red">
                  {prop.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-gray">
                  {prop.body}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
