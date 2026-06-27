import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const metadataTitle = "PromptHub - AI 提示词、工作流与系统学习平台";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: metadataTitle,
    template: "%s | PromptHub",
  },
  description: siteDescription,
  keywords: [
    "PromptHub",
    "AI 工作流",
    "AI Workflow",
    "Workflow Pack",
    "Prompt Pack",
    "中文提示词",
    "结构化 Prompt",
    "AI 生产力",
    "AI 系统学习",
    "Prompt 教程",
    "Prompt Anatomy",
    "小红书工作流",
    "跨境电商工作流",
    "产品调研工作流",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    title: metadataTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
