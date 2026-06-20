import type { Metadata } from "next";
import { PlatformPromptPage } from "@/components/PlatformPromptPage";
import { getPromptsByPlatform } from "@/lib/mock-prompts";

const description = "精选 Midjourney 提示词，覆盖商业摄影、品牌视觉、人物写真、海报和创意设计场景。";

export const metadata: Metadata = {
  title: "Midjourney提示词大全",
  description,
  keywords: ["Midjourney提示词大全", "Midjourney Prompt", "AI绘画提示词", "商业摄影提示词", "海报设计提示词"],
  alternates: { canonical: "/midjourney" },
  openGraph: {
    title: "Midjourney提示词大全",
    description,
    url: "/midjourney",
    type: "website"
  }
};

export default function MidjourneyPage() {
  return (
    <PlatformPromptPage
      description="探索适用于商业摄影、品牌视觉和创意设计的精选提示词，让画面构图、光线与风格表达更准确。"
      eyebrow="AI 绘画提示词"
      prompts={getPromptsByPlatform("midjourney")}
      title="Midjourney 提示词"
    />
  );
}
