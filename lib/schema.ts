import {
  certifications,
  companyInfo,
  siteUrl,
  type ContentEntry,
} from "@/lib/data";
import type { FaqItem } from "@/lib/faq";

/** Builders for the JSON-LD blocks rendered via <JsonLd />. */

const absolute = (path: string) =>
  path.startsWith("http") ? path : `${siteUrl}${path}`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: companyInfo.streetAddress,
  addressLocality: companyInfo.city,
  addressRegion: companyInfo.state,
  postalCode: companyInfo.postalCode,
  addressCountry: companyInfo.country,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: companyInfo.name,
    url: siteUrl,
    logo: absolute("/opengraph-image.png"),
    email: companyInfo.email,
    telephone: companyInfo.phone,
    faxNumber: companyInfo.fax,
    foundingDate: String(companyInfo.foundedYear),
    address: postalAddress,
    description:
      "Symprotek Corporation delivers turnkey PCB assembly, global supply chain, design, and quick-turn manufacturing services from Milpitas, California.",
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: cert.label,
      description: cert.scope,
    })),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#localbusiness`,
    name: companyInfo.name,
    url: siteUrl,
    image: absolute("/opengraph-image.png"),
    email: companyInfo.email,
    telephone: companyInfo.phone,
    faxNumber: companyInfo.fax,
    address: postalAddress,
    // Confirmed business hours. Keep in sync with companyInfo.hours.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: { "@type": "Country", name: "United States" },
    parentOrganization: { "@id": `${siteUrl}/#organization` },
  };
}

export function serviceSchema(entry: ContentEntry, basePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: entry.title,
    description: entry.summary,
    url: absolute(`${basePath}/${entry.slug}`),
    serviceType: entry.title,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.href),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
