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

## Current Design Direction

The first version has:

- a fixed header menu
- a full-screen video cover
- centered hero text
- full-height two-column sections
- image and text layouts that can later be powered by Sanity
- a full-width image section with small text blocks in opposite corners
