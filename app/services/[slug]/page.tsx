import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import Sidebar from "@/components/Sidebar";
import { certifications, getServiceBySlug, services } from "@/lib/data";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const url = `/services/${service.slug}`;
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} | Symprotek Corporation`,
      description: service.summary,
      url,
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      <JsonLd data={serviceSchema(service, "/services")} />

      <section className="bg-brand-dark py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-red">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-300 sm:text-base">
                {service.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs
        crumbs={[
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-1">
            <Sidebar />
          </div>

          <div className="space-y-10 lg:col-span-3">
            {service.sections.map((section) => (
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
                Backed by our certifications
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                Every build ships under the same quality systems, whichever
                service brought you here.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert.label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-brand-red"
                      aria-hidden="true"
                    />
                    {cert.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
