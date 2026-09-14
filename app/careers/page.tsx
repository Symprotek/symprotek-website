import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Symprotek Corporation, an electronics manufacturer in Milpitas, California building for defense, medical, and federal programs since 1994.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Symprotek Corporation",
    description:
      "Open roles at our Milpitas, California electronics manufacturing facility.",
    url: "/careers",
  },
};

/* TODO — SUPPLY OPEN ROLES.
   Add entries to `openRoles` as positions become available. The page renders
   a "no current openings" state when the array is empty, and switches to a
   role listing automatically once entries exist — no layout changes needed.

   HR should also supply real benefits and culture copy to replace the
   generic framing below.

   If roles are listed here long-term, consider adding JobPosting structured
   data so they appear in Google Jobs — competitors are not doing this.      */

interface Role {
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
}

const openRoles: Role[] = [];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers"
        description={`Build hardware that matters, at a company that has been doing it since ${companyInfo.foundedYear}.`}
      />
      <Breadcrumbs crumbs={[{ name: "Careers", href: "/careers" }]} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Working at Symprotek
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-gray">
            <p>
              We build electronics for defense platforms, medical devices, and
              federal programs — hardware where the work has to be right, and
              where the record of how it was built matters for years after it
              ships.
            </p>
            <p>
              That shapes the kind of place this is. We are a single-facility
              manufacturer in Milpitas, small enough that the person building a
              board can talk to the person who quoted it, and established enough
              that we have been doing it since {companyInfo.foundedYear}.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Open positions
          </h2>

          {openRoles.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {openRoles.map((role) => (
                <li
                  key={role.title}
                  className="rounded-xl bg-white p-6 shadow-soft"
                >
                  <h3 className="text-lg font-bold text-brand-dark">
                    {role.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-brand-gray">
                    <span>{role.department}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-red" />
                      {role.location}
                    </span>
                    <span>{role.type}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                    {role.summary}
                  </p>
                  <Link
                    href={`/careers/apply?role=${encodeURIComponent(role.title)}`}
                    className="btn-primary mt-4"
                  >
                    Apply for this role
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-soft">
              <h3 className="text-lg font-bold text-brand-dark">
                No open positions right now
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-brand-gray">
                We&apos;re not actively hiring at the moment, but we always want
                to hear from experienced assembly, test, and manufacturing
                engineering people. Send us your resume and we&apos;ll keep it
                on file.
              </p>
              <Link href="/careers/apply" className="btn-primary mt-6">
                Send us your resume
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">
            Where you&apos;d work
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-gray">
            {companyInfo.address}
          </p>
          <p className="mt-2 text-sm text-brand-gray">{companyInfo.hours}</p>
          <Link
            href="/facility"
            className="mt-3 inline-flex min-h-[2.75rem] items-center text-sm font-semibold text-brand-red transition-colors hover:text-brand-red-dark"
          >
            See our facility →
          </Link>
        </div>
      </section>
    </>
  );
}
