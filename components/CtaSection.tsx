import Link from "next/link";
import { Phone } from "lucide-react";
import { companyInfo } from "@/lib/data";

interface CtaSectionProps {
  heading?: string;
  description?: string;
  /**
   * "vibrant" is a homepage-only look (blue band instead of navy, brighter
   * red buttons). Defaults to "default" so every other page that renders
   * this shared section is unaffected.
   */
  tone?: "default" | "vibrant";
}

/** Closing conversion band. Used at the foot of every content page. */
export default function CtaSection({
  heading = "Ready to talk about your next build?",
  description = "Send us your BOM and Gerber files and we'll get back to you with a quote.",
  tone = "default",
}: CtaSectionProps) {
  const isVibrant = tone === "vibrant";

  return (
    <section className={isVibrant ? "bg-[#0066b8] py-12 sm:py-16" : "bg-brand-dark py-12 sm:py-16"}>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        <p className={isVibrant ? "mt-3 text-base leading-relaxed text-blue-50/90" : "mt-3 text-base leading-relaxed text-slate-300"}>
          {description}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className={isVibrant ? "btn-primary-vibrant" : "btn-primary"}
          >
            Request a Quote
          </Link>
          <a
            href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
            className={isVibrant ? "btn-outline-vibrant" : "btn-outline"}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {companyInfo.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
