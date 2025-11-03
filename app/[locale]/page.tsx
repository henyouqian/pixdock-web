// app/[locale]/page.tsx

import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "../../sanity/client"; // ⚠️ 确认路径！
import { routing } from "../../i18n/routing"; // ⚠️ 确认路径！

// --- 静态路由生成 ---
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// --- 多语言元数据 ---
type MetadataProps = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("homepageTitle") };
}

// --- 页面组件 ---
type Props = {
  params: Promise<{ locale: string }>;
};
interface HomepageData {
  title?: string; // ✅ 现在类型就是 string
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  // 1. 启用静态渲染
  setRequestLocale(locale);

  // 2. 获取翻译 (getTranslations 或 useTranslations 都可以)
  const t = await getTranslations("Homepage");

  // 3. 获取 Sanity 内容
  const query = `*[_type == "homepage"][0] {
  "title": title[_key == "${locale}"][0].value,
  "description": description[_key == "${locale}"][0].value,
  "showBanner": showBanner
}`;
  const data: HomepageData | null = await client.fetch(query);

  // ✅ 现在可以直接使用，甚至不需要做任何检查
  const sanityTitle = data?.title || "Default Title";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{sanityTitle}</h1>
        <p className="mt-6 text-lg">{t("subtitle")}</p>
      </div>
    </main>
  );
}
