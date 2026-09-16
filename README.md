# Symprotek Website

Marketing website for Symprotek Corporation, built with Next.js 14, TypeScript,
Tailwind CSS, and the App Router. Most pages are statically rendered; the only
server-side feature is the Resend-backed contact form.

## Quick start

Use Node.js 20 LTS and npm. From the project directory:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The site will render without email credentials,
but the contact form cannot deliver messages until Resend is configured.

If `npm run dev` fails with `node_modules/.bin/next: Permission denied`, remove
and reinstall dependencies instead of committing permission changes:

```bash
rm -rf node_modules
npm ci
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the local development server on port 3000 |
| `npm run build` | Create and validate the production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run Next.js ESLint checks |
| `npm run og` | Regenerate `app/opengraph-image.png` |
| `npm run certs` | Regenerate certification badge crops from the legacy image strips |

There is currently no automated test suite or `npm test` script. Before merging
a change, run at least `npm run lint` and `npm run build`, then check the affected
pages on desktop and mobile.

## Environment variables

Copy `.env.example` to `.env.local` for local development. In Netlify, add the
same production values under **Site configuration → Environment variables**.
Never commit `.env.local` or an API key.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | For contact delivery | Resend API key used by `/api/contact` |
| `CONTACT_TO_EMAIL` | No | Destination for enquiries; defaults to `sales@symprotek.com` |
| `CONTACT_FROM_EMAIL` | For production email | Verified sender, for example `Symprotek Website <noreply@symprotek.com>` |
| `NEXT_PUBLIC_SITE_URL` | In production | Canonical URL used by metadata, Open Graph, and the sitemap |

The production sender domain must be verified in Resend. Resend's
`onboarding@resend.dev` fallback is only useful for sandbox testing and can
deliver only to the Resend account owner's email.

## Current application behavior

### Contact / RFQ

The form in `components/ContactForm.tsx` posts multipart form data to
`app/api/contact/route.ts`. The API validates the submission, performs simple
honeypot and timing checks, and calls `lib/mail.ts` to:

1. send the enquiry and optional attachment to `CONTACT_TO_EMAIL`;
2. set the visitor's address as `Reply-To`; and
3. send the visitor an acknowledgement email.

On success, the visitor is redirected to `/thank-you`. If the internal email
fails, the site displays an error and does not claim the message was received.

The form currently advertises and validates a 10 MB attachment limit. Confirm
the effective request-body limit on the chosen Netlify plan before launch;
binary multipart requests may need a lower application limit or direct-to-file
storage. This should be tested with a file at the maximum allowed size.

The contact page displays quote hours of Monday–Friday, 6:30 AM–3:00 PM PT.
The rest of the site and LocalBusiness structured data use the confirmed general
hours of Monday–Friday, 9:00 AM–2:00 PM PT.

### Careers

The careers page currently lists no open roles and directs candidates to the
general contact page. There is no resume-specific form, email-provider chooser,
or separate recruiting email flow in `main`.

## Project structure

```text
app/                     Routes, metadata, sitemap, robots, and API route
  api/contact/route.ts   Contact-form endpoint
  services/[slug]/       Generated service pages
  industries/[slug]/     Generated industry pages
