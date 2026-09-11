import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Symprotek Corporation for a PCB assembly quote, a BOM review, or a supply chain enquiry. Based in Milpitas, California.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Symprotek Corporation",
    description:
      "Request a PCB assembly quote or BOM review from our Milpitas, California facility.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Get in touch for a quote, a BOM review, or to talk through your next build."
      />

      <section className="bg-brand-light py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-soft">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                {companyInfo.name}
              </h2>
              <ul className="mt-3 space-y-1 text-sm text-brand-gray">
                <li className="flex items-start gap-2.5 py-1.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <span>{companyInfo.address}</span>
                </li>
                <li>
                  <a
                    href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
                    className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded px-2 font-medium text-brand-dark transition-colors hover:text-brand-red"
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
                    className="-mx-2 flex min-h-[2.75rem] items-center gap-2.5 rounded px-2 font-medium text-brand-dark transition-colors hover:text-brand-red"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand-red" />
                    <span className="break-all">{companyInfo.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 py-1.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <span>{companyInfo.quoteHours}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-soft">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-dark">
                What to send us
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                The more detail you can share up front, the faster we can turn
                a quote around. Helpful items include your bill of materials,
                Gerber files, target quantities, and required turn time.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
