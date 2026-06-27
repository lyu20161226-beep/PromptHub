"use client";

import { Check, Copy, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

const FAVORITES_KEY = "prompthub:pack-preview-favorites";

function readFavorites() {
  if (typeof window === "undefined") return [] as string[];
  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function PackPromptPreview({ packSlug, text }: { packSlug: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(readFavorites().includes(packSlug));
  }, [packSlug]);

  async function copyPreview() {
    await navigator.clipboard.writeText(text);
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
    <div className="rounded-lg border border-zinc-200 bg-zinc-950 p-5 text-white">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Prompt Preview</p>
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
      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-300">{text}</p>
      <p className="mt-4 border-t border-zinc-800 pt-4 text-xs text-zinc-500">当前展示约 30% 内容，完整版本包含全部变量、步骤和输出约束。</p>
    </div>
  );
}
