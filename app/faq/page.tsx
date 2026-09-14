import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import { faqCategories, faqs } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers on requesting a quote, turnkey vs. consigned assembly, certifications, testing, ITAR, SBA 8(a), and working with Symprotek Corporation.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Symprotek Corporation",
    description:
      "Answers on quoting, assembly options, certifications, testing, and export control.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      {/* Every answer here is eligible for FAQ rich results in Google. */}
      <JsonLd data={faqSchema(faqs)} />

      <PageHeader
        title="Frequently Asked Questions"
        description="The questions engineers and sourcing teams ask us most often."
      />
      <Breadcrumbs crumbs={[{ name: "FAQ", href: "/faq" }]} />

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="FAQ categories" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {faqCategories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="inline-flex min-h-[2.75rem] items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:border-brand-red hover:text-brand-red"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {faqCategories.map((category) => {
              const categoryId = category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-");
              return (
                <div key={category} id={categoryId} className="scroll-mt-28">
                  <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark">
                    {category}
                  </h2>
                  <dl className="mt-6 space-y-4">
                    {faqs
                      .filter((faq) => faq.category === category)
                      .map((faq) => (
                        <div
                          key={faq.question}
                          className="rounded-xl bg-white p-6 shadow-soft"
                        >
                          <dt className="text-base font-bold text-brand-dark">
                            {faq.question}
                          </dt>
                          <dd className="mt-3 text-sm leading-relaxed text-brand-gray">
                            {faq.answer}
                          </dd>
                        </div>
                      ))}
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection
        heading="Still have a question?"
        description="If your question isn't answered here, send it over: we'd rather answer it directly than have you guess."
      />
    </>
  );
}
