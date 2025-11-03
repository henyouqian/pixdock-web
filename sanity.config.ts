"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    internationalizedArray({
      // ✅ 必填项：定义你支持的所有语言
      // 这里的 id 应该和你的 i18n/routing.ts 里的 locales 保持一致
      languages: [
        { id: "en", title: "English" },
        { id: "fr", title: "French" },
        { id: "zh", title: "Chinese" },
        { id: "ar", title: "Arabic" },
      ],

      // ✅ 必填项：定义默认语言
      defaultLanguages: ["en"],

      // 可选项：是否允许一个字段在某些语言中为空
      fieldTypes: [
        "string",
        "text",
        "slug",
        // 如果你希望插件自动处理所有这些类型的字段，可以把它们都列在这里。
        // 但我更推荐使用插件提供的特定类型，比如 'internationalizedArrayString'，这样更明确。
      ],
    }),
  ],
});
