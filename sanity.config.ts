import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "amble",
  title: "Amble CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
                  .title("Home Page"),
              ),
            S.listItem()
              .title("Pages")
              .schemaType("page")
              .child(S.documentTypeList("page").title("Pages")),
            S.listItem()
              .title("Assets")
              .child(
                S.list()
                  .title("Assets")
                  .items([
                    S.listItem()
                      .title("Images")
                      .schemaType("sanity.imageAsset")
                      .child(
                        S.documentTypeList("sanity.imageAsset").title("Images"),
                      ),
                    S.listItem()
                      .title("Files")
                      .schemaType("sanity.fileAsset")
                      .child(
                        S.documentTypeList("sanity.fileAsset").title("Files"),
                      ),
                  ]),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["homePage", "page"].includes(item.getId() || ""),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
