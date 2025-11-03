// app/[locale]/layout.tsx (作为子布局)

import { NextIntlClientProvider } from "next-intl"; // 保持 Provider 以备将来客户端组件使用
import { setRequestLocale, getMessages } from "next-intl/server";
import { routing } from "../../i18n/routing"; // 确认路径
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import "../globals.css"; // 把全局样式放在这里

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 元数据可以保留在这里，Next.js 会正确地合并它们
export const metadata = { title: "Pixdock Web" };

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // ✅ 保持你完美的 params 处理方式
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // 为了给未来的客户端组件提供上下文，我们在这里获取 messages
  const messages = await getMessages();

  // 这里不再渲染 <html> 或 <body>
  // 而是返回一个 Fragment (<>) 或一个简单的 <div>，
  // 并将字体 className 应用在这里。
  return (
    <div className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
