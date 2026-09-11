import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { companyInfo, siteUrl } from "@/lib/data";
import { localBusinessSchema, organizationSchema } from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Symprotek Corporation delivers turnkey PCB assembly, global supply chain, design, and quick-turn manufacturing services from Milpitas, California. ITAR registered, ISO 9001 and ISO 13485 certified.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Symprotek Corporation | PCB Assembly & Supply Chain",
    template: "%s | Symprotek Corporation",
  },
  description,
  applicationName: companyInfo.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: companyInfo.name,
    locale: "en_US",
    url: siteUrl,
    title: "Symprotek Corporation | PCB Assembly & Supply Chain",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Symprotek Corporation | PCB Assembly & Supply Chain",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Deliberately NOT setting maximumScale/userScalable: blocking pinch-zoom
  // is an accessibility failure, and the layout does not need it.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b2044" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd data={[organizationSchema(), localBusinessSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
