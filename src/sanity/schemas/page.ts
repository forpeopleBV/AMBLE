import { defineField, defineType } from "sanity";

import { pageSectionMembers } from "./objects/pageSections";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const slug = value?.current;

          if (!slug) {
            return true;
          }

          if (["studio", "journal"].includes(slug)) {
            return "This slug is reserved by the application.";
          }

          return true;
        }),
    }),
    defineField({
      name: "navigationTitle",
      title: "Navigation label",
      type: "string",
      description: "Optional shorter label used in the site header.",
    }),
    defineField({
      name: "showInNavigation",
      title: "Show in navigation",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "excerpt",
      title: "Page summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      description:
        "Build the page by adding reusable editorial sections. Drag to reorder.",
      type: "array",
      of: pageSectionMembers,
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title: title || "Untitled page",
        subtitle: slug ? `/${slug}` : "Missing slug",
      };
    },
  },
});
