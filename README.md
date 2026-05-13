# CMS_SANITY

A research and development website for learning how to apply Sanity CMS inside a real Next.js project.

## Stack

- Next.js and React
- TypeScript
- Tailwind CSS
- Vercel hosting
- Sanity CMS
- GitHub
- Airtable or Google Sheets
- Google Analytics 4

## Local Development

```bash
npm run dev
```

Then open http://localhost:3000.

## CMS Access

Sanity Studio is embedded in this Next.js app.

### Connect locally

1. Start the Next.js development server:

```bash
npm run dev
```

2. Open the Studio route in your browser:

http://localhost:3000/studio

3. Log in with a Sanity account that has access to the `amble` project.

The Studio uses:

- project name: `amble`
- studio title: `Amble CMS`
- project ID: `1ox7u1sj`
- dataset: `production`

If Sanity asks you to choose a login method, use the same Google, GitHub, or email account that was invited to the Sanity project.

### If access is denied

Ask a project owner to invite your Sanity account from the Sanity project settings. You need at least editor access to create or update content.

## CMS Model

The project now supports two levels of content:

- `Home Page`: singleton used for the landing page
- `Page`: reusable CMS-driven pages with a slug and modular sections
- `Learning Note`: journal entries rendered at `/journal` and `/journal/[slug]`
- `Project Update` and `Resource`: existing document types ready for future front-end pages

### How to try the real CMS flow

1. Open `/studio`
2. Edit `Home Page` to control the landing page
3. Create a new `Page`
4. Set a slug such as `about` or `services`
5. Add one or more sections in the `sections` field
6. Publish
7. Open `/<slug>` on the site

### Current section types

- `Hero image/video section`
- `Two-column section`
- `Editorial text section`

## Current Design Direction

The first version has:

- a fixed header menu
- a full-screen video cover
- centered hero text
- full-height two-column sections
- image and text layouts that can later be powered by Sanity
- a full-width image section with small text blocks in opposite corners
