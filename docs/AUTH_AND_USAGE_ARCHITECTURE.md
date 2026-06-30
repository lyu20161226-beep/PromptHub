# Authentication And Usage Architecture

## Sprint Goal

Add the smallest durable identity and quota system required to control paid AI usage.

This sprint does not include payment, subscriptions, an admin dashboard, email login, or multiple OAuth providers.

## Chosen Architecture

### Identity

- Auth.js with the GitHub provider
- JWT sessions
- No OAuth access token exposed to the browser
- Stable internal subject derived from provider and provider account ID
- GitHub email is display data, not the quota primary key

Required environment variables:

```text
AUTH_SECRET
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET
```

Production callback:

```text
https://prompt-hub-theta-tawny.vercel.app/api/auth/callback/github
```

### Usage Store

Upstash Redis remains the single operational store for rate limits and usage counters.

Required environment variables:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

## Entitlement Model

The first implementation supports only two states:

| Plan | Monthly AI calls | Notes |
| --- | ---: | --- |
| anonymous | 0 | AI execution remains unavailable until sign-in |
| free | 20 | Resets at the beginning of each UTC month |

Paid plans are intentionally excluded until pricing is based on measured token cost and a compliant payment provider is selected.

## Canonical Types

```ts
type PlanId = "anonymous" | "free";

type Entitlement = {
  subjectId: string;
  planId: PlanId;
  period: string;
  limit: number;
  used: number;
  remaining: number;
  resetsAt: string;
};

type UsageReservation = {
  reservationId: string;
  subjectId: string;
  period: string;
  route: "chat" | "run";
  status: "reserved" | "committed" | "released";
  createdAt: string;
};
```

## Redis Keys

```text
account:v1:{subjectId}
usage:v1:{subjectId}:{YYYY-MM}
usage-reservation:v1:{reservationId}
```

`subjectId` must be a one-way hash of `provider:providerAccountId`. Do not use an email address in Redis keys or application logs.

## Request Lifecycle

1. Validate same-origin request, body size, and global rate limit.
2. Read the Auth.js server session.
3. Reject anonymous execution with `401`.
4. Resolve the user's entitlement.
5. Atomically reserve one call in Redis.
6. Reject exhausted quota with `429`.
7. Call DeepSeek with the existing timeout and concurrency controls.
8. Commit the reservation on a valid provider response.
9. Release the reservation when the provider call fails.
10. Return remaining quota in response headers.

The reserve operation must be atomic. A read followed by a separate increment is not acceptable because concurrent requests could exceed the quota.

## API Surface

```text
GET  /api/account/usage
POST /api/chat
POST /api/run
GET  /api/auth/session
GET  /api/auth/signin
POST /api/auth/signout
```

`GET /api/account/usage` returns only the current session's entitlement. It never accepts a user ID from query parameters.

## Security Rules

- Use Auth.js CSRF and OAuth state protections; do not build custom OAuth.
- Keep `/api/chat` and `/api/run` fail-closed when Redis is unavailable.
- Never trust plan or quota information supplied by the client.
- Never put provider access tokens, emails, prompt contents, or DeepSeek keys in usage logs.
- Do not decrement quota below zero during rollback.
- Give reservation keys a short expiry so abandoned requests can be reconciled.
- Do not call a paid model before the quota reservation succeeds.

## Definition Of Done

- GitHub sign-in and sign-out work in production.
- Anonymous AI execution returns `401`.
- A signed-in free user can read their remaining quota.
- Concurrent calls cannot exceed the monthly limit.
- Failed provider calls return the reserved unit.
- Successful calls consume exactly one unit.
- Redis or authentication failure prevents a DeepSeek call.
- Production build passes.
- No account page is indexed by search engines.

## Blocker

Auth.js could not be installed on 2026-06-30 because this development environment timed out while connecting to the npm registry. No custom authentication fallback should be implemented. Resume this sprint when package access is restored.
