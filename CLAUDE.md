# Ponte - Dual Language Dictionary

## Core Idea

Ponte ("bridge" in Portuguese) is a dual-language dictionary web app. The user picks any two languages, types a word or phrase in either one, and the app auto-detects the language and shows rich linguistic results for both sides simultaneously — definitions, translations, synonyms, antonyms, related words, usage examples, false friend warnings, and spell correction.

The key differentiator from Google Translate / DeepL is **zero language switching**. You never pick source vs target — you just type, and both sides appear.

## Tech Stack

- **Language:** TypeScript (strict, no comments in code)
- **Framework:** Next.js 16 (App Router) with React 19
- **Package manager:** Bun
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Linting/Formatting:** ESLint + Prettier
- **AI engine:** Gemini 2.5 Flash via `@google/genai` — single API call per lookup returns all linguistic data as structured JSON (free tier: 1,500 req/day, 15 RPM)
- **API:** Next.js Route Handlers (`app/api/lookup/route.ts`)
- **Client caching:** IndexedDB via `idb-keyval` — keyed by `query:langA:langB`
- **Client storage:** localStorage for language pair preference and search history
- **Deployment:** Vercel

## Running Locally

```bash
# 1. Set your API key (get one free at https://aistudio.google.com/apikey)
echo "GEMINI_API_KEY=your-key-here" > .env.local

# 2. Start the dev server (frontend + API in one process)
bun run dev
```

Next.js handles both the frontend and the `/api/lookup` route — no separate API server needed.

## Environment Variables

- `GEMINI_API_KEY` — Required. Google Gemini API key. Free at https://aistudio.google.com/apikey. Set in `.env.local` locally, in Vercel environment variables for production.

## Architecture

```
Next.js App (App Router)
  ├── app/layout.tsx — Root layout with metadata
  ├── app/page.tsx — Renders the client-side App component
  ├── app/globals.css — Tailwind imports and theme tokens
  │
  ├── app/api/lookup/route.ts — POST handler (server-side)
  │     ├── Validate input (2-200 chars, valid language codes, different languages)
  │     ├── Build dynamic system prompt for the language pair
  │     ├── Call Gemini 2.5 Flash with structured output schema
  │     └── Return structured DictionaryResponse JSON
  │
  └── src/ — Client-side code ("use client")
        ├── App.tsx — Root client component: wires all components together
        ├── components/ — UI components
        ├── hooks/ — useDictionaryLookup, useSearchHistory
        └── lib/ — types, languages, prompt builder, cache, settings
```

## Project Structure

```
ponte/
├── app/
│   ├── layout.tsx             — Root layout, metadata, global CSS import
│   ├── page.tsx               — Renders the client-side App component
│   ├── globals.css            — Tailwind imports and theme tokens
│   └── api/
│       └── lookup/
│           └── route.ts       — Next.js Route Handler for dictionary lookups
├── src/
│   ├── App.tsx                — Root client component ("use client")
│   ├── components/
│   │   ├── LanguageSelector   — Dual language dropdown pair with swap
│   │   ├── SearchInput        — Search bar with debounce, clear, keyboard shortcut
│   │   ├── SearchHistory      — Recent lookups dropdown
│   │   ├── ResultPanel        — Single language result (definitions, synonyms, tags)
│   │   ├── FalseFriendBanner  — Amber warning for false cognates
│   │   ├── SpellSuggestion    — Spell correction suggestion
│   │   ├── UsageExamples      — Bilingual example sentences
│   │   └── SkeletonLoader     — Loading skeleton for result panels
│   ├── hooks/
│   │   ├── useDictionaryLookup — Debounce, cache check, API call, state
│   │   └── useSearchHistory    — Read/write/clear localStorage history
│   └── lib/
│       ├── types.ts           — All TypeScript interfaces
│       ├── languages.ts       — 30 supported languages with codes, names, flags
│       ├── prompt.ts          — Dynamic system prompt builder per language pair
│       ├── cache.ts           — IndexedDB get/set via idb-keyval
│       └── settings.ts        — localStorage helpers for pair + history
├── docs/
│   └── PRODUCT.md             — Product concept, use cases, and future ideas
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json              — Path alias: @/* → ./src/*
├── package.json
├── vercel.json
└── .env.local                 — GEMINI_API_KEY (not committed)
```

## Coding Conventions

- Always use `function` declarations, not arrow functions (except callbacks)
- No comments inside code — if documentation is needed, put it here or in a separate doc
- No unnecessary abstractions or wrappers
- Tailwind classes directly on elements, no CSS modules or styled-components
- Dark mode supported via `dark:` Tailwind variants and `prefers-color-scheme`
- Imports use the `@/*` path alias (maps to `./src/*`)
- Client components that use hooks/browser APIs must have `"use client"` directive

## Key Design Decisions

- **Next.js App Router:** Provides both frontend and API in a single project. The `/api/lookup` route handler replaces the need for separate Vercel serverless functions or a dev API server.
- **AI-first approach (free):** A single Gemini 2.5 Flash API call handles everything (language detection, translation, definitions, synonyms, false friends, spell correction). Free tier gives 1,500 requests/day and 15 RPM — more than enough for personal use.
- **Structured output:** Gemini's `responseSchema` guarantees valid JSON matching the `DictionaryResponse` type. No parsing hacks needed.
- **Dynamic system prompt:** The prompt includes the two selected language names, so it adapts to any language pair.
- **Client-side caching:** IndexedDB stores results permanently (linguistic data doesn't change). Repeated lookups are instant with no API call.
- **30 supported languages:** Portuguese, English, Spanish, French, German, Italian, Dutch, Russian, Japanese, Korean, Chinese (Simplified/Traditional), Arabic, Hindi, Turkish, Polish, Swedish, Norwegian, Danish, Finnish, Czech, Greek, Romanian, Hungarian, Ukrainian, Thai, Vietnamese, Indonesian, Malay, Hebrew.
- **Client component pattern:** The main App is a `"use client"` component since it relies heavily on browser APIs (localStorage, IndexedDB, useState). The `app/page.tsx` is a thin server component wrapper.
