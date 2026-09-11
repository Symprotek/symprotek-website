import ContentCard from "@/components/ContentCard";
import type { ContentEntry } from "@/lib/data";

interface ContentGridProps {
  entries: ContentEntry[];
  /** Route prefix for each card, e.g. "/services" or "/industries". */
  basePath: string;
  heading?: string;
  description?: string;
  className?: string;
}

/**
 * Hub grid shared by /services and /industries. Heading and description are
 * optional so a page can supply its own intro section instead — that's how
 * /services avoids duplicating the home page's copy verbatim.
 */
export default function ContentGrid({
  entries,
  basePath,
  heading,
  description,
  className = "bg-brand-light py-12 sm:py-16 lg:py-20",
}: ContentGridProps) {
  return (
    <section className={className}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || description) && (
          <div className="mx-auto max-w-2xl text-center">
            {heading && (
              <h2 className="text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-base leading-relaxed text-brand-gray">
                {description}
              </p>
            )}
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ${
            heading || description ? "mt-8 sm:mt-12" : ""
          }`}
        >
          {entries.map((entry) => (
            <ContentCard
              key={entry.slug}
              href={`${basePath}/${entry.slug}`}
              title={entry.title}
              icon={entry.icon}
              bullets={entry.bullets}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
