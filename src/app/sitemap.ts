import type { MetadataRoute } from "next";
import { packs } from "@/data/packs";
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
    ...["packs", "prompts", "academy", "lab", "daily", "favorites"].map((path) => ({
      url: `${siteUrl}/${path}`,
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

  const packPages: MetadataRoute.Sitemap = packs
    .filter((pack) => pack.status === "featured")
    .map((pack) => ({
    url: `${siteUrl}/packs/${pack.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9
  }));

  return [...corePages, ...packPages, ...promptPages];
}
