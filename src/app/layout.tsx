import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PromptHub - AI提示词库",
    template: "%s | PromptHub"
  },
  description: siteDescription,
  keywords: [
    "PromptHub",
    "AI提示词库",
    "AI提示词",
    "Prompt提示词",
    "Midjourney提示词",
    "即梦提示词",
    "ChatGPT提示词",
    "AI绘画提示词",
    "AI视频提示词"
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    title: "PromptHub - AI提示词库",
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptHub - AI提示词库",
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
      </body>
    </html>
  );
}
