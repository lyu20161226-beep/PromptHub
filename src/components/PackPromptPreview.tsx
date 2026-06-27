"use client";

import { Check, Copy, Heart, LockKeyhole } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { PromptFramework } from "@/data/packs";
import { recordValidationEvent } from "@/lib/validation-events";

const FAVORITES_KEY = "prompthub:pack-preview-favorites";

const frameworkLabels: Array<[keyof PromptFramework, string]> = [
  ["role", "Role（角色）"],
  ["goal", "Goal（目标）"],
  ["context", "Context（背景）"],
  ["constraints", "Constraints（约束）"],
  ["workflow", "Workflow（流程）"],
  ["outputFormat", "Output Format（输出）"],
  ["examples", "Examples（示例）"],
  ["evaluation", "Evaluation（自检）"]
];

function readFavorites() {
  if (typeof window === "undefined") return [] as string[];
  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function PackPromptPreview({
  framework,
  packSlug
}: {
  framework: PromptFramework;
  packSlug: string;
}) {
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const visibleSections = useMemo(() => frameworkLabels.slice(0, 4), []);
  const lockedSections = frameworkLabels.slice(4);
  const visibleText = visibleSections
    .map(([key, label]) => `# ${label}\n${framework[key] ?? ""}`)
    .join("\n\n");

  useEffect(() => {
    setFavorite(readFavorites().includes(packSlug));
  }, [packSlug]);

  async function copyPreview() {
    await navigator.clipboard.writeText(visibleText);
    setCopied(true);
    void recordValidationEvent("prompt_preview_copy", { packSlug, source: "pack-preview" });
    window.setTimeout(() => setCopied(false), 1400);
  }

  function toggleFavorite() {
    const favorites = readFavorites();
    const next = favorites.includes(packSlug) ? favorites.filter((slug) => slug !== packSlug) : [...favorites, packSlug];
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
    setFavorite(next.includes(packSlug));
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 text-white">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-5 py-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Structured Prompt Preview</p>
          <p className="mt-1 text-xs text-zinc-500">免费展示前 4 个结构模块</p>
        </div>
        <div className="flex gap-2">
          <button
            aria-label={favorite ? "取消收藏" : "收藏预览"}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border ${
              favorite ? "border-emerald-400 bg-emerald-400 text-zinc-950" : "border-zinc-700 text-zinc-300 hover:border-emerald-400"
            }`}
            onClick={toggleFavorite}
            title={favorite ? "已收藏" : "收藏"}
            type="button"
          >
            <Heart className="h-4 w-4" fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
          </button>
          <button
            className="inline-flex min-h-9 items-center gap-2 rounded-md border border-zinc-700 px-3 text-xs font-bold text-zinc-200 hover:border-emerald-400 hover:text-emerald-300"
            onClick={copyPreview}
            type="button"
          >
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? "已复制" : "复制预览"}
          </button>
        </div>
      </div>

      <div className="divide-y divide-zinc-800">
        {visibleSections.map(([key, label]) => (
          <div className="p-5" key={key}>
            <p className="text-xs font-bold text-emerald-300">{label}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{framework[key]}</p>
          </div>
        ))}
        {lockedSections.map(([key, label]) => (
          <div className="flex items-center justify-between gap-4 bg-zinc-900/70 px-5 py-4" key={key}>
            <p className="text-xs font-bold text-zinc-500">{label}</p>
            <span className="inline-flex items-center gap-1 text-xs text-zinc-600">
              <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              完整 Pack 解锁
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
