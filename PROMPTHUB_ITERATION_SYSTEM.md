# PromptHub Permanent Iteration System

This document defines how Codex, Cursor, Claude Code, and human contributors should execute product work in PromptHub.

It does not replace:

1. `PRODUCT_BIBLE.md`, which owns mission, product strategy, and engineering principles.
2. `PROMPTHUB_WORKFLOW_STANDARD.md`, which owns Workflow content, evidence, verification, and maintenance.

Read all three before substantial work. When instructions conflict, use this precedence:

1. Truth and user safety
2. `PRODUCT_BIBLE.md`
3. `PROMPTHUB_WORKFLOW_STANDARD.md`
4. `PROMPTHUB_ITERATION_SYSTEM.md`
5. A task-specific request

Do not use a lower-priority instruction to weaken evidence, security, accessibility, or product focus.

## 1. Permanent Role

Act as PromptHub's long-term:

- Product partner
- Staff full-stack engineer
- UX reviewer
- SEO reviewer
- Workflow editor
- Quality auditor

The goal is not to complete isolated feature requests quickly. The goal is to make PromptHub smaller, clearer, more trustworthy, and more useful over time.

## 2. Permanent Positioning

PromptHub is an AI Best Practices Platform.

Its permanent product ladder is:

Free Prompt Library

→ Collections

→ AI Workflows

→ Premium AI Playbooks

→ Toolkits

The product promise is:

> Discover verified prompts. Master complete workflows. Build with AI.

The durable value is editorial judgment:

- Which Workflow is worth using?
- What evidence supports it?
- Which model was tested?
- When should it not be used?
- What changed since the last review?

Prompts are free discovery and SEO entry points. Workflows teach complete methods. Playbooks deliver complete, maintainable solutions. Toolkits turn those solutions into executable assets.

## 3. Current Phase Guard

The current implementation phase is:

> Deepen and verify the six priority Workflows.

Do not add a seventh Workflow until all six priority Workflows reach at least `Internal Tested`.

The product ladder is permanent, but its features are implemented in phases. Prompt Builder, submissions, accounts, admin dashboards, public scoring, newsletters, payments, and new model pages remain deferred until they pass the Feature Kill Rule and become the single approved Sprint goal.

## 4. Before Every Iteration

Before changing code or content, answer:

1. What real user problem is being solved?
2. Does the change strengthen the Prompt → Workflow → Playbook → Toolkit journey?
3. Does it strengthen trust?
4. Does it improve knowledge quality or user decisions?
5. Does it reduce or add complexity?
6. Is the change useful in three years?
7. Does it improve durable search value without creating a thin page?
8. Does it preserve performance, accessibility, mobile behavior, and security?

Reject or narrow the change when three or more answers are negative, unknown, or unsupported.

Then:

1. Audit the current implementation.
2. Identify the smallest ownership boundary.
3. Explain evidence and technical constraints.
4. Propose one focused implementation.
5. Confirm that no unrelated feature is being added.

## 5. One Sprint, One Goal

Every Sprint must have:

- One user problem
- One measurable completion condition
- One affected product surface
- One verification plan
- One explicit non-goal list

Do not combine content migration, redesign, authentication, payment, recommendation, and analytics into one Sprint.

Prefer upgrading an existing Workflow over creating a new page.

## 6. Content Gate

Every published Workflow follows `PROMPTHUB_WORKFLOW_STANDARD.md`.

At minimum, it must expose:

- Problem
- Audience
- Required inputs
- Steps
- Copyable Prompt
- Example input and output
- Expected output
- Common mistakes
- Best practices
- Boundary
- Model evidence status
- Verification record
- Version and review dates
- Related Workflow IDs

Missing evidence must lower the status, not trigger invented content.

## 6A. Product Layer Standards

### Prompt

A free, focused entry point that solves one bounded task and links to a relevant Workflow when one exists.

### Workflow

A complete method with steps, evidence boundaries, examples, failure cases, and expected outputs.

### Playbook

A maintained knowledge product containing:

- Introduction
- When to use
- Complete Workflow
- Prompts for each step
- Examples
- Assets
- Checklist
- Deliverables
- FAQ
- Changelog

A paid Playbook must contain materially more execution value than its free Prompt and Workflow previews. It cannot be a paywalled copy of free content.

### Toolkit

Reusable execution assets such as:

- Notion templates
- Spreadsheets
- Markdown templates
- Checklists
- Publishing calendars
- Briefs
- Importable configuration

Every Toolkit item must map to a Playbook step and have a clear output. Do not add files merely to make a bundle look larger.

### Evidence Rule

Product price and editorial labels never override verification evidence. `Recommended`, `Verified`, model claims, scores, and time-saving claims must follow the same evidence standard in free and paid content.

## 7. Verification And Health

Verification status and editorial quality are separate.

Allowed Workflow verification states:

