import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { certifications } from "@/lib/data";

/* TODO — SUPPLY REAL FACILITY PHOTOGRAPHY.
   Set HERO_IMAGE to a path under /public (e.g. "/images/hero/smt-line.jpg")
   and the hero swaps from the designed circuit-trace panel to that photo,
   overlay and all. Until then the panel renders, which reads as intentional
   in a way a generic stock factory photo does not.

   Note: the legacy symprotek.com has no usable facility photography — the only
   images on it are the logo and the certification strips — so this has to come
   from a real photo shoot or a licensed library. */
const HERO_IMAGE: string | null = null;

/** The four credentials that do the most work in front of a sourcing engineer. */
const HERO_CERT_LABELS = [
  "ISO 13485:2016",
  "FDA Registered",
  "ITAR Registered",
  "ISO 9001:2015",
];

const heroCerts = HERO_CERT_LABELS.map((label) =>
  certifications.find((cert) => cert.label === label),
).filter((cert): cert is NonNullable<typeof cert> => Boolean(cert));

/**
 * Circuit-trace field shown until real photography is supplied.
 *
 * Homepage-only vibrant treatment: blue (#0066b8) instead of the site-wide
 * navy, plus a brighter red bloom and a soft top-right highlight so the panel
 * reads as lighter and more energetic than the rest of the site.
 */
function BrandPanel() {
  return (
    <div className="absolute inset-0 bg-[#0066b8]">
      <svg
        className="absolute inset-0 h-full w-full text-white/[0.07]"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern
            id="hero-traces"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 40h24l10-10h22l10 10h14M40 0v24l-10 10v22l10 10v14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="40" cy="40" r="3.5" fill="currentColor" />
            <circle cx="0" cy="40" r="2.5" fill="currentColor" />
            <circle cx="80" cy="40" r="2.5" fill="currentColor" />
            <circle cx="40" cy="0" r="2.5" fill="currentColor" />
            <circle cx="40" cy="80" r="2.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-traces)" />
      </svg>
      {/* Red bloom in the lower left: carries the accent colour into the blue
          field so the hero ties back to the logo instead of reading as flat
          corporate blue. */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 100%, rgba(209,52,56,0.65) 0%, transparent 60%)",
        }}
      />
      {/* Soft highlight top-right: lightens the overall vibe rather than
          leaving the panel a single flat fill. */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 85% 0%, rgba(255,255,255,0.16) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {HERO_IMAGE ? (
          <>
            <Image
              src={HERO_IMAGE}
              alt="Symprotek electronics assembly line in Milpitas, California"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066b8]/95 via-[#0066b8]/80 to-[#0066b8]/40" />
          </>
        ) : (
          <BrandPanel />
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85 sm:text-sm sm:tracking-[0.2em]">
            Silicon Valley EMS Partner
          </p>

          <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.12] tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            From Prototype to Production
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50/90 sm:mt-6 sm:text-lg">
            Turnkey PCB assembly, engineering support, and a supply chain built
            for regulated, long-lifecycle programs — assembled in the USA at our
            Milpitas, California facility.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary-vibrant">
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/capabilities" className="btn-outline-vibrant">
              Explore Capabilities
            </Link>
          </div>
        </div>

        {/*
          A 2x2 grid on mobile rather than flex-wrap: four badges of differing
          natural widths wrapped 3+1, which looked accidental. The grid keeps
          the rows even and the badge boxes a consistent size.
        */}
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
          {heroCerts.map((cert) => (
            <li
              key={cert.label}
              className="flex h-16 items-center justify-center rounded-xl bg-white px-5 shadow-soft sm:w-44"
            >
              {cert.logo ? (
                <Image
                  src={cert.logo}
                  alt={`${cert.label} certified`}
                  width={168}
                  height={84}
                  className="max-h-10 w-full object-contain"
                />
              ) : (
                <span className="text-center text-xs font-bold uppercase tracking-wide text-[#0066b8]">
                  {cert.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
