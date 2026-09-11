# Symprotek Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Running locally

```bash
npm install
npm run dev          # or double-click start.bat
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server on :3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run og` | Regenerate `app/opengraph-image.png` (run after changing the tagline or certification list) |

## Environment variables

Copy `.env.example` to `.env.local` and fill it in. **The contact form cannot
send until `RESEND_API_KEY` is set** — it will show the user an error instead
of silently failing.

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | From <https://resend.com/api-keys> |
| `CONTACT_TO_EMAIL` | No | Defaults to `sales@symprotek.com` |
| `CONTACT_FROM_EMAIL` | No | Domain must be verified in Resend first |
| `NEXT_PUBLIC_SITE_URL` | Yes in prod | Drives canonical URLs, OG tags, and the sitemap |

## Where content lives

All copy is in TypeScript data files — there is no CMS.

| File | Contains |
| --- | --- |
| `lib/data.ts` | Services, industries, certifications, company NAP, navigation |
| `lib/faq.ts` | FAQ entries (these feed `FAQPage` structured data) |

Adding a service or industry to these files automatically updates the
page, the navigation, the footer, and `sitemap.xml`.

## Outstanding — content required before launch

Every item below is marked with a `TODO` comment at the relevant place in the
code. Nothing here is a code defect; each needs information only Symprotek has.

1. **Certification assets** — logo images (`/public/images/certifications/`),
   certificate PDFs (`/public/documents/certifications/`), registrar names.
   Wire them up via the `logo`, `certPdf`, and `registrar` fields in
   `lib/data.ts`. Badges fall back to text until then.
2. **Is Symprotek AS9100 certified?** It appears nowhere in the existing site.
   Competitors lead with AS9100D on aerospace work. If we hold it, add it.
3. **Facility photography** — `components/Hero.tsx`. The hotlinked Unsplash
   stock photos were removed; slides currently render a designed brand panel.
   Drop real photos into `/public/images/hero/` and set each slide's `image`.
4. **Verify the capability stats** — `app/capabilities/page.tsx`. The ±0.02mm,
   24"×24", and 98%+ on-time-delivery figures are unsourced. The OTD claim in
   particular is one a customer may hold us to.
5. **Equipment inventory** — `app/facility/page.tsx` lists process capabilities
   but no machines, line count, or square footage.
6. **Company history and leadership** — `app/about/page.tsx`.
7. **Open roles** — `openRoles` in `app/careers/page.tsx` is empty; the page
   shows a "no openings" state until it is populated.
8. **Mutual NDA PDF** — add to `/public/documents/` and set
   `NDA_DOCUMENT_PATH` in `app/nda/page.tsx`.
9. **Legal review** — `app/privacy/page.tsx` and `app/terms/page.tsx` carry
   visible "pending legal review" banners. Remove them once counsel approves.

## Known gaps (deliberate, not defects)

- **No analytics.** No GA4, GTM, or conversion tracking is installed, so
  there is currently no way to measure whether any page or the contact form
  is working. Roughly half a day of work to add.
- **No customer logos or testimonials** — no assets were available.
- **No instant-quote calculator.** The contact form is a single-step lead
  capture form by design.

## Responsive conventions

The site is mobile-first and audited at 375 / 768 / 1440px. Keep to these when
adding pages, or the layout will drift back:

- **Section padding**: `py-12 sm:py-16 lg:py-20` (or `py-12 sm:py-16` for
  secondary sections). Don't use a single un-prefixed `py-16`/`py-24` — that
  applies desktop spacing to a phone.
- **Tap targets**: anything tappable needs ≥44px of height. `.btn-primary`,
  `.btn-outline`, `.field`, and `.tap-target` (globals.css) all carry it.
  For a bare text link, add `inline-flex min-h-[2.75rem] items-center`.
- **Form fields**: use the `.field` class. It pins font-size to 16px below
  `sm`, which is what stops iOS Safari zooming the page when a field is
  focused. A 14px input will zoom and leave the user stranded.
- **Wide content** (tables, comparison grids): render a stacked-card variant
  below `lg` rather than relying on `overflow-x-auto`. A horizontally
  scrolling table on a phone hides content with no affordance — that is
  exactly what the services comparison used to do, showing 1 of 4 columns.
- **Images with varying aspect ratios** (the certification logos range from
  0.74 to 2.38): constrain both axes and let `object-contain` letterbox.
  Sizing on height alone makes equal grid cells look ragged.
- **Encoding**: source files must be saved as UTF-8. Em dashes, `©`, and `→`
  had previously been double-encoded and rendered as `â€"`, `Â©`, and `â†'`
  on the live page.

Re-check with any headless browser at 375px; the two things to watch are
`document.documentElement.scrollWidth > clientWidth` (horizontal overflow)
and element heights under 44px.

## Notes

- `next/og` `ImageResponse` is **not** used: the copy bundled with Next 14
  crashes on Node 22+. `app/opengraph-image.png` is generated instead by
  `npm run og`, and the favicon is a static `app/icon.svg`.
- The project is tracked in a local Git repository. Add the approved remote
  repository before publishing it to GitHub.
