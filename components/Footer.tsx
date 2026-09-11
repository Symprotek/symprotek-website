import Link from "next/link";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import {
  certifications,
  companyInfo,
  industries,
  services,
} from "@/lib/data";

const companyLinks = [
  { href: "/about", label: "About Symprotek" },
  { href: "/quality", label: "Quality & Certifications" },
  { href: "/facility", label: "Facility & Equipment" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/careers", label: "Careers" },
];

const resourceLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/nda", label: "Mutual NDA" },
  { href: "/contact", label: "Request a Quote" },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
        {heading}
      </h3>
      {/* Comfortable row height on touch: the links previously sat at 16px
          tall, well under the 44px target floor. Negative inline margin keeps
          the text visually flush with the heading despite the padding. */}
      <ul className="mt-3 text-sm sm:mt-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="-mx-2 flex min-h-[2.75rem] items-center rounded px-2 transition-colors hover:text-brand-red"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
        {/*
          Two link columns side by side on mobile. Stacking all five in one
          column pushed the footer to ~1900px — 19% of the whole mobile page,
          and taller than the hero. The brand/contact block spans the full
          width above them.
        */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Sym<span className="text-brand-red">protek</span>
            </span>
            <ul className="mt-5 space-y-1 text-sm">
              <li className="flex items-start gap-2.5 py-1.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <span>{companyInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded px-2 transition-colors hover:text-brand-red"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-red" />
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 py-1.5">
                <Printer className="h-4 w-4 shrink-0 text-brand-red" />
                <span>{companyInfo.fax}</span>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded px-2 transition-colors hover:text-brand-red"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                  <span className="break-all">{companyInfo.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <FooterColumn
            heading="Services"
            links={[
              { href: "/services", label: "All Services" },
              ...services.map((service) => ({
                href: `/services/${service.slug}`,
                label: service.navLabel,
              })),
            ]}
          />

          <FooterColumn
            heading="Industries"
            links={[
              { href: "/industries", label: "All Industries" },
              ...industries.map((industry) => ({
                href: `/industries/${industry.slug}`,
                label: industry.navLabel,
              })),
            ]}
          />

          <FooterColumn heading="Company" links={companyLinks} />
          <FooterColumn heading="Resources" links={resourceLinks} />
        </div>

        <div className="mt-8 sm:mt-12 border-t border-white/10 pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Certifications
          </h3>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {certifications.map((cert) => (
              <li
                key={cert.label}
                className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {cert.label}
              </li>
            ))}
          </ul>
          <Link
            href="/quality"
            className="mt-3 inline-flex min-h-[2.75rem] items-center text-sm font-semibold text-brand-red transition-colors hover:text-white"
          >
            View our quality system &amp; certificates →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-4 py-4 text-xs text-slate-400 sm:flex-row sm:gap-3 sm:py-5 sm:px-6 lg:px-8">
          <span className="order-2 text-center sm:order-1 sm:text-left">
            © {companyInfo.foundedYear}–{currentYear} {companyInfo.name}. All
            Rights Reserved.
          </span>
          <div className="order-1 flex gap-2 sm:order-2 sm:gap-5">
            <Link
              href="/privacy"
              className="flex min-h-[2.75rem] items-center px-2 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="flex min-h-[2.75rem] items-center px-2 transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
