"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type SolutionWorkflowCopyButtonProps = {
  text: string;
};

export function SolutionWorkflowCopyButton({ text }: SolutionWorkflowCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      onClick={handleCopy}
      type="button"
    >
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
      {copied ? "已复制整个 Workflow" : "复制整个 Workflow"}
    </button>
  );
}
