import { defineArrayMember, defineField, defineType } from "sanity";

import { pageSectionMembers } from "./objects/pageSections";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  initialValue: {
    heroKicker: "Research and development website",
    heroTitle: "Learn Sanity by building a real publishing system.",
    heroText:
      "A visual lab for Next.js, Sanity CMS, Vercel, GitHub, data sources, and analytics. Every section is made to become a lesson.",
    heroVideoUrl:
      "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4",
    introKicker: "Current focus",
    introTitle:
      "Create a website that feels editorial, full-screen, and flexible enough for CMS-driven stories.",
    sections: [
      {
        _type: "heroSection",
        _key: "hero",
        kicker: "Research and development website",
        title: "Learn Sanity by building a real publishing system.",
        body: "A visual lab for Next.js, Sanity CMS, Vercel, GitHub, data sources, and analytics. Every section is made to become a lesson.",
        videoUrl:
          "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4",
      },
      {
        _type: "twoColumnSection",
        _key: "current-focus",
        kicker: "Current focus",
        title:
          "Create a website that feels editorial, full-screen, and flexible enough for CMS-driven stories.",
        body: "Use this section as a focused bridge between the hero and the deeper content modules.",
        imageAlt: "Editorial planning table",
        reverse: false,
      },
      {
        _type: "twoColumnSection",
        _key: "sanity-cms",
        kicker: "01 / Sanity CMS",
        title: "A living content studio for every lesson we build.",
        body: "This space will document schemas, page experiments, and the small decisions that make a CMS project easier to understand. The goal is to learn the tool by publishing with it.",
        imageAlt: "Abstract architectural structure with clean geometric lines",
        reverse: false,
      },
      {
        _type: "twoColumnSection",
        _key: "development",
        kicker: "02 / Development",
        title: "From research notes to working Next.js pages.",
        body: "Each section can become a pattern for future work: a content type, a data source, an analytics event, or a deployable feature on Vercel.",
        imageAlt: "Modern workspace with computers and research materials",
        reverse: true,
      },
      {
        _type: "twoColumnSection",
        _key: "content-models",
        kicker: "03 / Content models",
        title: "Shape every page from reusable editorial blocks.",
        body: "Add, reorder, and refine sections directly from the CMS instead of hard-coding every new page idea.",
        imageAlt: "Editorial boards and visual planning materials",
        reverse: false,
      },
      {
        _type: "twoColumnSection",
        _key: "large-image-pattern",
        kicker: "04 / Big image pattern",
        title: "One image can take the full two-column space.",
        body: "Smaller text blocks can sit in opposite corners for observations, captions, project notes, or Sanity-powered annotations.",
        imageAlt: "Large editorial landscape image",
        reverse: true,
      },
      {
        _type: "twoColumnSection",
        _key: "publishing-flow",
        kicker: "05 / Publishing flow",
        title: "Move from draft to published pages with a clear content rhythm.",
        body: "Use the Studio as the place where ideas become structured content, ready for the front end to display.",
        imageAlt: "Desk with publishing notes and a laptop",
        reverse: true,
      },
      {
        _type: "twoColumnSection",
        _key: "visual-system",
        kicker: "06 / Visual system",
        title: "Large images create breathing room between dense content sections.",
        body: "Use this module for atmosphere, chapter breaks, campaign visuals, or full-width CMS-led storytelling.",
        imageAlt: "Full-width abstract editorial image",
        reverse: false,
      },
    ],
    splitSections: [
      {
        _key: "sanity-cms",
        kicker: "01 / Sanity CMS",
        title: "A living content studio for every lesson we build.",
        body: "This space will document schemas, page experiments, and the small decisions that make a CMS project easier to understand. The goal is to learn the tool by publishing with it.",
        imageAlt: "Abstract architectural structure with clean geometric lines",
        reverse: false,
      },
      {
        _key: "development",
        kicker: "02 / Development",
        title: "From research notes to working Next.js pages.",
        body: "Each section can become a pattern for future work: a content type, a data source, an analytics event, or a deployable feature on Vercel.",
        imageAlt: "Modern workspace with computers and research materials",
        reverse: true,
      },
    ],
    featureKicker: "Big image pattern",
    featureTitle: "One image can take the full two-column space.",
    featureText:
      "Smaller text blocks can sit in opposite corners for observations, captions, project notes, or Sanity-powered annotations.",
  },
  fields: [
    defineField({
      name: "heroKicker",
      title: "Hero small title",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "heroText",
      title: "Hero text",
      type: "text",
      rows: 3,
      hidden: true,
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero video URL",
      description: "Use an MP4 URL for the full-screen cover video.",
      type: "url",
      hidden: true,
    }),
    defineField({
      name: "heroPoster",
      title: "Hero poster image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: true,
    }),
    defineField({
      name: "introKicker",
      title: "Intro small title",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "introTitle",
      title: "Intro title",
      type: "text",
      rows: 3,
      hidden: true,
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      description:
        "Drag sections to reorder the page. Use one hero image/video section, then add as many two-column sections as needed.",
      type: "array",
      of: pageSectionMembers,
    }),
    defineField({
      name: "splitSections",
      title: "Two-column sections",
      description:
        "Legacy field. Prefer Page sections for new content modules.",
      type: "array",
      hidden: true,
      of: [
        defineArrayMember({
          name: "splitSection",
          title: "Two-column section",
          type: "object",
          fields: [
            defineField({
              name: "kicker",
              title: "Small title",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Text",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "imageAlt",
              title: "Image alt text",
              type: "string",
            }),
            defineField({
              name: "reverse",
              title: "Image on the right",
              type: "boolean",
              initialValue: false,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featureImage",
      title: "Large image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: true,
    }),
    defineField({
      name: "featureKicker",
      title: "Large image small title",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "featureTitle",
      title: "Large image title",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "featureText",
      title: "Large image corner text",
      type: "text",
      rows: 3,
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
