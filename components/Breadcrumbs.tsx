import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/**
 * Visible breadcrumb trail plus its matching BreadcrumbList structured data.
 * The final crumb is the current page and is rendered as plain text.
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...crumbs];

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb" className="border-b border-gray-100 bg-white">
        <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-brand-gray sm:px-6 lg:px-8">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 text-slate-300"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span className="font-medium text-brand-dark" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="flex min-h-[2.75rem] items-center transition-colors hover:text-brand-red lg:min-h-0"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
