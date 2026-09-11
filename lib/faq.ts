/* -------------------------------------------------------------------------
 * FAQ
 *
 * TODO — REVIEW BEFORE LAUNCH.
 * Answers below are drawn from claims already made elsewhere on this site.
 * Anything requiring a number we have not published (minimum order quantity,
 * standard lead times, quote turnaround) is deliberately written without one.
 * Fill those in once sales confirms them — specific numbers convert far
 * better than "contact us", and they are what competitors rank on.
 *
 * This list feeds FAQPage structured data, so every answer here is eligible
 * to appear directly in Google results. Keep answers accurate and concise.
 * ---------------------------------------------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FaqItem[] = [
  {
    category: "Getting Started",
    question: "How do I request a quote?",
    answer:
      "Use the contact form and attach your bill of materials, Gerber files, or assembly drawings. Helpful details include target quantities, required turn time, and any certification requirements your program carries. You can also call us at (408) 956-0700.",
  },
  {
    category: "Getting Started",
    question: "What files do you need to quote a PCB assembly?",
    answer:
      "At minimum, a bill of materials and Gerber files. Assembly drawings, pick-and-place files, and a test specification let us quote more accurately and flag manufacturability issues earlier. We accept .xls, .xlsx, .csv, .pdf, and .zip files through our contact form.",
  },
  {
    category: "Getting Started",
    question: "Do you work with prototype quantities?",
    answer:
      "Yes. We assemble single-board prototypes through volume production on the same lines, and we maintain a dedicated quick-turn line for prototype and urgent low-volume builds.",
  },
  {
    category: "Services",
    question: "What is the difference between turnkey and consigned assembly?",
    answer:
      "In a turnkey build, Symprotek sources every component on your bill of materials in addition to performing the assembly, giving you a single point of accountability. In a consigned build, you supply the components and we perform the assembly. We support both, as well as partial-turnkey arrangements where you supply long-lead or customer-specific parts and we source the rest.",
  },
  {
    category: "Services",
    question: "Do you offer design services, or only assembly?",
    answer:
      "We provide mechanical design, electronic schematic and layout design, and embedded firmware development, along with DFM, DFT, and DFA review. Teams engage us for the full design cycle or for review of a design their own engineers have completed.",
  },
  {
    category: "Services",
    question: "Can you handle both SMT and through-hole assembly?",
    answer:
      "Yes. We perform surface mount, through-hole, and mixed technology assembly, including reflow and wave soldering.",
  },
  {
    category: "Services",
    question: "Do you support products after they ship?",
    answer:
      "Yes. We manage repairs, returns, and warranty service, and our supply chain team tracks component obsolescence so you can keep supporting equipment already installed in the field.",
  },
  {
    category: "Quality & Certifications",
    question: "What certifications does Symprotek hold?",
    answer:
      "Symprotek is ITAR registered, SBA 8(a) certified, and maintains ISO 9001 and ISO 13485 certified quality management systems. Our processes support MIL-SPEC and RoHS requirements, and all assembly is performed in the USA.",
  },
  {
    category: "Quality & Certifications",
    question: "What testing and inspection do you perform?",
    answer:
      "Inspection and test capabilities include automated optical inspection (AOI), X-ray inspection, flying probe testing, and in-circuit testing, with the electrical test method selected according to board design, test access, production volume, and customer requirements. Full traceability is recorded on every component and lot.",
  },
  {
    category: "Quality & Certifications",
    question: "Can you support ITAR-controlled programs?",
    answer:
      "Yes. Symprotek is ITAR registered and all assembly is performed at our Milpitas, California facility, keeping export-controlled technical data and hardware within a domestic, registered supply chain.",
  },
  {
    category: "Quality & Certifications",
    question: "Are you a certified small business for federal contracting?",
    answer:
      "Yes. Symprotek is certified under the SBA 8(a) Business Development Program, which supports direct award through 8(a) sole-source and set-aside contract vehicles. We work both as a direct supplier to agencies and as a subcontractor to prime contractors.",
  },
  {
    category: "Logistics",
    question: "Where are your boards assembled?",
    answer:
      "All assembly is performed at our facility at 950 Yosemite Drive, Milpitas, California — in the heart of Silicon Valley.",
  },
  {
    category: "Logistics",
    question: "Can you source components globally?",
    answer:
      "Yes. We combine a global supplier network with local warehousing and kitting, so sourcing reach does not come at the cost of having a domestic manufacturing partner. Our team also maintains multi-source strategies and tracks obsolescence to protect against allocation and end-of-life disruptions.",
  },
  {
    category: "Logistics",
    question: "Will you sign an NDA before we share our design files?",
    answer:
      "Yes. We routinely execute mutual non-disclosure agreements before receiving design data. You can download our standard mutual NDA, or send us yours.",
  },
  {
    category: "Logistics",
    question: "How long has Symprotek been in business?",
    answer:
      "Symprotek has been building electronics since 1994.",
  },
];

export const faqCategories = Array.from(new Set(faqs.map((f) => f.category)));
