"use client";

import { useEffect } from "react";
import { getPageSource, recordValidationEvent } from "@/lib/validation-events";

export function WorkflowViewTracker({ workflowId }: { workflowId: string }) {
  useEffect(() => {
    void recordValidationEvent("workflow_view", { workflowId, source: getPageSource() });
  }, [workflowId]);

  return null;
}
