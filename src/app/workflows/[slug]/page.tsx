import type { Metadata } from "next";
import PromptPage, { generateMetadata as generatePromptMetadata } from "@/app/prompts/[id]/page";
import { topWorkflowPrompts } from "@/lib/mock-prompts";

type WorkflowPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return topWorkflowPrompts.map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const { slug } = await params;
  return generatePromptMetadata({ params: Promise.resolve({ id: slug }) });
}

export default function WorkflowPage({ params }: WorkflowPageProps) {
  const mappedParams = params.then(({ slug }) => ({ id: slug }));
  return PromptPage({ params: mappedParams });
}
