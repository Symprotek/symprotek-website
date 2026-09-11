"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Printer,
  X,
} from "lucide-react";
import { companyInfo, navLinks } from "@/lib/data";

const telHref = `tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`;


export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenMobileSection(null);
  }, [pathname]);

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!openDropdown) return;

    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isSectionActive = (link: (typeof navLinks)[number]) =>
    isActive(link.href) ||
    (link.children?.some((child) => isActive(child.href)) ?? false);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-brand-dark text-white sm:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-x-6 gap-y-1 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-red" />
            {companyInfo.address}
          </span>
          <a
            href={telHref}
            className="flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-brand-red" />
            {companyInfo.phone}
          </a>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Printer className="h-3.5 w-3.5 shrink-0 text-brand-red" />
            {companyInfo.fax}
          </span>
          <a
            href={`mailto:${companyInfo.email}`}
            className="flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-brand-red" />
            {companyInfo.email}
          </a>
        </div>
      </div>

      <div
        className={`bg-white/95 backdrop-blur transition-shadow duration-300 ${
          isScrolled ? "shadow-soft" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 flex-col leading-tight">
            <span className="text-2xl font-extrabold tracking-tight text-brand-dark">
              Sym<span className="text-brand-red">protek</span>
            </span>
            <span className="text-xs font-medium text-brand-gray">
              PCB Assembly &amp; Supply Chain
            </span>
          </Link>

          <nav
            ref={navRef}
            className="hidden items-center gap-7 lg:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => {
              if (!link.children) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={isActive(link.href)}
                    className="nav-link"
                  >
                    {link.label}
                  </Link>
                );
              }

              const isOpen = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(isOpen ? null : link.label)
                    }
                    data-active={isSectionActive(link)}
                    className="nav-link flex items-center gap-1"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="absolute left-0 top-full z-50 min-w-[15rem] pt-3">
                      <ul className="animate-fadeIn overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lift">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                isActive(child.href)
                                  ? "bg-brand-light font-semibold text-brand-red"
                                  : "text-brand-dark hover:bg-brand-light hover:text-brand-red"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            {/*
              Shown from sm upward, not just lg. Between 640px and 1023px the
              desktop nav is already collapsed to the hamburger, so gating the
              CTA on lg left the whole tablet range with no visible quote
              action at all — only a phone icon and a burger.
            */}
            <Link
              href="/contact"
              className="hidden min-h-[2.75rem] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-dark hover:shadow-lift sm:inline-flex lg:px-5"
            >
              Request a Quote
            </Link>

            {/* Carries the Contact link that used to sit inside the hamburger
                menu, where it duplicated the Request a Quote button directly
                below it. Note this is a page link, not a tel: link — the
                dialable number lives in the utility bar (sm and up) and the
                footer. */}
            <Link
              href="/contact"
              className="tap-target text-brand-dark transition-colors hover:bg-brand-light hover:text-brand-red lg:hidden"
              aria-label="Contact Symprotek"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="tap-target text-brand-dark transition-colors hover:bg-brand-light lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            id="mobile-nav"
            className="animate-slideDown max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-gray-100 bg-white px-4 pb-6 pt-2 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                if (!link.children) {
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex min-h-[2.75rem] items-center rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                          isActive(link.href)
                            ? "bg-brand-light text-brand-red"
                            : "text-brand-dark hover:bg-brand-light"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                }

                const isOpen = openMobileSection === link.label;
                return (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileSection(isOpen ? null : link.label)
                      }
                      aria-expanded={isOpen}
                      className={`flex min-h-[2.75rem] w-full items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                        isSectionActive(link)
                          ? "bg-brand-light text-brand-red"
                          : "text-brand-dark hover:bg-brand-light"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <ul className="mb-1 ml-3 border-l border-gray-200 pl-3">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`flex min-h-[2.75rem] items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                                isActive(child.href)
                                  ? "font-semibold text-brand-red"
                                  : "text-brand-gray hover:text-brand-red"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <Link href="/contact" className="btn-primary mt-4 w-full">
              Request a Quote
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
