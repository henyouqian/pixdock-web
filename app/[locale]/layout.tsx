// app/[locale]/layout.tsx (作为子布局)

import { NextIntlClientProvider } from "next-intl"; // 保持 Provider 以备将来客户端组件使用
import {
  setRequestLocale,
  getMessages,
  getTranslations,
} from "next-intl/server";
import { routing } from "../../i18n/routing"; // 确认路径
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "../../components/LanguageSwitcher";
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

  // 获取导航栏翻译
  const t = await getTranslations("Navigation");

  const navItems = [
    { label: t("aboutUs"), href: "#about" },
    { label: t("servicesAndSolutions"), href: "#services" },
    { label: t("portfolio"), href: "#portfolio" },
    { label: t("globalCollection"), href: "#global-collection" },
  ];

  return (
    <div className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link
                  href={`/${locale}`}
                  className="text-xl font-bold text-gray-900"
                >
                  {t("brandName")}
                </Link>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <LanguageSwitcher />
              </div>
              <div className="md:hidden flex items-center space-x-4">
                <LanguageSwitcher />
                <button className="text-gray-700">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* 主内容 */}
        <main className="pt-16">{children}</main>

        {/* 页脚 */}
        <footer className="bg-gray-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About Us</h3>
                <p className="text-gray-400 text-sm">
                  123 Demo Street
                  <br />
                  New York, NY 12345
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-gray-400 text-sm">
                  email@example.com
                  <br />
                  (555) 555-5555
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    X (Formerly Twitter)
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pinterest
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Subscribe to receive industry insights, practical tips, and
                  company updates—straight to your inbox.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              <p>
                &copy; {new Date().getFullYear()} PIXDOCK. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </NextIntlClientProvider>
    </div>
  );
}
