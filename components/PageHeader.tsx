import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * The dark banner + h1 block used at the top of every interior page.
 * Replaces the copy-pasted version that was duplicated across services,
 * capabilities, and contact.
 */
export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="bg-brand-dark py-10 sm:py-14 text-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
