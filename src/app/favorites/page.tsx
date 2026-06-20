import type { Metadata } from "next";
import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { mockPrompts } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "我的收藏",
  description: "查看保存在当前浏览器中的 PromptHub 提示词收藏。",
  robots: { index: false, follow: false }
};

export default function FavoritesPage() {
  return <FavoritesPageClient prompts={mockPrompts} />;
}
