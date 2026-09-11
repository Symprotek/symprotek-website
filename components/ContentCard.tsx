import Link from "next/link";
import { CheckCircle2, type LucideIcon } from "lucide-react";

interface ContentCardProps {
  href: string;
  title: string;
  icon: LucideIcon;
  bullets: string[];
  ctaLabel?: string;
}

/**
 * Card used by both the services and industries grids. Previously
 * ServiceCard, which hard-coded a /services/[slug] href.
 */
export default function ContentCard({
  href,
  title,
  icon: Icon,
  bullets,
  ctaLabel = "Learn More",
}: ContentCardProps) {
  return (
    <div className="group flex flex-col rounded-xl bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-light text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-lg font-bold text-brand-red">{title}</h3>

      <ul className="mt-4 flex-1 space-y-2.5">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2 text-sm text-brand-gray"
          >
            <CheckCircle2
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
              aria-hidden="true"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <Link href={href} className="btn-primary mt-6 w-full">
        {ctaLabel}
        <span className="sr-only"> about {title}</span>
      </Link>
    </div>
  );
}
