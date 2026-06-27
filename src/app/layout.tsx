import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PromptHub - 精选 AI Workflow Packs",
    template: "%s | PromptHub"
  },
  description: siteDescription,
  keywords: [
    "PromptHub",
    "AI 工作流",
    "AI Workflow Pack",
    "Prompt Pack",
    "提示词包",
    "免费 Prompt",
    "中文提示词",
    "小红书 Prompt",
    "跨境电商 Prompt",
    "产品调研工作流"
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    title: "PromptHub - 精选 AI Workflow Packs",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptHub - 精选 AI Workflow Packs",
    description: siteDescription
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
