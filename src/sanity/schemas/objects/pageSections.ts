import { defineArrayMember, defineField } from "sanity";

export const heroSection = defineArrayMember({
  name: "heroSection",
  title: "Hero image/video section",
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
      rows: 3,
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      description: "Optional MP4 URL. If empty, the hero uses the image instead.",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Hero image",
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
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Hero image/video section",
        subtitle: "Hero image/video section",
        media,
      };
    },
  },
});

export const twoColumnSection = defineArrayMember({
  name: "twoColumnSection",
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
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Two-column section",
        subtitle: "Two-column section",
        media,
      };
    },
  },
});

export const textSection = defineArrayMember({
  name: "textSection",
  title: "Editorial text section",
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
      rows: 8,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "kicker",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Editorial text section",
        subtitle: subtitle || "Text section",
      };
    },
  },
});

export const pageSectionMembers = [
  heroSection,
  twoColumnSection,
  textSection,
];
