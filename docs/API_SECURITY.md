# AI API Security Baseline

This document describes the current protection around `/api/chat` and `/api/run`.

## Implemented

- DeepSeek requests are made only from server routes.
- `DEEPSEEK_API_KEY` remains server-side.
- Browser requests must be same-origin JSON requests.
- Request bodies are limited to 32 KB.
- Messages, templates, variables, and final prompts have explicit size limits.
- Anonymous traffic is limited to 5 requests per minute and 10 requests per day per IP.
- Upstream DeepSeek calls time out after 30 seconds.
- Each server instance accepts at most 20 concurrent DeepSeek calls.
- API responses are not cached.
- The public health response does not expose any API key fragment.
- Global security headers include CSP, frame protection, MIME sniffing protection, referrer policy, and a restrictive permissions policy.

## Production Requirement

Configure both variables in Vercel:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

With these variables, rate-limit counters are shared across Serverless instances.

Production is fail-closed: without both variables, `/api/chat` and `/api/run` return `503` and do not call DeepSeek. If the configured rate-limit store is unavailable, production also returns `503`.

Local development uses an in-memory fallback. That fallback is useful for development and tests, but it is not a production quota because Serverless instances do not share memory.

## Current Boundaries

- The quota is anonymous and IP-based. Shared networks can share a quota, and determined users can change IP addresses.
- The concurrency cap is per Serverless instance, not global.
- No user account, paid entitlement, or monthly quota system exists yet.
- No payment provider is integrated.
- Prompt contents are not stored by this security layer.
- A keyword list is not treated as a complete moderation or legal compliance system.

## Required Operations

1. Rotate any API key that has ever appeared in chat, screenshots, logs, or source control.
2. Use a dedicated production API key with the lowest practical spend limit in the provider dashboard.
3. Configure provider billing alerts where available.
4. Configure Vercel Firewall rules as a second perimeter around `/api/chat` and `/api/run`.
5. Monitor `429`, `503`, upstream error rates, and provider spend.
6. Add authentication and account quotas before selling usage-based plans.

## Next Security Sprint

The next sprint should implement authenticated entitlements and durable usage accounting. It should not begin until the identity provider, database, billing provider, refund policy, operating entity, and target jurisdiction are decided.
