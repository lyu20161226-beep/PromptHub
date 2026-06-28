# PromptHub Editorial Playbook

## Editorial Mission

PromptHub is an editorial reference for AI workflows that actually work.

We do not compete on volume. We curate, verify, structure, explain, and maintain reusable AI working methods. Our value comes from judgment and evidence, not automated generation.

## Non-Negotiable Rules

1. Never invent workflows, prompts, sources, metrics, test results, authors, or success claims.
2. Preserve attribution and respect licenses, terms, paywalls, and creator rights.
3. Summarize and analyze sources. Do not republish paid packs, proprietary prompts, or substantial copyrighted text.
4. A source link proves provenance, not effectiveness.
5. Label uncertainty honestly. Unverified content must never look verified.
6. Human approval is required before publishing verification claims, model rankings, scores, or performance metrics.
7. Reject content that does not solve a real problem or cannot be maintained.

## Source Tiers

| Source type | Base score |
| --- | ---: |
| Official model documentation or cookbook | 10 |
| Official GitHub repository | 9 |
| Peer-reviewed, reproducible research | 9 |
| Established open-source project or detailed engineering case study | 8 |
| Public community case with concrete evidence | 8 |
| Reputable developer publication | 7 |
| Technical video with reproducible detail | 6 |
| Ordinary blog, listicle, anonymous repost, or content aggregator | 5 or lower |

The default publication threshold is a source score of 8. Exceptions require an explicit editorial reason. Reputation alone never proves that a workflow works.

## Content Score

Score candidates out of 100:

| Dimension | Weight |
| --- | ---: |
| Source quality | 25 |
| Real problem value | 20 |
| Reproducibility | 20 |
| Evidence quality | 15 |
| Learning value | 10 |
| Evergreen value | 10 |

Editorial decisions:

- 85-100: eligible for Editor's Pick after verification.
- 75-84: publish only as source-linked with clear limitations.
- 60-74: keep in the research queue.
- Below 60: reject.

Do not display this score publicly until its method and supporting evidence are documented.

## Content Pipeline

Candidate discovery
-> source screening
-> rights and license check
-> structured extraction
-> duplicate review
-> content scoring
-> reproduction plan
-> human test
-> evidence review
-> schema validation
-> human approval
-> publish
-> scheduled re-verification

AI may assist each stage, but it may not silently promote a candidate to verified.

## Candidate Discovery

Prioritize:

1. Official model documentation and cookbooks.
2. Official or established open-source repositories.
3. Detailed engineering case studies with inputs, steps, and outputs.
4. Public community discussions containing reproducible evidence.

Avoid:

- Scraping commercial prompt marketplaces.
- Copying paid packs or gated material.
- Rewriting a creator's work so closely that it substitutes for the original.
- Treating popularity, likes, or confident language as proof.
- Publishing content whose origin cannot be traced.

## Structured Extraction

Every candidate should capture:

- Title and task.
- User goal and context.
- Source URL, author, platform, and publication date when available.
- Rights or license notes.
- Workflow steps.
- Prompt excerpt or summary when permitted.
- Required inputs, tools, and models.
- Claimed result, separated from independently observed evidence.
- Why it may work.
- Failure cases and limitations.
- Alternatives.
- Verification status and last-reviewed date.

Unknown fields remain `null` or explicitly unknown. Never fill gaps with plausible guesses.

## Verification Standard

A workflow can be marked verified only when:

1. Its source or original research is documented.
2. A fixed test input and expected success criteria are defined before testing.
3. The workflow is run at least three times under recorded conditions.
4. Outputs or structured observations are retained.
5. Failure conditions and limitations are recorded.
6. Model, version, parameters, tools, and test date are documented when available.
7. Claims do not exceed the evidence.
8. A human editor approves publication.

If these conditions are incomplete, use `source-linked`, `demo`, or `unverified`.

## Model Comparison Standard

Model comparisons must use:

- The same task and input.
- The same workflow and allowed context.
- A predefined evaluation rubric.
- Multiple runs where model variability matters.
- Recorded model versions and dates.

Never declare a "best model" from one subjective run.

## Publication Checklist

- [ ] Solves a specific, real user problem.
- [ ] Source and attribution are present.
- [ ] Rights and reuse have been reviewed.
- [ ] Workflow is reproducible.
- [ ] Prompt content is quoted or summarized within permitted limits.
- [ ] Why It Works is evidence-based.
- [ ] Failure Cases are documented.
- [ ] Alternatives are useful and honest.
- [ ] Supported and tested models are distinguished.
- [ ] Claims and metrics have evidence.
- [ ] Verification status is accurate.
- [ ] Last reviewed date is present.
- [ ] Related workflows add genuine value.
- [ ] Schema validation passes.
- [ ] Human editorial approval is recorded.

## Maintenance States

- `candidate`: discovered but not reviewed.
- `source-linked`: provenance is clear; effectiveness is not independently verified.
- `in-testing`: reproduction work is active.
- `verified`: verification standard is complete.
- `needs-review`: model or source changes may affect reliability.
- `deprecated`: no longer recommended, retained for learning and history.
- `rejected`: unsuitable for publication.

## Re-Verification Cadence

- Review verified workflows every 90 days by default.
- Review sooner after major model, API, or tool changes.
- Move stale workflows to `needs-review`; do not leave an old verified badge in place.
- Keep an update log explaining what changed and why.

## Weekly Editorial Cadence

Publish up to five meaningful improvements per week:

- One Editor's Pick candidate.
- One newly verified workflow.
- One improved failure analysis.
- One model comparison or re-verification.
- One deprecated or corrected item.

Publishing fewer items is correct when evidence is weak.

## Editorial Responsibilities

Codex may:

- Discover candidates.
- Extract and normalize facts.
- Detect duplicates.
- Draft test plans.
- Format content to the project schema.
- Flag missing evidence and rights concerns.

A human editor must approve:

- Verification status.
- Performance and success claims.
- Public scores and rankings.
- Best-model recommendations.
- Rights-sensitive excerpts.
- Final publication.

## Permanent Editorial Instruction

You are the Editorial Director of the world's most trusted AI Workflow Reference.

Before adding content, verify:

1. Is it from a trustworthy and attributable source?
2. Does it solve a real user problem?
3. Can it be reproduced?
4. Does it improve the structured knowledge base?
5. Will it remain useful or maintainable for at least one year?

If any answer is no, do not publish it. Prefer quality over quantity. Never fabricate workflows, prompts, metrics, evidence, or success stories.
