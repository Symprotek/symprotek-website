import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import { getIndustryBySlug, industries, services } from "@/lib/data";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) return {};

  const url = `/industries/${industry.slug}`;
  return {
    title: `${industry.title} PCB Assembly`,
    description: industry.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${industry.title} PCB Assembly | Symprotek Corporation`,
      description: industry.summary,
      url,
    },
  };
}

export default function IndustryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const industry = getIndustryBySlug(params.slug);
  if (!industry) notFound();

  const Icon = industry.icon;
  const otherIndustries = industries.filter(
    (item) => item.slug !== industry.slug,
  );

  return (
    <>
      <JsonLd data={serviceSchema(industry, "/industries")} />

      <section className="bg-brand-dark py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-red">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {industry.title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-300 sm:text-base">
                {industry.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.title, href: `/industries/${industry.slug}` },
        ]}
      />

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <aside className="space-y-6 lg:col-span-1">
            <div className="rounded-xl bg-white p-5 shadow-soft">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                Why Symprotek
              </h2>
              <ul className="mt-4 space-y-2.5">
                {industry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-sm text-brand-gray"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <nav className="rounded-xl bg-white p-2 shadow-soft">
              <h2 className="px-3 py-2 text-sm font-bold uppercase tracking-wide text-brand-dark">
                Other Industries
              </h2>
              <ul className="space-y-1">
                {otherIndustries.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/industries/${item.slug}`}
                      className="flex min-h-[2.75rem] items-center rounded-lg border-l-4 border-transparent py-2.5 pl-4 pr-3 text-sm font-medium text-brand-dark transition-colors hover:bg-brand-light hover:text-brand-red"
                    >
                      {item.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-10 lg:col-span-3">
            {industry.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-brand-dark">
                  {section.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray sm:text-base">
                  {section.body}
                </p>
              </div>
            ))}

            <div className="rounded-xl border-l-4 border-brand-red bg-white p-6 shadow-soft">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                Services for {industry.title.toLowerCase()} programs
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-start gap-2 text-sm text-brand-gray transition-colors hover:text-brand-red"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="font-semibold text-brand-dark">
                          {service.title}:
                        </span>{" "}
                        {service.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
