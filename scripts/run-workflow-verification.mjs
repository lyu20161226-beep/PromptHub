import fs from "node:fs/promises";
import path from "node:path";

const protocolPath = path.resolve("verification/deepseek-support-ticket-triage/protocol.json");
const outputPath = path.resolve("verification/deepseek-support-ticket-triage/runs.json");
const protocol = JSON.parse(await fs.readFile(protocolPath, "utf8"));

function extractJson(text) {
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(withoutFence);
}

function evaluate(reply) {
  const criteria = protocol.successCriteria;
  const failures = [];
  let parsed = null;
  const mojibakeMarkers = ["锛", "銆", "鐨", "璇", "浣", "鍗", "鏍", "璐"];

  try {
    parsed = extractJson(reply);
  } catch {
    failures.push("Response is not valid JSON.");
  }

  if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
    return { passed: false, failures, parsed: null };
  }

  const actualKeys = Object.keys(parsed).sort();
  const expectedKeys = [...criteria.exactKeys].sort();

  if (JSON.stringify(actualKeys) !== JSON.stringify(expectedKeys)) {
    failures.push(`Unexpected keys: ${actualKeys.join(", ")}`);
  }
  if (parsed.ticket_id !== criteria.ticketId) failures.push("ticket_id does not match.");
  if (parsed.category !== criteria.category) failures.push("category is not billing.");
  if (!criteria.allowedPriorities.includes(parsed.priority)) failures.push("priority is not high.");
  if (parsed.needs_human !== criteria.needsHuman) failures.push("needs_human is not true.");
  if (typeof parsed.summary !== "string" || [...parsed.summary].length > 60) failures.push("summary is missing or too long.");
  if (typeof parsed.next_action !== "string" || !parsed.next_action.trim()) failures.push("next_action is missing.");

  const serialized = JSON.stringify(parsed);
  if (mojibakeMarkers.some((marker) => serialized.includes(marker))) {
    failures.push("Response contains likely UTF-8 mojibake.");
  }
  for (const claim of criteria.forbiddenClaims) {
    if (serialized.includes(claim)) failures.push(`Contains forbidden claim: ${claim}`);
  }

  return { passed: failures.length === 0, failures, parsed };
}

const runs = [];

for (let index = 0; index < protocol.test.runs; index += 1) {
  const startedAt = new Date().toISOString();
  const response = await fetch(protocol.test.endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: protocol.test.prompt }),
  });
  const responseBody = await response.json();
  const reply = typeof responseBody.reply === "string" ? responseBody.reply : "";

  runs.push({
    run: index + 1,
    startedAt,
    completedAt: new Date().toISOString(),
    httpStatus: response.status,
    provider: responseBody.provider ?? null,
    model: responseBody.model ?? null,
    rawReply: reply,
    evaluation: response.ok
      ? evaluate(reply)
      : { passed: false, failures: [responseBody.error ?? "Request failed."], parsed: null },
  });
}

const artifact = {
  protocolId: protocol.id,
  generatedAt: new Date().toISOString(),
  sourceUrl: protocol.source.url,
  endpoint: protocol.test.endpoint,
  passedRuns: runs.filter((run) => run.evaluation.passed).length,
  totalRuns: runs.length,
  runs,
};

await fs.writeFile(outputPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
console.log(`Saved ${artifact.passedRuns}/${artifact.totalRuns} passing runs to ${outputPath}`);
