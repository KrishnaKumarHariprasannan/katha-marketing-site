## Katha Marketing Site — AI Coding Guide

### Overview
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 (via PostCSS), custom global CSS.
- **Goal:** Single-page marketing site with hero, services, and contact form that emails `hello@katha.io` via Resend.
- **Key paths:** `app/layout.tsx`, `app/page.tsx`, `app/api/contact/route.ts`, `app/globals.css`, `public/`.

### Architecture & Data Flow
- **Layout:** `app/layout.tsx` defines global metadata (icons), loads Google fonts (`next/font/google`) and exposes font CSS variables (`--font-quicksand`, `--font-mulish`) used in `globals.css`.
- **Home page:** `app/page.tsx` is a client component (`"use client"`). It implements smooth section navigation (hero → services → contact) and a contact form.
- **Contact API:** `POST /api/contact` (`app/api/contact/route.ts`) validates `{ from, email, subject }`, then sends a text email via Resend. Returns `{ ok: true }` or `{ ok: false, error }` with `400/500` status.
- **Styling:** `app/globals.css` uses CSS variables and BEM-like classes (e.g., `hero__cta`, `service-card__title`). Tailwind v4 is imported but styles are authored primarily in custom CSS.

### Developer Workflows
- **Dev server:** `npm run dev` → Next.js dev.
- **Build:** `npm run build` → production build.
- **Start:** `npm run start` → serve built app.
- **Lint:** `npm run lint` (ESLint config extends `eslint-config-next` core web vitals + TS, with custom ignores in `eslint.config.mjs`).
- **Env setup:** Create `.env.local` with `RESEND_API_KEY=<your_key>` for the contact API.

### Conventions & Patterns
- **Client components:** Mark with `"use client"` at top (see `app/page.tsx`). Event handlers, `useEffect`, and DOM APIs live here.
- **Server routes:** Use Next.js App Router handlers (`export async function POST(request: Request)`) and respond with `NextResponse.json(...)`.
- **TypeScript config:** Strict TS, path alias `@/*` → project root (`tsconfig.json`). Prefer `import x from "@/path"` when adding shared modules.
- **Fonts & icons:** Fonts via `next/font/google` with `display: "swap"`. Update `metadata.icons` in `app/layout.tsx`. Put images in `public/` and reference with `/...`.
- **CSS:** Favor existing BEM-style class names. Leverage provided CSS variables for colors, gradients, spacing, shadows, radii, motion. Tailwind utilities are available but not the primary pattern.

### Integration Details (Resend)
- **Dependency:** `resend` client (`package.json`), instantiated with `process.env.RESEND_API_KEY`.
- **Email send:** `resend.emails.send({ from: "Katha <no-reply@katha.io>", to: "hello@katha.io", subject, text })`.
- **Failure handling:** Return `{ ok: false, error }` with `500` if Resend errors; client shows `alert(...)` messages.

### Practical Examples
- **API contract (client):**
  ```ts
  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from, email, subject }),
  });
  ```
- **Adding a new API route:**
  ```ts
  // app/api/subscribe/route.ts
  import { NextResponse } from "next/server";
  export async function POST(req: Request) {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ ok: false }, { status: 400 });
    return NextResponse.json({ ok: true });
  }
  ```
- **Using path alias:** `import { X } from "@/lib/X"` (add `lib/` at project root).

### Gotchas
- **Env var required:** Without `RESEND_API_KEY`, `/api/contact` returns 500.
- **ESLint ignores:** `.next/**`, `out/**`, `build/**`, `next-env.d.ts` are globally ignored; place new code outside these.
- **Styling consistency:** Maintain `globals.css` conventions (CSS variables, BEM classes). Avoid mixing utility-first styles unless agreed.

### Where to Look
- **Routing & forms:** `app/page.tsx`.
- **Email sending & validation:** `app/api/contact/route.ts`.
- **Global UI & assets:** `app/layout.tsx`, `app/globals.css`, `public/`.

If any section feels incomplete (e.g., preferred Tailwind usage vs custom CSS, alias usage examples), tell me what’s unclear and I’ll refine it.