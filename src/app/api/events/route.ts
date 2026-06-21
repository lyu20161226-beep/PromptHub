import { NextResponse } from "next/server";
import { topWorkflowIds } from "@/data/top-workflows";

const allowedEvents = new Set([
  "workflow_view",
  "workflow_click",
  "workflow_copy",
  "search",
  "feedback",
  "survey"
]);
const workflowIds = new Set<string>(topWorkflowIds);

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = cleanString(body?.event, 40);
    const properties = body?.properties && typeof body.properties === "object" ? body.properties : {};
    const workflowId = cleanString(properties.workflowId, 60);

    if (!event || !allowedEvents.has(event)) {
      return NextResponse.json({ error: "invalid event" }, { status: 400 });
    }

    if (event.startsWith("workflow_") || event === "feedback") {
      if (!workflowId || !workflowIds.has(workflowId)) {
        return NextResponse.json({ error: "invalid workflow" }, { status: 400 });
      }
    }

    const logEntry = {
      event,
      timestamp: cleanString(body?.timestamp, 30) ?? new Date().toISOString(),
      sessionId: cleanString(body?.sessionId, 20),
      path: cleanString(body?.path, 120),
      properties: {
        workflowId,
        source: cleanString(properties.source, 100),
        location: cleanString(properties.location, 40),
        query: cleanString(properties.query, 100),
        helpful: typeof properties.helpful === "boolean" ? properties.helpful : undefined,
        reason: cleanString(properties.reason, 500),
        need: cleanString(properties.need, 40),
        otherNeed: cleanString(properties.otherNeed, 120)
      }
    };

    console.info("[prompthub-validation]", JSON.stringify(logEntry));
    return new NextResponse(null, { status: 202 });
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
}
