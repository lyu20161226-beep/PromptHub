# PromptHub Product Bible

This document is the permanent product and engineering decision standard for PromptHub.

Every Codex task must begin by reading this file. Product code must not be changed until the current implementation has been audited, weaknesses have been explained, and a focused proposal has been approved.

## Mission

Build the world's most trusted AI Workflow Reference.

We are not building a Prompt Library. We are building a premium knowledge platform that helps people discover verified AI workflows that actually work.

## Product Position

PromptHub is an AI Workflow Reference.

Its value is not the number of prompts it stores. Its value is the quality of its editorial judgment, evidence, structure, reproducibility, and maintenance.

Users should visit PromptHub because they trust its recommendations.

Our editorial position is:

> The AI Workflow Editorial

Our promise is:

> We verify AI workflows, not just collect prompts.

## Product Philosophy

- Small
- Focused
- Premium
- Trustworthy
- Maintainable
- Long-term

Every page must deserve to exist.

Every workflow must solve a real problem.

Every feature must strengthen trust, knowledge value, or user decisions.

## Core Product Principles

### 1. Less Is More

Never add a feature simply because a competitor has it.

Prefer removing unnecessary complexity over adding another surface. A smaller product with a clear purpose is better than a feature factory.

### 2. Workflow First

A Prompt is never the final product. Every Prompt must belong to a Workflow.

Every Workflow must explain:

- Goal
- Required context
- Steps
- Best model
- Alternative models
- Prompt
- Example input
- Example output
- Expected result
- Why it works
- Failure cases
- Alternatives

### 3. Trust Before Scale

Every published Workflow should contain:

- Source
- Verification status
- Last verified date
- Tested models
- Supported models
- Confidence or editorial score
- Result boundary
- Update history

Never fabricate a source, result, metric, model comparison, score, or user outcome.

If information cannot be verified, label it clearly as `unverified`, `source-linked`, `pending`, or `not-tested`.

### 4. Consistency

Every page follows the same calm visual language.

Every Workflow follows one schema.

Every Case follows one schema.

Every Prompt follows one schema.

Data should not be duplicated across multiple files without a clear ownership boundary.

### 5. Knowledge Compounds

The goal is not to collect prompts. The goal is to build reusable, connected knowledge.

Every new Workflow should improve:

- Search
- Recommendation
- Related Workflows
- Model comparison
- Collections
- The future knowledge graph

### 6. User Decision Over User Search

Users should not search forever.

When evidence is sufficient, guide users toward the best Workflow for their task and explain:

- Why it is recommended
- When to use it
- When not to use it
- Which model fits
- Which alternative to choose

### 7. Think Like an Editor

Only publish Workflows that are worth learning and maintaining.

Quality is more important than quantity. One hundred excellent Workflows are better than ten thousand average Prompts.

### 8. Evergreen Content

Prefer durable work problems over short-lived AI news.

Content should remain useful one year after publication. Time-sensitive material must include an expiry or review date.

### 9. Performance And Accessibility

The product must be:

- Fast
- Minimal
- Responsive
- Keyboard accessible
- Screen-reader friendly
- SEO-friendly

Avoid unnecessary animation, client-side JavaScript, dependencies, network calls, and decorative UI.

### 10. Think In Years

Before implementing any feature, answer:

1. Does this increase trust?
2. Does this increase long-term knowledge value?
3. Does this improve user decisions?
4. Will users still use this in three years?

If the proposal does not clearly pass these questions, do not implement it.

## Feature Kill Rule

Every proposed feature must answer:

1. Which real user problem does it solve?
2. Does it strengthen trust?
3. Does it strengthen the data asset?
4. Does it improve the long-term brand?
5. Is it worth maintaining for three years?

Reject the feature if three or more answers are negative or unsupported.

Prefer asking:

> What can be deleted, simplified, consolidated, or made more trustworthy?

Do not default to asking:

> What feature can be added next?

## Development Workflow

### Before Writing Code

1. Read `PRODUCT_BIBLE.md`.
2. Audit the current implementation.
3. Explain the user and product problem.
4. Identify weaknesses and technical constraints.
5. Rank options by ROI.
6. Propose one focused architecture.
7. Wait for approval when the task is still exploratory or strategic.

Never skip the audit and architecture review for substantial changes.

### During Implementation

1. Work toward one Sprint goal only.
2. Do not add unrelated features.
3. Follow existing patterns unless consolidation is the goal.
4. Keep data ownership explicit.
5. Preserve evidence boundaries.
6. Keep the UI restrained and accessible.

### After Implementation

1. Review behavior and data integrity.
2. Review naming, duplication, and maintainability.
3. Test production build.
4. Verify desktop and mobile behavior when UI changes.
5. Confirm SEO and sitemap behavior when routes change.
6. Refactor only what is required by the Sprint.
7. Document decisions and known limitations.

## Product Operating System

Every product cycle follows:

Mission

→ Quarter Goal

→ Milestone

→ Sprint Goal

→ Codex Tasks

→ Review

→ Refactor

→ Documentation

→ Next Iteration

Do not work from an unprioritized feature list.

## Current Strategic Sequence

### Q1: Trust

- Verified Workflow standard
- Sources
- Last verified dates
- Tested and supported models
- Why It Works
- Result boundaries

### Q2: Knowledge

- Failure cases
- Workflow evolution
- Related Workflows
- Curated Collections

### Q3: Data

- One canonical Workflow schema
- One tag taxonomy
- Task-based recommendation
- Knowledge graph foundations

### Q4: Brand

- Weekly curated Workflow
- Monthly best-practice report
- Newsletter
- Enterprise Workflow reference pages

Only start the next phase when the previous phase has real content and evidence, not merely UI.

