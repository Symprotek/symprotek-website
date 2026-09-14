import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import PageHeader from "@/components/PageHeader";
import { companyInfo, industries } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Symprotek",
  description:
    "Symprotek Corporation has built electronics in Milpitas, California since 1994, an ITAR registered, SBA 8(a) certified contract manufacturer serving defense, medical, and federal programs.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Symprotek Corporation",
    description:
      "An ITAR registered, SBA 8(a) certified electronics manufacturer building in Milpitas, California since 1994.",
    url: "/about",
  },
};

/* TODO — CONTENT REVIEW REQUIRED.
   The copy below is written only from facts already published on this site:
   founding year, location, services, and certifications. It deliberately
   avoids specifics we cannot verify — headcount, floor space, leadership
   names, customer names, revenue, and program history.

   Before launch, marketing should add:
   - The real founding story and who founded the company
   - Leadership team names, titles, and bios (competitors all publish these)
   - Square footage and headcount
   - Any named or anonymized customer programs we can describe        */

const principles = [
  {
    heading: "One partner, end to end",
    body: "Sourcing, assembly, test, and aftermarket support live under one roof. There is no seam between vendors for a problem to fall through, and one phone number to call when something needs attention.",
  },
  {
    heading: "Built where we say it is built",
    body: "Every board is assembled at our Milpitas facility. For customers with export control obligations or domestic content requirements, that is not a marketing line. It is the reason the work can be placed here at all.",
  },
  {
    heading: "Certified before it is convenient",
    body: "ITAR registration, ISO 9001, ISO 13485, and SBA 8(a) certification each carry real ongoing cost. We maintain them because the programs we serve cannot use a manufacturer that does not.",
  },
  {
    heading: "Prototype and production on the same lines",
    body: "A design that moves from prototype to volume does not change vendors, change process, or get re-qualified. That continuity is worth more to a regulated program than a marginally lower unit price.",
  },
];

export default function AboutPage() {
  const yearsInBusiness = new Date().getFullYear() - companyInfo.foundedYear;

  return (
    <>
      <PageHeader
        title="About Symprotek"
        description={`Building electronics in Silicon Valley since ${companyInfo.foundedYear}.`}
      />
      <Breadcrumbs crumbs={[{ name: "About", href: "/about" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            {yearsInBusiness} years of building other people&apos;s hardware
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-gray">
            <p>
              Symprotek Corporation has been assembling printed circuit boards
              from Milpitas, California since {companyInfo.foundedYear}. In that
              time the industry moved most electronics manufacturing offshore
              and then, in the programs we serve, moved a meaningful share of it
              back.
            </p>
            <p>
              We stayed put. Every board we ship is assembled at our own
              facility in the middle of Silicon Valley, by people our customers
              can meet, on lines they can walk. For defense, medical, and
              federal programs, that is a requirement rather than a preference,
              and for the semiconductor equipment makers headquartered a few
              exits away, it means an engineer can be on our floor the same
              afternoon a build question comes up.
            </p>
            <p>
              We are a contract manufacturer, which means our name is not on the
              product. Our customers&apos; names are. The measure of the work is
              whether their hardware does what it was designed to do, for as
              long as it is meant to do it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            How we operate
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.heading}
                className="rounded-xl bg-white p-6 shadow-soft"
              >
                <h3 className="text-lg font-bold text-brand-red">
                  {principle.heading}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                Where we are
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-gray">
                Our facility sits at {companyInfo.address}, inside the
                semiconductor equipment corridor, within driving distance of
                most of our customers&apos; engineering teams.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-gray">
                Visitors are welcome. If you are evaluating us as a supplier,
                walking the floor tells you more in an hour than a capabilities
                deck will in a week.
              </p>
              <Link href="/facility" className="btn-primary mt-6">
                See our facility &amp; equipment
              </Link>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
                Who we build for
              </h2>
              <ul className="mt-4 space-y-3">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="group block rounded-lg border border-gray-200 p-4 transition-colors hover:border-brand-red"
                    >
                      <span className="font-semibold text-brand-dark transition-colors group-hover:text-brand-red">
                        {industry.title}
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-brand-gray">
                        {industry.summary}
                      </p>
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
