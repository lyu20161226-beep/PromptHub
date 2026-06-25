"use client";

import { CheckCircle2, RefreshCw, SendHorizontal, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type HealthResult = {
  ok: boolean;
  provider: string;
  model: string;
  keyPreview: string;
  checks: {
    hasApiKey: boolean;
    keyLooksValid: boolean;
    modelLooksValid: boolean;
  };
  message: string;
};

export function DeepSeekDiagnosticsClient() {
  const [health, setHealth] = useState<HealthResult | null>(null);
  const [healthError, setHealthError] = useState("");
  const [reply, setReply] = useState("");
  const [chatError, setChatError] = useState("");
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  async function checkHealth() {
    setLoadingHealth(true);
    setHealthError("");

    try {
      const response = await fetch("/api/health/deepseek", { cache: "no-store" });
      const data = (await response.json()) as HealthResult;
      setHealth(data);
    } catch (error) {
      setHealthError(error instanceof Error ? error.message : "无法读取 DeepSeek 健康检查。");
    } finally {
      setLoadingHealth(false);
    }
  }

  async function testChat() {
    setLoadingChat(true);
    setReply("");
    setChatError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "你好，请用一句话确认 DeepSeek 已经连接成功。" })
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "DeepSeek 测试失败。");
      }

      setReply(data.reply);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "DeepSeek 测试失败。");
    } finally {
      setLoadingChat(false);
    }
  }

  useEffect(() => {
    void checkHealth();
  }, []);

  const checks = health
    ? [
        ["已配置 DEEPSEEK_API_KEY", health.checks.hasApiKey],
        ["Key 格式正确", health.checks.keyLooksValid],
        ["模型名格式正确", health.checks.modelLooksValid]
      ]
    : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-emerald-700">DeepSeek Diagnostics</p>
            <h1 className="mt-2 text-3xl font-bold text-zinc-950">线上环境变量与接口自检</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
              这个页面只显示脱敏后的 Key 预览，不会暴露完整 API Key。用它判断问题是在 Vercel 环境变量，还是在 DeepSeek 真实调用。
            </p>
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 text-sm font-bold text-zinc-700 hover:border-emerald-500 hover:text-emerald-700 disabled:opacity-60"
            disabled={loadingHealth}
            onClick={checkHealth}
            type="button"
          >
            <RefreshCw className={`h-4 w-4 ${loadingHealth ? "animate-spin" : ""}`} aria-hidden="true" />
            重新检查
          </button>
        </div>

        {healthError && <pre className="mt-5 whitespace-pre-wrap rounded-md border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">{healthError}</pre>}

        {health && (
          <div className="mt-6 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
            <div className={`rounded-lg border p-5 ${health.ok ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"}`}>
              <div className="flex items-center gap-2">
                {health.ok ? <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" /> : <XCircle className="h-5 w-5 text-red-700" aria-hidden="true" />}
                <p className={`font-bold ${health.ok ? "text-emerald-900" : "text-red-900"}`}>{health.ok ? "环境变量格式正常" : "环境变量需要修正"}</p>
              </div>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Provider</dt>
                  <dd className="font-semibold text-zinc-950">{health.provider}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Model</dt>
                  <dd className="font-semibold text-zinc-950">{health.model}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-zinc-500">Key Preview</dt>
                  <dd className="font-semibold text-zinc-950">{health.keyPreview || "未配置"}</dd>
                </div>
              </dl>
              <pre className="mt-4 whitespace-pre-wrap rounded-md bg-white p-3 text-sm leading-6 text-zinc-700">{health.message}</pre>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
              <p className="font-bold text-zinc-950">检查项</p>
              <div className="mt-4 space-y-3">
                {checks.map(([label, passed]) => (
                  <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm" key={String(label)}>
                    <span className="font-semibold text-zinc-700">{label}</span>
                    {passed ? <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" /> : <XCircle className="h-4 w-4 text-red-600" aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-md bg-white p-3 text-sm leading-6 text-zinc-600">
                正确配置：
                <br />
                DEEPSEEK_API_KEY=sk-你的真实Key
                <br />
                DEEPSEEK_MODEL=deepseek-chat
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-zinc-950">真实调用测试</h2>
            <p className="mt-2 text-sm text-zinc-600">环境变量格式正常后，再点击这里测试 DeepSeek 是否真的返回内容。</p>
          </div>
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
            disabled={loadingChat}
            onClick={testChat}
            type="button"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            {loadingChat ? "测试中" : "测试 /api/chat"}
          </button>
        </div>
        {chatError && <pre className="mt-5 whitespace-pre-wrap rounded-md border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">{chatError}</pre>}
        {reply && (
          <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-900">DeepSeek 返回成功</p>
            <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-700">{reply}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
