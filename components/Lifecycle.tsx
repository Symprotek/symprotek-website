import { ChevronRight } from "lucide-react";
import { companyStats, lifecycleStages } from "@/lib/data";

/**
 * The program-lifecycle timeline plus the headline stats band.
 *
 * The timeline runs horizontally on large screens (as in the design mockups)
 * and stacks into a two-column grid below that, where seven inline nodes would
 * be unreadable.
 */
export default function Lifecycle() {
  return (
    <section className="border-y border-gray-100 bg-brand-light py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d13438]">
            One Partner, Every Step
          </p>
          {/* Deliberately not "From Prototype to Production" — that is
              the hero's h1, and repeating it verbatim two sections later read
              as a duplicated headline rather than a new section. */}
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#0066b8] sm:text-3xl lg:text-4xl">
            How a Program Moves Through Symprotek
          </h2>
        </div>

        <ol className="mt-8 sm:mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:flex lg:items-start lg:gap-0">
          {lifecycleStages.map((stage, index) => (
            <li
              key={stage.label}
              className="flex items-start lg:flex-1 lg:items-center"
            >
              <div className="flex flex-1 flex-col items-center px-1 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d13438] bg-white text-sm font-bold text-[#d13438]">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-sm font-bold text-[#0066b8]">
                  {stage.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-gray">
                  {stage.detail}
                </p>
              </div>

              {index < lifecycleStages.length - 1 && (
                <ChevronRight
                  className="hidden h-5 w-5 shrink-0 text-[#d13438]/40 lg:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>

        <dl className="mt-10 sm:mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {companyStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white p-6 text-center shadow-soft"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-extrabold text-[#d13438] sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs font-medium text-brand-gray sm:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
