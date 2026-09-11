"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { services } from "@/lib/data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="space-y-6">
      <nav className="rounded-xl bg-white p-2 shadow-soft">
        <ul className="space-y-1">
          {services.map((service) => {
            const href = `/services/${service.slug}`;
            const isActive = pathname === href;
            return (
              <li key={service.slug}>
                <Link
                  href={href}
                  className={`block rounded-lg py-3 pl-4 pr-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-l-4 border-brand-red bg-brand-light text-brand-red"
                      : "border-l-4 border-transparent text-brand-dark hover:bg-brand-light"
                  }`}
                >
                  {service.navLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/*
        This widget previously held a drag-and-drop zone that stored a filename
        in local state and transmitted nothing — users believed their BOM had
        been sent when it had not. It now links to the contact form, which is
        the one place a file actually reaches us.
      */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-soft">
        <h3 className="text-sm font-bold text-brand-dark">PCBA Quick Quote</h3>
        <p className="mt-1 text-xs leading-relaxed text-brand-gray">
          Send us your BOM and Gerber files and we&apos;ll get back to you with
          a quote.
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 text-center">
          <UploadCloud className="h-7 w-7 text-brand-gray" aria-hidden="true" />
          <span className="text-xs font-medium text-brand-dark">
            Upload your BOM
          </span>
          <span className="text-xs text-brand-gray">
            .xls, .xlsx, .csv, .pdf or .zip
          </span>
        </div>

        <Link href="/contact" className="btn-primary mt-4 w-full">
          Submit for Quote
        </Link>
      </div>
    </aside>
  );
}
