"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { recordValidationEvent } from "@/lib/validation-events";

export function CopyButton({ text, workflowId, location = "detail" }: { text: string; workflowId?: string; location?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      if (workflowId) void recordValidationEvent("workflow_copy", { workflowId, location });
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      onClick={handleCopy}
      type="button"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      {copied ? "已复制" : "复制提示词"}
    </button>
  );
}
