import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Cpu,
  Factory,
  Globe2,
  PencilRuler,
  Plane,
  Zap,
} from "lucide-react";

export interface ContentSection {
  heading: string;
  body: string;
}

/** Shared shape behind both the services and industries hub/detail pages. */
export interface ContentEntry {
  slug: string;
  title: string;
  navLabel: string;
  icon: LucideIcon;
  summary: string;
  bullets: string[];
  sections: ContentSection[];
}

export type ServiceSection = ContentSection;
export type Service = ContentEntry;

export const services: Service[] = [
  {
    slug: "pcb-assembly",
    title: "PCB Assembly",
    navLabel: "PCB Assembly",
    icon: Cpu,
    summary:
      "Full turnkey printed circuit board assembly, from prototype through volume production, assembled in the USA.",
    bullets: [
      "Full turnkey & consigned assembly",
      "Prototype to volume production",
      "SMT, through-hole & mixed technology",
      "Assembled in the USA",
    ],
    sections: [
      {
        heading: "Turnkey PCB Assembly",
        body: "Symprotek manages the entire assembly process end to end — component sourcing, SMT and through-hole placement, reflow and wave soldering, and final inspection — so you have a single point of accountability from BOM to finished board.",
      },
      {
        heading: "Prototype Through Production",
        body: "Our lines scale from single-board prototypes to high-volume production runs without changing vendors, keeping your product consistent as it moves from R&D to full manufacturing.",
      },
      {
        heading: "Quality You Can Verify",
        body: "Builds are backed by AOI and X-ray inspection, with flying probe or in-circuit testing selected according to the board and production requirements, plus full traceability on every component and lot.",
      },
    ],
  },
  {
    slug: "quick-turn",
    title: "Quick Turn",
    navLabel: "Quick Turn",
    icon: Zap,
    summary:
      "Accelerated prototype and low-volume PCB assembly turnaround when your schedule can't slip.",
    bullets: [
      "Rapid prototype turnaround",
      "Expedited component sourcing",
      "Low-volume flexible scheduling",
      "Dedicated quick-turn line",
    ],
    sections: [
      {
        heading: "Built for Speed",
        body: "A dedicated quick-turn line and expedited sourcing team let us compress lead times for prototypes and urgent low-volume builds without cutting corners on quality.",
      },
      {
        heading: "Flexible Scheduling",
        body: "Quick-turn jobs are scheduled alongside — not behind — standard production, so urgent programs get the attention they need.",
      },
      {
        heading: "Same Quality Standards",
        body: "Faster turnaround doesn't mean fewer checks: every quick-turn build still passes through our standard AOI and testing process.",
      },
    ],
  },
  {
    slug: "supply-chain",
    title: "Global Supply Chain",
    navLabel: "Supply Chain",
    icon: Globe2,
    summary:
      "Global sourcing and supply chain solutions with local fulfillment and warranty service.",
    bullets: [
      "Global component sourcing",
      "Local fulfillment & kitting",
      "Inventory & warranty management",
      "Obsolescence mitigation",
    ],
    sections: [
      {
        heading: "Global Sourcing, Local Fulfillment",
        body: "We combine a global supplier network with local warehousing so your production line never waits on parts, while you keep the flexibility of a domestic partner.",
      },
      {
        heading: "Warranty & Aftermarket Service",
        body: "Symprotek supports products after they ship, managing repairs, returns, and warranty service so your team can focus on the next design.",
      },
      {
        heading: "Risk Management",
        body: "Proactive obsolescence tracking and multi-source strategies keep your bill of materials resilient against allocation and end-of-life surprises.",
      },
    ],
  },
  {
    slug: "design-service",
    title: "Design Service",
    navLabel: "Design Service",
    icon: PencilRuler,
    summary:
      "Mechanical, electronic, and firmware design services, including full design-for-excellence (DFx) review.",
    bullets: [
      "Mechanical & electronic design",
      "Firmware development",
      "DFx / DFM / DFT review",
      "Rapid prototyping support",
    ],
    sections: [
      {
        heading: "Concept to Production-Ready Design",
        body: "Our engineering team supports mechanical enclosures, electronic schematics and layout, and embedded firmware, aligning every discipline around a manufacturable end product.",
      },
      {
        heading: "Design for Excellence (DFx)",
        body: "Every design passes through DFM, DFT, and DFA review so issues are caught on paper — not on the production floor.",
      },
      {
        heading: "Collaborative Engineering",
        body: "We work directly with your team throughout the design cycle, iterating quickly to keep your program on schedule.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

/* -------------------------------------------------------------------------
 * INDUSTRIES
 *
 * TODO — REVIEW BEFORE LAUNCH.
 * Each vertical below is justified by a certification Symprotek already
 * holds (see `certifications`). The copy describes how our stated services
 * and certifications apply to that industry; it does not claim specific
 * programs, customers, or volumes. Marketing/engineering should confirm each
 * vertical is one we actively serve, and add real program examples where we
 * have permission to describe them.
 * ---------------------------------------------------------------------- */

export type Industry = ContentEntry;

export const industries: Industry[] = [
  {
    slug: "aerospace-defense",
    title: "Aerospace & Defense",
    navLabel: "Aerospace & Defense",
    icon: Plane,
    summary:
      "ITAR-registered, MIL-SPEC capable PCB assembly for defense and aerospace programs, built entirely in the USA.",
    bullets: [
      "ITAR registered",
      "MIL-SPEC capable assembly",
      "Assembled in the USA",
      "Full lot & component traceability",
    ],
    sections: [
      {
        heading: "ITAR-Registered, US-Based Manufacturing",
        body: "Symprotek is ITAR registered and every board is assembled at our Milpitas, California facility. For programs governed by export control, that means your technical data and your hardware stay within a domestic, registered supply chain from BOM to finished assembly.",
      },
      {
        heading: "Built to MIL-SPEC Requirements",
        body: "Defense hardware carries workmanship and documentation requirements that commercial builds do not. Our processes support MIL-SPEC assembly requirements, and every build carries full traceability on each component and lot so you can answer audit questions years after delivery.",
      },
      {
        heading: "Long Program Lifecycles",
        body: "Defense platforms outlive the components they were designed around. Our supply chain team tracks obsolescence and maintains multi-source strategies so a discontinued part doesn't stop a program that still has a decade of service ahead of it.",
      },
    ],
  },
  {
    slug: "medical-devices",
    title: "Medical Devices",
    navLabel: "Medical Devices",
    icon: Activity,
    summary:
      "ISO 13485 certified electronics manufacturing for medical device OEMs, from prototype through validated production.",
    bullets: [
      "ISO 13485 certified",
      "Full device history traceability",
      "Controlled process documentation",
      "Prototype through production",
    ],
    sections: [
      {
        heading: "ISO 13485 Certified Quality System",
        body: "Our quality management system is certified to ISO 13485, the standard written specifically for medical device manufacturing. That means the process controls, documentation, and record-keeping your regulatory submissions depend on are already part of how we build.",
      },
      {
        heading: "Traceability That Survives an Audit",
        body: "Every component, lot, and process step is recorded. When a regulator or your own quality team asks what went into a device built two years ago, the record exists and it is retrievable.",
      },
      {
        heading: "From Development Through Production",
        body: "Medical programs move slowly through validation and then need to scale without changing anything. Our lines run prototypes and production volumes in the same facility under the same quality system, so scaling up doesn't mean re-validating a new supplier.",
      },
    ],
  },
  {
    slug: "industrial-equipment",
    title: "Industrial & Capital Equipment",
    navLabel: "Industrial Equipment",
    icon: Factory,
    summary:
      "ISO 9001 certified assembly for industrial controls, automation, and capital equipment built to run for years.",
    bullets: [
      "ISO 9001 certified",
      "Mixed technology & high-reliability builds",
      "Low-to-mid volume production",
      "Aftermarket & warranty support",
    ],
    sections: [
      {
        heading: "Built for Duty Cycles, Not Product Cycles",
        body: "Industrial electronics are expected to run continuously in environments that consumer hardware would not survive. Our ISO 9001 certified processes combine AOI and X-ray inspection with flying probe or in-circuit testing selected for the board and production requirements, targeting the reliability that capital equipment demands.",
      },
      {
        heading: "Volumes That Actually Match Your Business",
        body: "Capital equipment rarely ships in consumer quantities. We are structured for the low-to-mid volume, high-mix production that industrial OEMs actually run, without the minimums that make larger contract manufacturers a poor fit.",
      },
      {
        heading: "Support After the Sale",
        body: "Equipment installed in the field needs spares and repairs for as long as it runs. Our warranty and aftermarket service covers repairs and returns, and our supply chain team manages obsolescence so you can keep supporting installed equipment.",
      },
    ],
  },
  {
    slug: "semiconductor-test",
    title: "Semiconductor & Test Equipment",
    navLabel: "Semiconductor & Test",
    icon: Cpu,
    summary:
      "Silicon Valley-based assembly for semiconductor capital equipment, ATE, and instrumentation OEMs.",
    bullets: [
      "Located in Milpitas, California",
      "Complex, high-mix assemblies",
      "Engineering collaboration on-site",
      "Quick-turn prototype support",
    ],
    sections: [
      {
        heading: "In the Middle of Silicon Valley",
        body: "Our Milpitas facility sits inside the semiconductor equipment corridor. For OEMs headquartered nearby, that means engineers can be on our floor the same day a build question comes up — a materially different relationship than managing a build across an ocean and twelve time zones.",
      },
      {
        heading: "High-Mix, High-Complexity Builds",
        body: "Semiconductor capital equipment and automated test systems tend toward dense, complex, low-volume assemblies with frequent revisions. That is the work our lines and our engineering team are built around.",
      },
      {
        heading: "Fast Iteration on New Designs",
        body: "Instrumentation and test programs iterate quickly. Our dedicated quick-turn line and DFM review shorten the loop between a design change and a working board in your engineer's hands.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

/* -------------------------------------------------------------------------
 * CERTIFICATIONS
 *
 * The `logo` images were sliced from the composite certification strips on the
 * legacy symprotek.com (see scripts/slice-cert-strips.mjs). The sources are
 * only 78px tall, so the badges are STOPGAP quality — replace them with
 * vector-derived exports before launch.
 *
 * PDF files are served as static assets from /public/documents/certifications/.
 * Keep the filenames below stable so links do not change when a document is
 * replaced with a renewed version.
 *
 * TODO — still outstanding:
 *   - `registrar` should be confirmed against the actual certificates.
 *   - AS9100 is not listed because it does not appear anywhere in the existing
 *     site content. If Symprotek holds AS9100D, add it — it is a headline
 *     credential for the aerospace & defense vertical.
 *   - IPC-A-610 appears in the design mockups but not on the legacy site's
 *     badge strip. Confirm before adding.
 *
 * Badges and download links render only when the corresponding field is set,
 * so the page degrades gracefully as assets land.
 * ---------------------------------------------------------------------- */

export interface Certification {
  label: string;
  /** One-line explanation of what the credential covers. */
  scope: string;
  /** Path under /public/images/certifications/. */
  logo?: string;
  /** Path under /public/documents/certifications/. */
  certPdf?: string;
  registrar?: string;
  /** Human-readable validity or historical status shown on the full card. */
  validity?: string;
}

export const certifications: Certification[] = [
  {
    label: "ISO 9001:2015",
    logo: "/images/certifications/iso-9001.png",
    certPdf: "/documents/certifications/iso-9001.pdf",
    registrar: "NQA, USA",
    scope:
      "Quality management system certified to the international standard for consistent, repeatable manufacturing processes.",
  },
  {
    label: "ISO 13485:2016",
    logo: "/images/certifications/iso-13485.png",
    certPdf: "/documents/certifications/iso-13485.pdf",
    registrar: "NQA, USA",
    scope:
      "Quality management system certified to the international standard written specifically for medical device manufacturing.",
  },
  {
    label: "FDA Registered",
    logo: "/images/certifications/fda.png",
    scope:
      "Registered with the US Food and Drug Administration as a medical device contract manufacturing establishment.",
  },
  {
    label: "ITAR Registered",
    logo: "/images/certifications/itar.png",
    certPdf: "/documents/certifications/itar-registration-2018-2019.pdf",
    validity: "2018-2019",
    scope:
      "This historical registration was issued by the US Directorate of Defense Trade Controls for handling export-controlled defense articles and technical data.",
  },
  {
    label: "MIL-SPEC",
    logo: "/images/certifications/mil-spec.png",
    scope:
      "Assembly processes capable of meeting United States military specification requirements.",
  },
  {
    label: "SBA 8(a) Certified",
    logo: "/images/certifications/sba-8a.png",
    scope:
      "Certified under the Small Business Administration 8(a) Business Development Program, supporting federal set-aside and sole-source awards.",
  },
  {
    label: "RoHS Compliant",
    logo: "/images/certifications/rohs.png",
    certPdf: "/documents/certifications/rohs-compliance.pdf",
    scope:
      "Processes support builds restricting the hazardous substances covered by the RoHS directive.",
  },
  {
    label: "Assembled in the USA",
    logo: "/images/certifications/assembled-in-usa.png",
    scope:
      "All assembly is performed at our Milpitas, California facility, supporting domestic sourcing requirements.",
  },
];

/* ---------------------------------------------------------------------- */

export const companyInfo = {
  name: "Symprotek Corporation",
  address: "950 Yosemite Drive, Milpitas, CA 95035",
  streetAddress: "950 Yosemite Drive",
  city: "Milpitas",
  state: "CA",
  postalCode: "95035",
  country: "US",
  phone: "(408) 956-0700",
  fax: "(408) 956-9400",
  email: "sales@symprotek.com",
  foundedYear: 1994,
  // Confirmed business hours. Also feeds LocalBusiness structured data via
  // lib/schema.ts — keep the two in sync.
  hours: "Monday – Friday, 9:00 AM – 2:00 PM PT",
  // Shown on the Request a Quote page (/contact) only. Deliberately separate
  // from `hours`, which covers the rest of the site and the LocalBusiness
  // structured data in lib/schema.ts.
  quoteHours: "Monday – Friday, 6:30 AM – 3:00 PM PT",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.symprotek.com";

/* -------------------------------------------------------------------------
 * HEADLINE STATS
 *
 * !! UNVERIFIED — CONFIRM BEFORE LAUNCH. !!
 * The customer and assembly figures below are carried over from the design
 * mockups and have NOT been confirmed against actual company records. They are
 * public-facing claims about a US defense and medical supplier, so they need
 * sign-off from someone who can substantiate them. Edit the `value` strings
 * here and every page that renders them updates.
 *
 * `yearsInBusiness` is derived from `companyInfo.foundedYear` so it cannot go
 * stale, and is the one figure here that is self-evidently correct.
 * ---------------------------------------------------------------------- */

export interface Stat {
  value: string;
  label: string;
}

const yearsInBusiness =
  Math.floor((new Date().getFullYear() - companyInfo.foundedYear) / 10) * 10;

export const companyStats: Stat[] = [
  { value: `${yearsInBusiness}+`, label: "Years in Business" },
  // TODO — confirm. Placeholder from the design mockups.
  { value: "500+", label: "Customers Served" },
  // TODO — confirm. Placeholder from the design mockups.
  { value: "1M+", label: "Assemblies Delivered Annually" },
  { value: "Global", label: "Manufacturing Network" },
];

/* -------------------------------------------------------------------------
 * PROGRAM LIFECYCLE
 * The stages a customer program moves through, rendered as the home-page
 * timeline. Descriptive of the services already listed above — no new claims.
 * ---------------------------------------------------------------------- */

export interface LifecycleStage {
  label: string;
  detail: string;
}

export const lifecycleStages: LifecycleStage[] = [
  { label: "Concept", detail: "DFM and DFT review before layout is frozen." },
  { label: "Prototype", detail: "Quick-turn boards built on a dedicated line." },
  { label: "NPI", detail: "Process definition, tooling, and first articles." },
  { label: "Pilot Build", detail: "Low-volume runs that prove the process." },
  { label: "Volume", detail: "Scaled production under the same quality system." },
  { label: "Lifecycle", detail: "Obsolescence management, warranty, and repair." },
];

/* -------------------------------------------------------------------------
 * VALUE PROPOSITIONS
 * Each one maps to a certification or service Symprotek already holds, so the
 * home page can lead with differentiators without inventing capability.
 * ---------------------------------------------------------------------- */

export interface ValueProp {
  title: string;
  body: string;
  /** Route that substantiates the claim. */
  href: string;
}

export const valueProps: ValueProp[] = [
  {
    title: "Medical Device Expertise",
    body: "ISO 13485 certified and FDA registered, with the process controls and traceability your regulatory submissions depend on.",
    href: "/industries/medical-devices",
  },
  {
    title: "Defense-Ready Compliance",
    body: "ITAR registered and SBA 8(a) certified, with every board assembled inside a domestic, export-controlled supply chain.",
    href: "/industries/aerospace-defense",
  },
  {
    title: "Engineering Partnership",
    body: "DFM, DFT, and DFA review plus mechanical, electronic, and firmware design support from concept through production.",
    href: "/services/design-service",
  },
  {
    title: "Supply Chain Resilience",
    body: "Global sourcing with local fulfillment, proactive obsolescence tracking, and multi-source strategies that keep lines running.",
    href: "/services/supply-chain",
  },
];

/* -------------------------------------------------------------------------
 * NAVIGATION
 * ---------------------------------------------------------------------- */

export interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

export const navLinks: NavLink[] = [
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services", label: "All Services" },
      ...services.map((service) => ({
        href: `/services/${service.slug}`,
        label: service.navLabel,
      })),
    ],
  },
  {
    href: "/industries",
    label: "Industries",
    children: [
      { href: "/industries", label: "All Industries" },
      ...industries.map((industry) => ({
        href: `/industries/${industry.slug}`,
        label: industry.navLabel,
      })),
    ],
  },
  {
    href: "/about",
    label: "Company",
    children: [
      { href: "/about", label: "About Symprotek" },
      { href: "/quality", label: "Quality & Certifications" },
      { href: "/facility", label: "Facility & Equipment" },
      { href: "/capabilities", label: "Capabilities" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    href: "/faq",
    label: "Resources",
    children: [
      { href: "/faq", label: "FAQ" },
      { href: "/nda", label: "Mutual NDA" },
    ],
  },
];

/*
 * Contact is deliberately absent. It pointed at /contact, and the "Request a
 * Quote" button sits immediately beside it (desktop) or directly beneath it
 * (mobile menu) pointing at the same page — two adjacent links to one
 * destination. /contact is now reached from that button, from the icon next
 * to the mobile hamburger, and from the footer.
 */

/* Contact remains represented by the persistent Request a Quote button rather
 * than being duplicated inside the Resources dropdown. */

/** Flat list of every crawlable static route, consumed by app/sitemap.ts. */
export const staticRoutes = [
  "/",
  "/about",
  "/quality",
  "/facility",
  "/careers",
  "/services",
  "/industries",
  "/capabilities",
  "/faq",
  "/contact",
  "/privacy",
  "/terms",
  "/nda",
];
