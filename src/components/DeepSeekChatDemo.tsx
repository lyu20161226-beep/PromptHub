"use client";

import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export function DeepSeekChatDemo() {
  const [message, setMessage] = useState("你好，请用一句话介绍 PromptHub。");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    setLoading(true);
    setReply("");
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "DeepSeek 返回为空，请稍后重试。");
      }

      setReply(data.reply);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "请求失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-y border-zinc-200 bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold text-emerald-700">DeepSeek API 测试</p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">前端调用 /api/chat，后端安全调用 DeepSeek</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            这个区域用于验证 API Key 和模型调用是否正常。API Key 只存在服务端环境变量里，不会暴露给浏览器。
          </p>
          <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
            <p className="font-bold text-zinc-950">部署时需要配置：</p>
            <p className="mt-2">DEEPSEEK_API_KEY=sk-...</p>
            <p>DEEPSEEK_MODEL=deepseek-chat</p>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5">
          <label className="block">
            <span className="text-sm font-bold text-zinc-950">发送给 DeepSeek 的内容</span>
            <textarea
              className="mt-2 min-h-32 w-full resize-y rounded-md border border-zinc-300 bg-white p-3 text-sm text-zinc-950 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
          </label>
          <button
            className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
            disabled={loading || !message.trim()}
            onClick={sendMessage}
            type="button"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            {loading ? "发送中" : "Send"}
          </button>

          {error && <pre className="mt-4 whitespace-pre-wrap rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm leading-6 text-red-700">{error}</pre>}

          {reply && (
            <div className="mt-4 rounded-md border border-emerald-200 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">DeepSeek Reply</p>
              <pre className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-700">{reply}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
