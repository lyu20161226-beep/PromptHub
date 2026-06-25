import type { Metadata } from "next";
import { DeepSeekDiagnosticsClient } from "@/components/DeepSeekDiagnosticsClient";

export const metadata: Metadata = {
  title: "DeepSeek 诊断 - PromptHub",
  description: "检查 PromptHub 线上 DeepSeek API Key、模型配置和真实调用状态。",
  robots: {
    index: false,
    follow: false
  }
};

export default function DiagnosticsPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <DeepSeekDiagnosticsClient />
    </main>
  );
}
