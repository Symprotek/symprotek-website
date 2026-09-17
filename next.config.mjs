/** @type {import('next').NextConfig} */
const nextConfig = {
  // All imagery is served from /public. The images.unsplash.com remote pattern
  // was removed along with the hotlinked stock photos in the hero — if a
  // remote image host is ever needed, add it back here explicitly.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Preserves the current live site's (www.symprotek.com) search ranking
  // equity at cutover — see SEO-ROADMAP.md Section 4.1, "301 redirect map —
  // required at cutover, not deferrable". Verified against the live site's
  // actual nav on 2026-09-17 (WebFetch), not just the roadmap's table.
  //
  // NOT yet covered here, both flagged in SEO-ROADMAP.md Section 1 item #5:
  //   - /article-178/value-proposition — found live, not in the roadmap's
  //     table; no obvious 1:1 page on this site to map it to.
  //   - Anything else Google Search Console's Page Indexing report turns up
  //     for the live domain that isn't reachable from its nav.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      {
        source: "/article-169/pcb-assembly",
        destination: "/services/pcb-assembly",
        permanent: true,
      },
      {
        source: "/article-159/pcba-manufacturing",
        destination: "/services/pcb-assembly",
        permanent: true,
      },
      {
        source: "/article-160/supply-chain",
        destination: "/services/supply-chain",
        permanent: true,
      },
      {
        source: "/article-160/global-supply-chain-solutions",
        destination: "/services/supply-chain",
        permanent: true,
      },
      // Roadmap's stated default target (its alternative was "a dedicated
      // page if program management gets its own copy" — flagged separately
      // as a question rather than guessed).
      {
        source: "/article-158/program-management",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/article-179/design-services",
        destination: "/services/design-service",
        permanent: true,
      },
      {
        source: "/article-165/certifications",
        destination: "/quality",
        permanent: true,
      },
      { source: "/general/pid/181", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
