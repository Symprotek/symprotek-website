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

/** Circuit-trace field shown until real photography is supplied. */
function BrandPanel() {
  return (
    <div className="absolute inset-0 bg-brand-dark">
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
      {/* Red bloom in the lower left: carries the accent colour into the navy
          field so the hero ties back to the logo instead of reading as flat
          corporate blue. */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 100%, rgba(226,35,26,0.55) 0%, transparent 60%)",
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
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/40" />
          </>
        ) : (
          <BrandPanel />
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-red sm:text-sm sm:tracking-[0.2em]">
            Silicon Valley EMS Partner
          </p>

          <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.12] tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl">
            From Prototype to Production
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
            Turnkey PCB assembly, engineering support, and a supply chain built
            for regulated, long-lifecycle programs, assembled in the USA at our
            Milpitas, California facility.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/capabilities" className="btn-outline">
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
              className="flex h-14 items-center justify-center rounded-lg bg-white px-3 shadow-soft sm:h-16 sm:w-40"
            >
              {cert.logo ? (
                /*
                  Same blend as CertBadge/CertCard: most of these logos are
                  baked onto an opaque white rectangle, and against this
                  pill's own white (previously bg-white/95, a hair off pure
                  white) that rectangle showed as a faint seam. mix-blend
                  -multiply drops the logo's white into the pill instead.

                  max-h-full (not a fixed max-h-N) so the logo scales up to
                  fill the pill's actual height instead of leaving a fixed
                  margin — enlarging the box no longer requires separately
                  tuning the logo's own cap.
                */
                <Image
                  src={cert.logo}
                  alt={`${cert.label} certified`}
                  width={160}
                  height={80}
                  className="max-h-full w-full rounded object-contain mix-blend-multiply"
                />
              ) : (
                <span className="text-center text-xs font-bold uppercase tracking-wide text-brand-dark">
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
