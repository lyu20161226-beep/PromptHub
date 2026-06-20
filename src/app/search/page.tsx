import type { Metadata } from "next";
import { SearchPageClient } from "@/components/SearchPageClient";
import { mockPrompts } from "@/lib/mock-prompts";

export const metadata: Metadata = {
  title: "搜索 AI 提示词",
  description: "搜索 PromptHub 收录的 Midjourney、即梦和 ChatGPT 提示词。",
  robots: { index: false, follow: true }
};

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return <SearchPageClient initialQuery={q} prompts={mockPrompts} />;
}
