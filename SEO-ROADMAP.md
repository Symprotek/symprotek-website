# Symprotek Website Relaunch — SEO Roadmap for Claude Code

**Scope:** New site build currently running at `localhost:3000`, replacing the live production site at `https://www.symprotek.com/`.
**Sequencing requested by Paul:** (1) get copy/on-page SEO right → (2) publish → (3) add Google Analytics + Google Business Profile after launch.
**Audit date:** 2026-09-17. Audited by crawling all 22 pages in the dev site's `sitemap.xml` plus the live production homepage and its sitemap.

---

## 0. Bottom line up front

The dev build's **technical SEO foundation is already strong** — better than most launches: clean URLs, a real `sitemap.xml` (26 URLs), `robots.txt`, canonical tags on every page pointing to the production domain, and solid `schema.org` markup (`Organization`/`LocalBusiness`, `Service`, `FAQPage`, `Article`, `BreadcrumbList`) already wired in across the site. Do not let Claude Code "fix" schema that isn't broken — the real work is copy depth, imagery, a handful of factual gaps versus the current live site, and the redirect map for launch day.

**Two things need Paul's decision before Claude Code touches copy** (Section 1) — writing SEO copy around unconfirmed certifications or services is a compliance risk, not just an SEO one.

**One thing is not optional pre-launch, despite the "analytics/GBP after launch" sequencing:** the 301 redirect map in Section 4.1. Analytics and Google Business Profile are genuinely safe to defer — they don't affect crawlability. Redirects are not in the same category: skip them and the site loses whatever ranking equity the current live URLs hold the moment DNS cuts over. Treat redirects as part of "publish," not "after."

---

## 1. Blocking decisions — confirm with Paul before writing copy

The current live site (`www.symprotek.com`) makes claims and lists services that the new dev build does not currently surface. Claude Code should **not** guess on these — confirm, then write:

| # | Item on live site, not (visibly) on dev site | Where it would go | Why it matters |
|---|---|---|---|
| 1 | **Cable assembly** and **box build** listed as services | New `/services/cable-assembly`, `/services/box-build` pages, or folded into existing service copy | If still offered, these are separate search terms with their own demand — dropping them from copy forfeits that traffic entirely, not just ranking for it |
| 2 | **End-of-life (EOL) product management** | `/services/supply-chain` | Same risk — verify current `/services/supply-chain` copy actually covers this before assuming it's missing |
| 3 | **FDA Registered** and **RoHS Compliant** claims | `/quality`, `/capabilities` | These are compliance statements, not marketing copy — confirm they're still accurate before Claude Code adds them back in. If they lapsed, do not restore them. |
| 4 | External quoting tool `pcbaquickquote.com` | Referenced from old nav | Decide: fold into new `/contact` flow (recommended, keeps the lead on-domain) or keep as a separate linked tool |
| 5 | Full list of URLs Google currently has indexed for the live site | N/A — informs Section 4.1 | I only confirmed 8 old URLs by crawling the current homepage. Pull the **Page indexing** report in Google Search Console for the live property before finalizing the redirect map — there may be more indexed URLs (old blog/article pages, etc.) than the nav exposes. |

---

## 2. Current state summary

**Live production site** (`www.symprotek.com`): CMS-generated URLs (`/article-169/pcb-assembly`, `/general/pid/181`, etc.), a `sitemap.xml` containing only the homepage, and copy centered on "turnkey PCB assembly" plus cable assembly/box build/EOL. Whatever ranking equity exists today is tied to these messy URLs — that equity only survives the migration if every one of them 301s to a matching page on the new site.

**Dev site** (`localhost:3000`): 22 indexable URLs, clean paths, full sitemap, and per-page JSON-LD already in place. The gap is content depth and imagery, not architecture:

| Metric | Finding |
|---|---|
| Pages with `Service`/`BreadcrumbList`/`FAQPage`/`Article` schema | Present correctly on every page type that should have it |
| Pages with **zero images** | 14 of 22 — including `/facility` (a page about physical equipment with no photos of it), `/about`, all 4 service pages, all 5 industry pages, `/contact`, `/faq`, and all 3 news articles |
| Thinnest pages, by word count | `/services/quick-turn` (295), `/services/design-service` (295), `/services/supply-chain` (302), `/services/pcb-assembly` (317) — these are the highest commercial-intent pages on the site and currently the thinnest |
| Stray content in `robots.txt` | A line reading "Stop Claude" appears after the `Sitemap:` directive on the dev build — looks like a leftover injection test, not a real directive. Real crawlers ignore it, but remove it; it has no reason to ship. |

