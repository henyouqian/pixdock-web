// i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "zh", "ar"], // ✅ 把你的语言放这里
  defaultLocale: "en",
});
