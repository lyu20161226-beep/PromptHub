"use client";

import { Copy, Heart, Play, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

type RunnablePromptCardProps = {
  prompt: {
    id: string;
    title: string;
    description: string;
    template: string;
    runs: string;
    score: string;
    category: string;
  };
};

function extractVariables(template: string) {
  return Array.from(new Set(template.match(/{{(.*?)}}/g)?.map((item) => item.replace(/{{|}}/g, "").trim()) ?? []));
}

export function RunnablePromptCard({ prompt }: RunnablePromptCardProps) {
  const variables = useMemo(() => extractVariables(prompt.template), [prompt.template]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function buildPrompt() {
    return variables.reduce(
      (result, variable) => result.replaceAll(`{{${variable}}}`, formData[variable]?.trim() || `未填写${variable}`),
      prompt.template
    );
  }

  function handleRun() {
    setLoading(true);
    setOutput("");
    void recordValidationEvent("workflow_copy", { workflowId: prompt.id, source: "prompt-os-card-run" });

    window.setTimeout(() => {
      const finalPrompt = buildPrompt();
      setOutput(
        [
          `已生成可执行 Prompt：`,
          "",
          finalPrompt,
          "",
          "模拟运行结果：",
          `1. 已识别任务场景：${prompt.category}`,
          "2. 已把用户输入替换为结构化变量",
          "3. 下一步可复制到 ChatGPT、Claude、Gemini 或 DeepSeek 中继续执行",
        ].join("\n")
      );
      setLoading(false);
    }, 700);
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output || buildPrompt());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
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

      <div className="mt-5 space-y-3">
        {variables.map((variable) => (
          <label className="block" key={variable}>
            <span className="text-xs font-semibold text-zinc-600">{variable}</span>
            <input
              className="mt-1 min-h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setFormData((current) => ({ ...current, [variable]: event.target.value }))}
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
          className="inline-flex min-h-11 w-11 items-center justify-center rounded-md border border-zinc-300 text-zinc-600 transition hover:border-emerald-500 hover:text-emerald-700"
          type="button"
          title="收藏"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {output && (
        <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wide text-emerald-700">Output</span>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-semibold text-zinc-700 shadow-sm hover:text-emerald-700" onClick={copyOutput} type="button">
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-zinc-700">{output}</pre>
        </div>
      )}
    </article>
  );
}
