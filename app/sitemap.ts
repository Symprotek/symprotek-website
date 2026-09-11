import type { MetadataRoute } from "next";
import { industries, services, siteUrl, staticRoutes } from "@/lib/data";

/**
 * Generated from the same data that drives the routes themselves, so adding a
 * service or industry updates the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const priorityFor = (route: string) => {
    if (route === "/") return 1;
    if (route === "/contact" || route === "/services") return 0.9;
    if (route === "/privacy" || route === "/terms") return 0.3;
    return 0.8;
  };

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route === "/" ? "" : route}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: priorityFor(route),
    })),
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industries.map((industry) => ({
      url: `${siteUrl}/industries/${industry.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