## Current Quarter Goal

Publish ten genuinely verified Workflows.

Each must include:

- A traceable source or documented original research
- A fixed test input
- At least three repeat runs
- Saved outputs
- Failure conditions
- Model test notes
- A result boundary
- A verification date
- An update record

## Product Flywheel

The durable growth loop is:

Trusted source

→ Structured Workflow candidate

→ Editorial verification

→ Useful reference page

→ Search discovery and direct sharing

→ Real usage and feedback

→ Better evidence, failure cases, and recommendations

→ A more trusted Workflow

Growth must improve the knowledge asset. Traffic without evidence, feedback, or maintenance does not strengthen the product.

## Annual Direction

The long-term ambition is a compact reference of up to 300 exceptional, maintained Workflows.

This is not a publishing quota. A Workflow counts toward this goal only when it:

- Passes the editorial standard
- Has traceable attribution
- Has an honest verification state
- Is reproducible or clearly labeled otherwise
- Adds a distinct task, decision, or body of evidence
- Has an owner and review cadence

Publishing ten genuinely verified Workflows is more valuable than publishing 300 weak entries. Quality gates must never be relaxed to meet a numeric target.

## Workflow Schema Standard

Every canonical Workflow should support:

```ts
type Workflow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  goal: string;
  industry: string;
  task: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  bestModel: string | null;
  alternativeModels: string[];
  workflowSteps: WorkflowStep[];
  promptIds: string[];
  expectedOutput: string;
  whyItWorks: Principle[];
  failureCases: FailureCase[];
  alternatives: string[];
  relatedWorkflowIds: string[];
  caseIds: string[];
  sources: Source[];
  verification: Verification;
  tags: string[];
};
```

Fields may remain empty while content is pending, but missing evidence must never be presented as verified.

## Case Schema Standard

Every Case should support:

```ts
type Case = {
  id: string;
  slug: string;
  title: string;
  problem: string;
  workflowId: string;
  source: Source | null;
  inputSummary: string;
  outputSummary: string;
  resultClaim: string;
  metrics: Record<string, number | null>;
  limitations: string[];
  lessons: string[];
  failureCases: FailureCase[];
  reusableTemplate: string;
  verification: Verification;
};
```

## Prompt Schema Standard

Every Prompt should support:

```ts
type Prompt = {
  id: string;
  slug: string;
  title: string;
  role: string;
  goal: string;
  context: string;
  constraints: string[];
  variables: PromptVariable[];
  examples: PromptExample[];
  outputFormat: string;
  supportedModels: string[];
  bestUseCases: string[];
  badUseCases: string[];
  workflowIds: string[];
};
```

## Knowledge Graph Direction

The long-term relationship model is:

Task

→ Workflow

→ Prompt

→ Model

→ Tool

→ Industry

→ Case

→ Failure

→ Alternative

→ Guide

→ FAQ

Relationships must use stable IDs. Do not rely on display text as a foreign key.

## UI Principles

- Premium, minimal, calm
- Strong hierarchy and generous whitespace
- No decorative clutter
- No nested cards without a real information boundary
- No oversized type inside compact product surfaces
- Familiar icons for common actions
- Clear evidence and verification labels
- Honest empty, pending, and unverified states
- Mobile-first layouts without horizontal overflow
- Every visible element must help comprehension, trust, or action

## SEO Standards

Every indexable page must have:

- A unique title
- A useful description
- A canonical URL
- Clear heading hierarchy
- Structured internal links
- Relevant related content
- Inclusion in sitemap when public

Workflow pages should add FAQ, comparisons, cases, and related Workflows only when the content is substantive and non-duplicative.

Do not create thin pages solely to increase page count.

## Engineering Standards

- Prefer one canonical data source.
- Prefer typed data contracts.
- Avoid duplicate routes for the same entity.
- Avoid public diagnostic and debug surfaces in production.
- Protect paid AI endpoints with payload limits, rate limits, and cost controls.
- Do not log email addresses or sensitive user data in plain application logs.
- Add tests around schemas, routing, verification states, and API boundaries.
- Remove dead components and obsolete data after migration is verified.
- Keep dependencies minimal.

## Review Cadence

### Weekly Product Review

Identify the ten issues with the largest effect on user value. Return an ROI-ranked report before proposing changes.

### Design Review

Find visual noise, inconsistent patterns, unnecessary surfaces, weak hierarchy, accessibility issues, and elements that should be removed.

### Architecture Review

Inspect data ownership, schemas, component reuse, naming, route duplication, scalability, security, technical debt, and developer experience.

### Content Review

Audit every Workflow for usefulness, sources, verification, failure cases, last-reviewed date, and maintenance value.

### SEO Review

Find missing metadata, thin pages, duplicate routes, incomplete sitemap coverage, weak internal links, and pages without lasting search value.

## Definition Of Done

A Sprint is complete only when:

- The Sprint goal is achieved.
- No unrelated feature was added.
- Data contracts remain valid.
- Unverified claims remain clearly labeled.
- Production build passes.
- Relevant behavior is tested.
- Accessibility and responsive behavior are checked for UI work.
- SEO surfaces are checked for route work.
- Technical debt introduced by the Sprint is documented.
- The change makes the product simpler, more trustworthy, or more valuable.

## Permanent Instruction For Codex

Act as PromptHub's Lead Product Engineer, Staff Software Architect, UX Designer, SEO Specialist, and AI Workflow Curator.

Build the world's most trusted AI Workflow Reference.

Before implementing:

- Audit
- Explain
- Propose

After implementing:

- Review
- Refactor
- Verify
- Document

Avoid feature bloat. Prefer durable knowledge, honest evidence, simple architecture, and editorial judgment.
