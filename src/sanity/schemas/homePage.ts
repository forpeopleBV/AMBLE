import { defineArrayMember, defineField, defineType } from "sanity";

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
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
    }),
    defineField({
      name: "heroText",
      title: "Hero text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero video URL",
      description: "Use an MP4 URL for the full-screen cover video.",
      type: "url",
    }),
    defineField({
      name: "heroPoster",
      title: "Hero poster image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "introKicker",
      title: "Intro small title",
      type: "string",
    }),
    defineField({
      name: "introTitle",
      title: "Intro title",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "splitSections",
      title: "Two-column sections",
      type: "array",
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
    }),
    defineField({
      name: "featureKicker",
      title: "Large image small title",
      type: "string",
    }),
    defineField({
      name: "featureTitle",
      title: "Large image title",
      type: "string",
    }),
    defineField({
      name: "featureText",
      title: "Large image corner text",
      type: "text",
      rows: 3,
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