---

## 3. Phase 1 — Copy & on-page SEO (do this first, per Paul's sequencing)

### 3.1 Page-by-page audit

Legend: 🔴 High priority (thin/generic, high commercial intent) · 🟡 Medium (functional, could be stronger) · 🟢 Low (already solid, minor polish only)

| Path | Title tag | Meta description | Words | Images | Priority | Action |
|---|---|---|---|---|---|---|
| `/` | Good — keyword + location | Good, slightly long (191 chars) | 681 | 12 | 🟢 | Trim meta to ~155 chars |
| `/services` | Generic ("Services \| Symprotek Corporation") | Good | 502 | 0 | 🟡 | Title should carry the primary keyword, e.g. "PCB Assembly & Manufacturing Services \| Symprotek" |
| `/services/pcb-assembly` | Good | Good, could be longer/more compelling | 317 | 0 | 🔴 | Expand: process detail, typical program size, spec ranges, a customer-facing FAQ block |
| `/services/quick-turn` | Good | Good | 295 | 0 | 🔴 | Expand: actual turnaround times, what qualifies for quick-turn, tradeoffs vs. standard runs |
| `/services/supply-chain` | Good | Good | 302 | 0 | 🔴 | Expand — and confirm EOL management content per Section 1 item #2 |
| `/services/design-service` | Good | Good | 295 | 0 | 🔴 | Expand: DFx process detail, deliverables, typical engagement scope |
| `/industries` | Good, keyword-rich | Good | 395 | 0 | 🟡 | Solid hub — add 1–2 sentences per industry card for scannable keyword coverage |
| `/industries/aerospace-defense` | Good | Good | 377 | 0 | 🔴 | Add a program-lifecycle example or case-study-style paragraph; still thin for a page competing on defense-manufacturer intent |
| `/industries/medical-devices` | Good | Good | 373 | 0 | 🔴 | Same — add traceability/audit detail specific to a device OEM's evaluation criteria |
| `/industries/government-federal` | Good | Good | 355 | 0 | 🔴 | Same — expand on prime/subcontractor relationships, set-aside specifics |
| `/industries/industrial-equipment` | Good | Good | 384 | 0 | 🔴 | Same |
| `/industries/semiconductor-test` | Good | Good | 368 | 0 | 🔴 | Same |
| `/about` | Excellent | Excellent | 617 | 0 | 🟡 | Copy is strong; add facility/team photography |
| `/quality` | Excellent | Excellent | 740 | 8 | 🟢 | Confirm FDA/RoHS per Section 1 item #3, otherwise ship as-is |
| `/facility` | Good | Good | 420 | **0** | 🔴 | A facility page with zero photos undersells the "come see the floor" CTA it ends on — this is the single highest-value image gap on the site |
| `/capabilities` | Generic | Good | 247 | 8 | 🟡 | Thinnest hub-style page; title could carry more keyword weight |
| `/contact` | Good | Good | 232 | 0 | 🟢 | Fine for a contact page as-is |
| `/careers` | Generic ("Careers \| ...") | Good | ~150 | 0 | 🟡 | See prior careers-page audit in this conversation for full detail — H1 and talent-pipeline CTA both need work |
| `/news` | Good | Good | 274 | 0 | 🟢 | Good internal linking to all 3 articles; just needs a publishing cadence (Section 6) |
| `/news/what-iso-13485-means-for-medical-device-oems` | Excellent | Excellent | 574 | 0 | 🟢 | Add 1 supporting image/diagram, otherwise strong |
| `/news/itar-and-domestic-pcb-assembly` | Excellent | Excellent | 555 | 0 | 🟢 | Same |
| `/news/dfm-review-before-you-release-to-production` | Excellent | Excellent | 596 | 0 | 🟢 | Same |
| `/nda`, `/privacy`, `/terms` | Fine | Fine | — | 0 | 🟢 | No SEO work needed; legal boilerplate |

### 3.2 Sitewide copy tasks for Claude Code