- `Demo Only`
- `Internal Tested`
- `Community Testing`
- `Verified`
- `Archived`

Allowed editorial tiers:

- `Standard`
- `Recommended`
- `Gold Standard`

Use the evidence-based Quality Score defined in `PROMPTHUB_WORKFLOW_STANDARD.md`. Do not display a public star rating or trust label unless its meaning and evidence are clear.

Review triggers:

- Priority Workflow not reviewed for 30 days → `Needs Review`
- Verification evidence older than its review window → re-test queue
- Relevant model or framework major release → impact review
- Broken source or failed reproduction → immediate review
- Credible user report → review queue
- Unsupported claim → remove or downgrade immediately

A review may conclude “no content change.” Update `lastReviewed`; do not create a fake version.

## 8. SEO Rules

Every indexable page needs:

- A distinct search intent
- Unique title and description
- Canonical URL
- Useful heading hierarchy
- Honest internal links
- Correct robots behavior
- Sitemap inclusion only when indexable

Open Graph and Twitter metadata should be present on shareable canonical pages.

Add JSON-LD only when the page has a valid schema type and the visible content fully supports the structured data. Do not add empty or misleading markup merely to satisfy a checklist.

Do not create `/models/[model]`, `/tags/[tag]`, `/collections/[slug]`, or similar page families until there is enough distinct, maintained content to avoid thin pages.

## 9. UX And Visual Rules

The interface should remain:

- Calm
- Minimal
- Readable
- Fast
- Accessible
- Mobile-first

Avoid:

- Unnecessary modals
- Decorative gradients
- Excessive animation
- Dense dashboards
- Duplicate navigation
- Unsupported trust badges
- Empty banners
- Nested cards

Dark mode is not a permanent requirement. Add it only when it becomes an approved product need and can be maintained consistently.

## 10. Metrics

Track only metrics tied to a decision:

- Workflow opens
- Prompt copies
- Favorites
- Search queries with no useful result
- Related Workflow navigation
- Verification feedback
- Return visits
- Content reports

Metrics must have:

- A defined question
- A retention period
- Privacy review
- A decision owner

Do not collect data merely because it may be useful later. Do not treat copy or favorite counts as proof that a Workflow works.

## 10A. Monetization And AI Cost Control

Keep knowledge products and AI services separate:

- Knowledge products: Prompt, Workflow, Playbook, Toolkit
- Metered service: AI Assistant and generated outputs

Knowledge products may use free previews and paid unlocks. AI generation uses Credits or finite quotas.

Do not:

- Bundle unlimited AI into a low-price subscription
- Price Credits before measuring real token usage
- Hide the active model in legal, privacy, billing, or usage information
- Claim GPT, Claude, Gemini, or multi-model support when only DeepSeek is connected
- describe a static Prompt or Workflow unlock as an API Credit

Before implementing payment or Credits, the Sprint must define:

- Product being sold
- Unlock scope
- Expiry rule
- Refund rule
- Credit consumption rule
- Provider cost baseline
- Heavy-user scenario
- Abuse limit
- Gross margin target
- Payment and tax compliance owner

Candidate China-market price bands are hypotheses for testing, not permanent product truth:

- Low-friction Workflow unlock
- Higher-value Workflow or Playbook
- Complete Playbook
- Toolkit bundle
- Credit packs
- Pro plan with finite monthly Credits

Exact prices belong in a dated pricing experiment record after cost measurement. Do not hardcode strategy-document example prices as final prices.

The provider may be deemphasized in marketing, but must remain accurately disclosed where users make an informed decision or inspect generated output.

## 11. After Every Iteration

Review:

1. Does the affected page load correctly?
2. Does TypeScript pass?
3. Does the production build pass?
4. Are desktop and mobile layouts coherent when UI changed?
5. Is keyboard and screen-reader behavior preserved?
6. Are metadata, canonical, robots, sitemap, and internal links correct when routes changed?
7. Are evidence states and claims still honest?
8. Did the change break an existing workflow?
9. Did the change add unnecessary code or duplicate data?
10. Is the next unresolved evidence gap documented?

Run:

- Relevant focused tests
- Production build
- Sitemap/noindex review for route or metadata changes
- Production verification after deployment

## 12. Required Completion Report

Every completed task must report:

- User problem addressed
- Files changed
- Workflows changed
- Verification status before and after
- Remaining evidence gaps
- Tests and build result
- SEO checks when relevant
- Explicitly deferred work

Do not report a Workflow as improved merely because its page became more attractive.

## 13. Permanent Product Discipline

Do not ask:

> What feature can be added next?

Ask:

> What can be removed, simplified, verified, or made easier to reproduce?

PromptHub should not become the largest AI content site.

It should become the AI Best Practices Platform users trust from their first free Prompt through a complete Workflow, Playbook, and Toolkit.
