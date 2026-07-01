import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
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
    ...["packs", "prompts", "cases", "academy", "lab", "daily", "favorites"].map((path) => ({
      url: `${siteUrl}/${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9
    }))
  ];

  const workflowPages: MetadataRoute.Sitemap = topWorkflowPrompts.map((prompt) => ({
    url: `${siteUrl}/workflows/${prompt.slug}`,
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

  const casePages: MetadataRoute.Sitemap = caseStudies.map((caseItem) => ({
    url: `${siteUrl}/cases/${caseItem.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8
  }));

  return [...corePages, ...packPages, ...casePages, ...workflowPages];
}
