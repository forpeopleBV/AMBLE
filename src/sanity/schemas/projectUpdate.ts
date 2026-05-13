import { defineField, defineType } from "sanity";

export const projectUpdate = defineType({
  name: "projectUpdate",
  title: "Project Update",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["Research", "Design", "Development", "Testing", "Done"],
      },
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
