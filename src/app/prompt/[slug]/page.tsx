import { notFound, redirect } from "next/navigation";
import { getPromptBySlug, mockPrompts } from "@/lib/mock-prompts";

type LegacyPromptPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return mockPrompts.map((prompt) => ({ slug: prompt.slug }));
}

export default async function LegacyPromptPage({ params }: LegacyPromptPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) notFound();
  redirect(`/prompts/${prompt.id}`);
}