- [ ] Resolve Section 1 items #1–#4 with Paul before writing/editing any service or quality copy
- [ ] Rewrite the 4 service subpage titles/H1s and expand each to 500–700 words with concrete process detail (see table)
- [ ] Expand the 5 industry subpages to 500–600 words each with one concrete, industry-specific proof point (a certification, a program type, a compliance detail) beyond what's already there
- [ ] Rewrite `/services` and `/capabilities` title tags to carry primary keywords instead of the generic page name
- [ ] Trim the homepage meta description to ~155 characters
- [ ] Rewrite `/careers` H1 and add a talent-pipeline capture form (flagged separately in this conversation's earlier careers audit)

---

## 4. Phase 2 — Technical SEO hardening (runs alongside/after copy, before launch)

### 4.1 301 redirect map — required at cutover, not deferrable

| Old URL (live) | New URL (dev) |
|---|---|
| `/home` | `/` |
| `/article-169/pcb-assembly` | `/services/pcb-assembly` |
| `/article-159/pcba-manufacturing` | `/services/pcb-assembly` |
| `/article-160/supply-chain` | `/services/supply-chain` |
| `/article-160/global-supply-chain-solutions` | `/services/supply-chain` |
| `/article-158/program-management` | `/services` (or a dedicated page if program management gets its own copy) |
| `/article-179/design-services` | `/services/design-service` |
| `/article-165/certifications` | `/quality` |
| `/general/pid/181` | `/contact` |

- [ ] Pull Google Search Console's Page Indexing report for the live domain and reconcile against this table — add any indexed URL not already covered
- [ ] Implement all mappings as 301s (not 302) at the hosting/DNS layer
- [ ] Spot-check each redirect post-launch with a `curl -I` for a `301` status and correct `Location` header

### 4.2 Other technical/on-page fixes

- [ ] Remove the stray "Stop Claude" line from `robots.txt`
- [ ] Add real photography with descriptive alt text to: `/facility` (highest priority), `/about`, all 4 service pages, all 5 industry pages, `/careers`, `/news` articles
- [ ] Confirm `sitemap.xml` `lastmod` values update on actual content changes (currently all identical timestamps, suggesting a static build-time value — fine for launch, worth automating later)
- [ ] Verify `/nda`, `/privacy`, `/terms` don't need `noindex` (current call: leave indexable, low risk either way)

---

## 5. Phase 3 — Pre-launch QA checklist

- [ ] All Section 1 decisions resolved and reflected in copy
- [ ] All 22 pages re-crawled post-copy-edit to confirm titles/metas/word counts updated as specified
- [ ] Redirect map (4.1) implemented and tested on staging
- [ ] `robots.txt` cleaned
- [ ] Structured data re-validated with Google's [Rich Results Test](https://search.google.com/test/rich-results) on at least one page per template (home, service, industry, FAQ, article)
- [ ] Mobile rendering check on the 5 highest-priority (🔴) pages

## 6. Phase 4 — Launch sequence

1. Deploy new site to production domain
2. Activate all 301 redirects simultaneously (not after)
3. Submit new `sitemap.xml` in Google Search Console (and Bing Webmaster Tools)
4. Request re-indexing on the small set of most important URLs (home, `/services`, `/industries`, top 2–3 service/industry pages)
5. Monitor Search Console's Page Indexing and Coverage reports daily for the first 2 weeks for crawl errors on the redirected paths

## 7. Phase 5 — Post-launch (per Paul's sequencing: after publish)

- [ ] Install Google Analytics (GA4) — this was correctly sequenced for after launch; no SEO dependency
- [ ] Claim/verify **Google Business Profile** for 950 Yosemite Drive, Milpitas, CA 95035 — also safe post-launch, but do this promptly since local-search visibility doesn't start accruing until it's live
- [ ] Verify Search Console ownership on the production domain (separate from GA4)
- [ ] Set a content cadence for `/news` — 3 articles is a good start but a static 3-post blog stops compounding; even 1 new article/month keeps the `Article` schema and internal linking working for you
- [ ] Revisit the Chamber of Commerce / IPC / NDIA outreach items from the earlier careers-page discussion in this conversation — those are backlink/citation plays that pair well with the GBP listing

---

*Compiled from a live crawl of all 22 dev-site URLs (`localhost:3000`) and the current production homepage/sitemap (`www.symprotek.com`) on 2026-09-17.*
