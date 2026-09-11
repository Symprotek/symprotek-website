import Link from "next/link";
import { companyInfo } from "@/lib/data";

const suggestions = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/quality", label: "Quality & Certifications" },
];

export default function NotFound() {
  return (
    <section className="bg-brand-light py-12 sm:py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-red">
          404
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-base leading-relaxed text-brand-gray">
          The page may have moved or the link may be out of date. Here are a few
          places to pick things back up.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:border-brand-red hover:text-brand-red"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white"
          >
            Contact Us
          </Link>
        </div>

        <p className="mt-8 text-sm text-brand-gray">
          Or call us at{" "}
          <a
            href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
            className="font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
          >
            {companyInfo.phone}
          </a>
        </p>
      </div>
    </section>
  );
}
