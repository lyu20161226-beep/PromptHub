"use client";

import { Copy, Heart, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { RunnablePrompt } from "../../data/prompts";
import { recordValidationEvent } from "@/lib/validation-events";

type RunnablePromptCardProps = {
  prompt: RunnablePrompt;
};

const modelOptions = ["DeepSeek", "GPT-4o", "Claude 3.5", "Gemini"];

function extractVariables(template: string) {
  return Array.from(new Set(template.match(/{{(.*?)}}/g)?.map((item) => item.replace(/{{|}}/g, "").trim()) ?? []));
}

function getFavoriteIds() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem("prompthub:mvp-favorites") ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function RunnablePromptCard({ prompt }: RunnablePromptCardProps) {
  const variables = useMemo(() => extractVariables(prompt.template), [prompt.template]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedModel, setSelectedModel] = useState("DeepSeek");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFavorite(getFavoriteIds().includes(prompt.id));
  }, [prompt.id]);

  function updateField(variable: string, value: string) {
    setFormData((current) => ({ ...current, [variable]: value }));
  }

  async function handleRun() {
    setLoading(true);
    setOutput("");
    setError("");
    void recordValidationEvent("workflow_click", { workflowId: prompt.id, source: "prompt-os-card", model: selectedModel });

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          promptId: prompt.id,
          template: prompt.template,
          variables: formData,
          model: selectedModel
        })
      });

      const text = await response.text();
      let data: { result?: string; error?: string } = {};

      try {
        data = text ? (JSON.parse(text) as { result?: string; error?: string }) : {};
      } catch {
        throw new Error("服务返回格式异常，请刷新页面后重试。");
      }

      if (!response.ok || !data.result) {
        throw new Error(data.error || "运行失败，请稍后重试。");
      }

      setOutput(data.result);
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "运行失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  async function copyOutput() {
    const text = output || prompt.template;
    await navigator.clipboard.writeText(text);
    void recordValidationEvent("workflow_copy", { workflowId: prompt.id, source: "prompt-os-card" });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function toggleFavorite() {
    const ids = getFavoriteIds();
    const nextIds = ids.includes(prompt.id) ? ids.filter((id) => id !== prompt.id) : [...ids, prompt.id];
    window.localStorage.setItem("prompthub:mvp-favorites", JSON.stringify(nextIds));
    setFavorite(nextIds.includes(prompt.id));
  }

  return (
    <article className="flex min-h-full flex-col rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">{prompt.category}</span>
          <h3 className="mt-4 text-xl font-bold text-zinc-950">{prompt.title}</h3>
        </div>
        <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">运行 {prompt.runs}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-zinc-600">{prompt.description}</p>
      <p className="mt-3 text-xs font-semibold text-zinc-400">{prompt.scene}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <label className="mt-5 block">
        <span className="text-xs font-semibold text-zinc-600">选择模型</span>
        <select
          className="mt-1 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          onChange={(event) => setSelectedModel(event.target.value)}
          value={selectedModel}
        >
          {modelOptions.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
        <span className="mt-1 block text-xs text-zinc-400">当前后端优先使用 DeepSeek，其它模型作为未来扩展入口。</span>
      </label>

      <div className="mt-5 space-y-3">
        {variables.map((variable) => (
          <label className="block" key={variable}>
            <span className="text-xs font-semibold text-zinc-600">{variable}</span>
            <input
              className="mt-1 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => updateField(variable, event.target.value)}
              placeholder={`请输入${variable}`}
              value={formData[variable] ?? ""}
            />
          </label>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] gap-2">
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
          disabled={loading}
          onClick={handleRun}
          type="button"
        >
          {loading ? <RotateCcw className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {loading ? "运行中" : "立即运行"}
        </button>
        <button
          aria-label={favorite ? "取消收藏" : "收藏"}
          className={`inline-flex min-h-11 w-11 items-center justify-center rounded-md border transition ${
            favorite ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-zinc-300 text-zinc-600 hover:border-emerald-500 hover:text-emerald-700"
          }`}
          onClick={toggleFavorite}
          type="button"
          title={favorite ? "已收藏" : "收藏"}
        >
          <Heart className="h-4 w-4" fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
        </button>
      </div>

      {error && <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {output && (
        <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">运行结果</span>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-semibold text-zinc-700 shadow-sm hover:text-emerald-700" onClick={copyOutput} type="button">
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {copied ? "已复制" : "复制结果"}
            </button>
          </div>
          <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words text-sm leading-6 text-zinc-700">{output}</pre>
        </div>
      )}
    </article>
  );
}
