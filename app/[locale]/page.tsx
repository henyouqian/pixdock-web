// app/[locale]/page.tsx

import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "../../sanity/client"; // ⚠️ 确认路径！
import { routing } from "../../i18n/routing"; // ⚠️ 确认路径！
import { Inknut_Antiqua, Montserrat } from "next/font/google";
import HeroCarousel from "../../components/HeroCarousel";

const inknutAntiqua = Inknut_Antiqua({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inknut-antiqua",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

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

  // 3. 获取 Sanity 内容（如果配置了环境变量）
  let data: HomepageData | null = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const query = `*[_type == "homepage"][0] {
      "title": title[_key == "${locale}"][0].value,
      "description": description[_key == "${locale}"][0].value,
      "showBanner": showBanner
    }`;
      data = await client.fetch(query);
    } catch (error) {
      console.error("Failed to fetch from Sanity:", error);
    }
  }

  const newsItems = [
    {
      title: "Case Study: Healthcare SaaS Triples Qualified Leads",
      description:
        "Discover how a data-driven content strategy and multi-channel nurture sequence increased lead quality by 212% for a growing medical software provider.",
    },
    {
      title: "Trend Report: AI Continues to Reshape B2B Buyer Journeys",
      description:
        "From predictive personalization to smart contract automation, artificial intelligence is accelerating decision cycles and redefining expectations across industries.",
    },
    {
      title: "Event Recap: Sustainability Marketing Summit 2024",
      description:
        "Key takeaways include transparent impact reporting, circular design messaging, and the rising demand for verifiable eco-credentials in digital campaigns.",
    },
  ];

  const solutions = [
    {
      title: "Growth Strategy Sprint",
      description:
        "A four-week deep dive that maps audience behaviors, competitive gaps, and channel priorities to deliver an actionable 12-month roadmap.",
    },
    {
      title: "Content Engine Development",
      description:
        "End-to-end content planning, production, and distribution to keep your brand voice consistent and your pipeline full.",
    },
    {
      title: "Lifecycle Email Automation",
      description:
        "Segmentation, copywriting, and workflow design that nurture prospects from first touch to repeat purchase—fully automated.",
    },
    {
      title: "Performance Analytics & Optimization",
      description:
        "Ongoing analysis of campaign data with iterative testing to maximize ROI and reveal new opportunities for growth.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 min-h-[600px] flex items-center">
        {/* 背景轮播图片 */}
        <HeroCarousel />
        {/* 内容 */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`text-center ${inknutAntiqua.variable} ${montserrat.variable}`}
          >
            <h1
              className={`text-4xl md:text-6xl font-normal text-white mb-6 ${inknutAntiqua.className} tracking-tight`}
            >
              {t("heroTitle")}
            </h1>
            <p
              className={`text-lg md:text-xl text-white max-w-3xl mx-auto font-light ${montserrat.className} leading-relaxed`}
            >
              {t("heroDescription")}
            </p>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <article
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Company Description Section */}
      <section id="story" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We are a marketing consultancy built for brands ready to scale
            without compromising authenticity. Blending behavioral research with
            high-impact storytelling, we craft campaigns that resonate, engage,
            and convert—no guesswork, just measurable growth.
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Solutions Designed for Sustainable Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-8 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Keep In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Ready to elevate your marketing? Reach out for a complimentary
              consultation and discover how our tailored approach can accelerate
              your goals.
            </p>
          </div>
          <form className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Expertise
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our team consists of seasoned strategists, creatives, and analysts
            who have led high-stakes campaigns across tech, healthcare, and
            professional services. Unified by a passion for evidence-based
            marketing, we translate complex data into clear actions that drive
            lasting results.
          </p>
        </div>
      </section>
    </div>
  );
}
