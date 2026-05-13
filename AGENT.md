# CMS_SANITY Agent Guide

## Project Goal

Build a research and development website that helps Jeremie understand, learn, and apply new skills while using Sanity CMS inside a real project.

The site should become both:

- a learning lab for testing modern web tools and workflows
- a practical example of how to connect content, data, analytics, and deployment

## Main Stack

- React and Next.js: https://nextjs.org
- Vercel hosting: https://vercel.com
- GitHub repository: https://github.com
- Sanity CMS: https://www.sanity.io
- Airtable or Google Sheets for structured external data:
  - https://airtable.com
  - https://sheets.google.com
- Google Analytics 4: https://analytics.google.com

## Repository Location

Root folder:

```txt
/Users/jeremiek/Sites/CMS_SANITY
```

## Product Direction

The first version should focus on learning by doing. The website should explain and demonstrate:

- what Sanity CMS is
- how content models are created
- how Sanity content is fetched in Next.js
- how pages are generated from CMS content
- how deployment works with Vercel
- how GitHub supports version control and collaboration
- how Airtable or Google Sheets can be used for extra structured data
- how GA4 tracks user behavior

## Suggested Site Sections

- Home: clear overview of the research and development project
- Learning Notes: articles, lessons, experiments, and reflections
- Sanity Lab: content models, schemas, and examples
- Project Journal: progress updates and decisions
- Resources: links, tools, references, and tutorials
- Data Experiments: Airtable or Google Sheets integration tests
- Analytics Notes: GA4 setup and observations

## Development Principles

- Keep the project practical and beginner-friendly.
- Prefer simple working examples before complex architecture.
- Document every important decision in plain language.
- Build features in small steps that can be tested locally.
- Use Sanity as the primary content source.
- Keep external data integrations isolated and easy to replace.
- Avoid unnecessary abstractions until the project needs them.

## Implementation Preferences

- Use Next.js App Router unless there is a strong reason not to.
- Use TypeScript for application code.
- Use Sanity Studio for content editing.
- Keep schemas organized and readable.
- Store secrets in environment variables, never in source files.
- Deploy through Vercel once the first working version is ready.
- Track setup steps in project documentation as they are completed.

## Content Model Ideas

Start with a small Sanity schema set:

- `post`: learning notes and articles
- `projectUpdate`: progress journal entries
- `resource`: useful links and references
- `experiment`: technical tests and outcomes
- `skill`: skills being learned and practiced

## First Milestones

1. Create the Next.js project structure.
2. Add Sanity and create the first schemas.
3. Build a homepage that explains the project.
4. Render Sanity content in a learning notes section.
5. Add basic styling and navigation.
6. Push the repository to GitHub.
7. Deploy the site to Vercel.
8. Add GA4 tracking.
9. Test Airtable or Google Sheets integration.

## Working Notes for Future Agents

- Read this file before making project changes.
- Preserve the goal of the site as a learning and research workspace.
- Explain setup choices clearly so Jeremie can learn from the project.
- When adding a new tool, include a short note about why it exists and how it is used.
- Keep code and content approachable; this project is meant to teach as much as it ships.
