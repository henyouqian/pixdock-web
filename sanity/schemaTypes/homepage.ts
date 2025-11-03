// sanity/schemaTypes/homepage.ts

import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage", // API 中使用的唯一标识，必须是小写
  title: "Homepage", // 在 Studio 后台界面中显示的名称
  type: "document", // 这定义了它是一个独立的文档类型
  fields: [
    // 这里是该文档包含的所有字段
    defineField({
      name: "title", // 字段的 API 标识
      title: "Main Title", // 字段在 Studio 后台的显示名称
      type: "internationalizedArrayString",
      description: "This is the main headline for the homepage.", // 一个帮助性的描述
      // validation: (Rule) => Rule.required().min(10).max(80), // 添加一些验证规则
    }),
    // --- 新增一个多语言的 "description" 字段 ---
    defineField({
      name: "description",
      title: "Homepage Description",

      // ✅ 关键改动 (2):
      // 对于长文本，我们使用 'internationalizedArrayText' 类型。
      type: "internationalizedArrayText",

      description:
        "A short paragraph to welcome visitors, in multiple languages.",
    }),

    // --- 新增一个不需要翻译的字段作为对比 ---
    defineField({
      name: "showBanner",
      title: "Show Promotional Banner?",

      // 这个字段只是一个简单的布尔值 (true/false)，它不需要翻译。
      // 所以我们保持它的类型为 'boolean'。
      type: "boolean",

      initialValue: false, // 设置一个默认值
    }),
  ],
  // (可选但推荐) 美化 Studio 界面
  preview: {
    select: {
      // 我们选择默认语言 (en) 的标题作为预览
      title: "title.0.value",
    },
  },
});
