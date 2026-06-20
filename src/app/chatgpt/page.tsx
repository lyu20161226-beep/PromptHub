import type { Metadata } from "next";
import { PlatformPromptPage } from "@/components/PlatformPromptPage";
import { getPromptsByPlatform } from "@/lib/mock-prompts";

const description = "精选 ChatGPT 提示词，覆盖内容创作、商业分析、用户研究、职场效率和教育场景。";

export const metadata: Metadata = {
  title: "ChatGPT提示词大全",
  description,
  keywords: ["ChatGPT提示词大全", "ChatGPT Prompt", "AI写作提示词", "商业分析提示词", "小红书提示词"],
  alternates: { canonical: "/chatgpt" },
  openGraph: {
    title: "ChatGPT提示词大全",
    description,
    url: "/chatgpt",
    type: "website"
  }
};

export default function ChatGPTPage() {
  return (
    <PlatformPromptPage
      description="覆盖内容创作、商业分析、用户研究与工作效率场景，用结构清晰的提示词获得更可靠的回答。"
      eyebrow="AI 文本提示词"
      prompts={getPromptsByPlatform("chatgpt")}
      title="ChatGPT 提示词"
    />
  );
}
