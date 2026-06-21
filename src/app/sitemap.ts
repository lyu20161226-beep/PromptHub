import type { MetadataRoute } from "next";
import { topWorkflowPrompts } from "@/lib/mock-prompts";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    ...["workflows", "packs", "midjourney", "jimeng", "chatgpt"].map((platform) => ({
      url: `${siteUrl}/${platform}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9
    }))
  ];

  const promptPages: MetadataRoute.Sitemap = topWorkflowPrompts.map((prompt) => ({
    url: `${siteUrl}/prompts/${prompt.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [...corePages, ...promptPages];
}
