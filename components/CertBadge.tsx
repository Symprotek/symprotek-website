import Image from "next/image";
import { ExternalLink, FileText, ShieldCheck } from "lucide-react";
import type { Certification } from "@/lib/data";

/**
 * Renders a certification as a badge. Falls back to a typographic badge until
 * a real `logo` image is supplied, so the page looks intentional either way.
 *
 * (The previous implementation applied a `grayscale` CSS filter to a text
 * span, which is a no-op — a placeholder for logo images that never landed.)
 */
export function CertBadge({ cert }: { cert: Certification }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-soft transition-shadow duration-200 hover:shadow-lift sm:h-24 sm:px-5 sm:py-4">
      {cert.logo ? (
        /*
          The supplied logos share a 234px height but range from 0.74 to 2.38
          in aspect ratio. Sizing on height alone (h-full w-auto) therefore
          rendered them 47px to 152px wide inside equal grid cells — a 3x
          spread that read as ragged. Constraining BOTH axes and letting
          object-contain letterbox keeps every badge optically similar.
        */
        <Image
          src={cert.logo}
          alt={`${cert.label} certification`}
          width={140}
          height={64}
          className="max-h-full w-full object-contain"
        />
      ) : (
        <span className="text-center text-xs font-bold uppercase tracking-wide text-brand-dark sm:text-sm">
          {cert.label}
        </span>
      )}
    </div>
  );
}

/** Fuller treatment used on the Quality page: badge, scope, and download. */
export function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-soft transition-shadow duration-200 hover:shadow-lift">
      <div className="flex items-start gap-4">
        {cert.logo ? (
          <Image
            src={cert.logo}
            alt={`${cert.label} certification`}
            width={72}
            height={72}
            className="h-14 w-14 shrink-0 object-contain"
          />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-light">
            <ShieldCheck className="h-6 w-6 text-brand-red" aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-brand-dark">{cert.label}</h3>
          {cert.registrar && (
            <p className="mt-0.5 text-xs text-brand-gray">
              Registrar: {cert.registrar}
            </p>
          )}
          {cert.validity && (
            <p className="mt-1 text-xs font-semibold leading-relaxed text-brand-red">
              {cert.validity}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-gray">
        {cert.scope}
      </p>

      {cert.certPdf && (
        <a
          href={cert.certPdf}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${cert.label} documentation (PDF, opens in a new tab)`}
          className="mt-5 inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-brand-red px-4 text-sm font-semibold text-brand-red transition-colors hover:bg-brand-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          View documentation
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}
