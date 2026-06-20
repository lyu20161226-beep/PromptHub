import type { Metadata } from "next";
import { PlatformPromptPage } from "@/components/PlatformPromptPage";
import { getPromptsByPlatform } from "@/lib/mock-prompts";

const description = "精选即梦 AI 提示词，覆盖短视频、产品广告、东方美学、剧情短片和品牌内容场景。";

export const metadata: Metadata = {
  title: "即梦提示词大全",
  description,
  keywords: ["即梦提示词大全", "即梦AI提示词", "AI视频提示词", "短视频提示词", "产品广告提示词"],
  alternates: { canonical: "/jimeng" },
  openGraph: {
    title: "即梦提示词大全",
    description,
    url: "/jimeng",
    type: "website"
  }
};

export default function JimengPage() {
  return (
    <PlatformPromptPage
      description="为短视频、产品广告和东方美学场景准备的即梦提示词，包含清晰的镜头、光线、节奏与画幅描述。"
      eyebrow="AI 视频提示词"
      prompts={getPromptsByPlatform("jimeng")}
      title="即梦提示词"
    />
  );
}
