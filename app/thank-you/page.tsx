import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { companyInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been sent to Symprotek Corporation.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-brand-light py-12 sm:py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <CheckCircle2
          className="mx-auto h-14 w-14 text-brand-red"
          aria-hidden="true"
        />
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
          Thanks — we&apos;ve got your message
        </h1>
        <p className="mt-4 text-base leading-relaxed text-brand-gray">
          A member of our team will review your request and get back to you
          shortly. We&apos;ve also sent a confirmation to the email address you
          provided.
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-soft">
          <p className="text-sm text-brand-gray">
            Need to reach us sooner? Call us directly.
          </p>
          <a
            href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
            className="mt-1 inline-flex min-h-[2.75rem] items-center gap-2 text-lg font-bold text-brand-dark transition-colors hover:text-brand-red"
          >
            <Phone className="h-5 w-5 text-brand-red" />
            {companyInfo.phone}
          </a>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link
            href="/capabilities"
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-dark px-6 py-3 text-sm font-semibold text-brand-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark hover:text-white"
          >
            Explore Our Capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}