components/              Shared UI and the client-side contact form
lib/data.ts              Services, industries, certifications, navigation, NAP
lib/faq.ts               FAQ content and structured-data source
lib/validation.ts        Shared client/server form validation
lib/mail.ts              Resend integration and email templates
public/                   Images and downloadable certification documents
scripts/                  Open Graph and certification-image generators
```

There is no CMS, database, authentication layer, or admin dashboard. Most site
copy lives in `lib/data.ts`; page-specific copy lives in the corresponding
`app/**/page.tsx` file. Adding a service or industry entry updates its generated
page and the sitemap; navigation placement is controlled by the exported
navigation data.

## Deployment

The repository remote is `git@github.com:Laurenzrae/symprotek-website.git`.
Netlify should deploy the production site from `main` and create deploy previews
for pull requests.

Recommended release flow:

1. Create a branch and open a pull request.
2. Run lint and the production build.
3. Review the Netlify deploy preview on desktop and mobile.
4. Merge the approved pull request into `main`.
5. Smoke-test the production contact form and confirm both emails arrive.

Netlify is a replaceable delivery layer: it turns an accepted GitHub source
state into a running website. The durable pieces—source, business history,
standard Next.js code, configuration, and the review workflow—remain in GitHub
and under Symprotek's control.

No GA4, Google Tag Manager, or other analytics is installed. Analytics can be
added after launch without changing the hosting architecture.

## Recommended next changes

These items are not implemented in `main`:

- Replace the careers-page link to the general contact form with an **Email your
  resume** flow that offers Gmail, Outlook Web, and the user's default mail app.
  Candidates will still need to attach their resume manually because a website
  cannot pre-attach a local file to those email composers.
- Keep Resend and `/api/contact` for customer enquiries and RFQs; the careers
  email flow should not replace the customer contact form.
- Lower the advertised contact-form attachment limit after confirming
  Netlify's effective request-body limit, or move large uploads to direct file
  storage.
- Add analytics after launch if traffic and contact conversions need to be
  measured.

## Launch checklist requiring business confirmation

These are content or operational decisions, not necessarily software defects:

- Verify all public capability figures, especially `±0.02 mm`, `24\" × 24\"`,
  `98%+` on-time delivery, `500+` customers, and `1M+` annual assemblies.
- Remove or rewrite references to a global manufacturing network and overseas
  production if Symprotek does not want to disclose or market outsourcing.
- Confirm every certification and registration is current. The repository
  includes an ITAR document explicitly dated 2018–2019 and an expired-source
  image; historical evidence must not imply current registration.
- Confirm claims including FDA registration, SBA 8(a), MIL-SPEC capability,
  ISO 9001, ISO 13485, and “Assembled in the USA.”
- Confirm the founding year, address, phone, fax, and the
  `sales@symprotek.com` destination.
- Supply approved facility photography, equipment details, company history,
  leadership copy, and any publishable customer examples.
- Supply the current mutual NDA PDF and set `NDA_DOCUMENT_PATH` in
  `app/nda/page.tsx`.
- Obtain legal approval for `/privacy` and `/terms`, then remove their visible
  “Draft — pending legal review” notices.
- Decide whether to implement the careers email-provider chooser and provide
  the final recruiting destination email address.
- Configure and test Resend in Netlify, including sender-domain verification,
  replies, acknowledgements, spam placement, and maximum-size attachments.

Search `TODO` across `app/`, `components/`, and `lib/` before launch; comments
mark the exact code locations for most outstanding content.

## Responsive conventions

The site is mobile-first. Check at 375, 768, and 1440 px after visual changes.

- Use responsive section spacing such as `py-12 sm:py-16 lg:py-20`.
- Keep interactive targets at least 44 px high. Shared button, field, and
  `.tap-target` styles already enforce this in common cases.
- Use the `.field` class for form controls; its 16 px mobile font prevents iOS
  Safari from zooming when an input receives focus.
- Prefer stacked mobile cards over horizontally scrolling comparison tables.
- Constrain both dimensions of mixed-aspect-ratio logos and use
  `object-contain`.
- Save source files as UTF-8 so punctuation such as em dashes and arrows does
  not become corrupted.

For mobile QA, check for horizontal overflow and interactive elements below
44 px, then submit the contact form from a real phone at least once.

## Asset notes

- `app/opengraph-image.png` is generated by `npm run og`; the project does not
  use `next/og` `ImageResponse` because of the current Node compatibility issue
  documented in the generator setup.
- `app/icon.svg` is the favicon.
- Certification badges were cropped from legacy site artwork and should be
  replaced with approved high-resolution or vector assets when available.
- Certification PDFs are public downloads under
  `public/documents/certifications/`; review their dates before publishing.
