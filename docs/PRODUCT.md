# Ponte — Product Document

## The Problem

If you're bilingual, you live between two languages. Throughout the day you constantly need quick lookups — "what's this word in English?", "what does this Portuguese word mean exactly?", "is there a better synonym?". The tools that exist (Google Translate, DeepL) are built for translating blocks of text, not for exploring words. Every single time you open Google Translate you have to:

1. Check if the source/target languages are set correctly
2. Swap them if they're wrong
3. Type the word
4. Get a flat translation with no depth

This is death by a thousand paper cuts. When you think in two languages interchangeably, you don't want to tell a tool which direction you're going — you just want to type and get the answer.

## The Idea

**Ponte** (Portuguese for "bridge") is a dual-language dictionary that eliminates the language-switching friction entirely. You pick your two languages once, type a word or phrase in either one, and the app instantly shows you rich results for both sides:

- **Left panel:** The source language — definitions, part of speech, synonyms, antonyms, related words, usage examples
- **Right panel:** The target language — translations, definitions of the translated word, synonyms, related words

The app auto-detects which language you typed in. No toggle, no swap, no dropdown every time. Just type.

## What Makes Ponte Different

| Existing tools | Ponte |
|---|---|
| You pick source → target every time | You pick once, type in either language |
| Flat translation output | Rich dual-pane: definitions + synonyms + examples on both sides |
| No false friend warnings | Warns you about words that look similar but mean different things |
| No spell correction in context | Suggests corrections considering both languages |
| Built for translating paragraphs | Built for exploring individual words and short phrases |

## Target User

Anyone who is bilingual or actively learning a second language and needs frequent, quick word lookups during their day — while working, reading, writing, or studying. The default pair is Portuguese and English, but the app supports 30 languages and any combination of two.

---

## Use Cases

### UC-1: Basic Word Lookup

The core flow. The user types a word and gets full linguistic information in both languages.

**Example:** User types "saudade" (Portuguese)
- **Left panel (Portuguese):** Noun. A deep emotional state of nostalgic longing for something or someone absent. Synonyms: nostalgia, melancolia, anoranza. Examples: "Sinto saudade dos tempos de escola."
- **Right panel (English):** Translations: longing, nostalgia, yearning. Definition of "longing": a strong, persistent desire or craving. Synonyms: yearning, pining, ache. Examples: "I feel a longing for my school days."

**Example:** User types "resilience" (English)
- **Left panel (English):** Noun. The capacity to withstand or recover quickly from difficulties. Synonyms: toughness, adaptability, grit.
- **Right panel (Portuguese):** Translations: resiliencia. Definition, synonyms in Portuguese, examples.

### UC-2: Phrase and Expression Lookup

Works with multi-word expressions and idioms, not just single words.

**Example:** User types "break the ice"
- **Left panel (English):** Idiomatic expression meaning to initiate conversation in an awkward social situation. Literal meaning: to physically break ice.
- **Right panel (Portuguese):** Equivalent expression: "quebrar o gelo". Same idiom exists in Portuguese. Usage examples in both languages.

**Example:** User types "ficar de molho"
- **Left panel (Portuguese):** Informal expression meaning to rest or stay put, usually due to illness or recovery. Literal meaning: to soak.
- **Right panel (English):** Translation: "to rest up", "to take it easy", "to lie low". No direct equivalent idiom — contextual translation provided.

### UC-3: Misspelled Word Correction

When the user types a misspelled word, the app suggests corrections considering both languages.

**Example:** User types "resilense"
- A blue banner appears: **Showing results for "resilience"** (you typed "resilense")
- The user can click "resilience" to confirm, or keep typing
- Results are shown for the corrected word immediately

**Example:** User types "comprimisso"
- Suggests: "compromisso" (Portuguese for commitment/appointment)
- If the typo is ambiguous between both languages, both suggestions appear

### UC-4: False Friend / Cognate Warning

False friends are words that look similar between two languages but have completely different meanings. This is one of the most common traps for bilingual speakers. Ponte detects them and shows a prominent warning.

**Example:** User types "pretend" (English)
- English panel shows the definition: to act as if something is true when it is not
- Portuguese panel shows the translation: "fingir"
- **Amber warning banner:** "False friend: 'pretender' in Portuguese does NOT mean 'to pretend' — it means 'to intend' or 'to plan'. The correct Portuguese translation of 'pretend' is 'fingir'."

**Example:** User types "actual" (English)
- Translation to Portuguese: "real", "verdadeiro"
- **Warning:** "'Atual' in Portuguese does NOT mean 'actual' — it means 'current' or 'present-day'. The correct Portuguese translation of 'actual' is 'real'."

**Common PT-EN false friends this catches:**
- "pretender" (PT: to intend) vs "pretend" (EN: to fake)
- "atual" (PT: current) vs "actual" (EN: real)
- "costume" (PT: habit/custom) vs "costume" (EN: clothing/disguise)
- "puxar" (PT: to pull) vs "push" (EN: to push)
- "pasta" (PT: folder/briefcase) vs "pasta" (EN: food)
- "compromisso" (PT: commitment) vs "compromise" (EN: mutual concession)
- "fabric" (EN: cloth) vs "fabrica" (PT: factory)
- "sensible" (EN: reasonable) vs "sensivel" (PT: sensitive)

### UC-5: Same Word in Both Languages (Homograph)

Some words are spelled identically in both languages but may have different or identical meanings.

**Example:** User types "pasta"
- A purple info banner appears: "This word exists in both languages with potentially different meanings."
- **Left panel (Portuguese):** Noun. 1. Folder, briefcase. 2. Paste, dough. "Coloque o documento na pasta."
- **Right panel (English):** Noun. A dish of Italian origin made from dough. "I ordered pasta for dinner."

**Example:** User types "hospital"
- Both panels show the same meaning (medical facility)
- A subtle indicator: "Same meaning in both languages" (cognate)

### UC-6: Search History

Every lookup is saved locally so the user can revisit previous words without re-typing.

**Flow:**
- Click the search input when it's empty (or focus it)
- A dropdown appears with recent lookups, most recent first
- Each entry shows: the word, a flag for the detected language, the language pair used, and how long ago
- Click an entry to re-perform the lookup (instant if cached)
- Each entry has an "X" button to remove it individually
- A "Clear all" button at the top removes the entire history
- Maximum 100 entries, oldest are evicted first
- If the same word is looked up again, it moves to the top instead of duplicating

### UC-7: Language Pair Selection

The user picks any two languages from the supported list. The pair is saved and persists across sessions.

**Flow:**
- Two dropdown selectors in the header — one for each language
- A swap button between them to quickly flip the pair
- Default: Portuguese and English
- Changing a language clears current results (since they're for a different pair)
- If the user selects the same language for both sides, it automatically swaps instead

**Supported languages (30):**
Portuguese, English, Spanish, French, German, Italian, Dutch, Russian, Japanese, Korean, Chinese (Simplified), Chinese (Traditional), Arabic, Hindi, Turkish, Polish, Swedish, Norwegian, Danish, Finnish, Czech, Greek, Romanian, Hungarian, Ukrainian, Thai, Vietnamese, Indonesian, Malay, Hebrew

### UC-8: Empty / Minimal Input

The app waits for meaningful input before making an API call.

- Single characters: nothing happens (no API call, no loading state)
- Two-letter words like "eu", "me", "do", "go": valid, looked up normally
- Debounce of 400ms: the app waits for the user to stop typing before sending the request
- Empty state shows a bridge emoji and "Type a word to bridge languages"

### UC-9: Unknown Word / No Results

When the input isn't a word in either language and can't be corrected.

**Example:** User types "xkzqwm"
- The app shows: "No results found"
- If the AI can suggest any remotely plausible words, it shows them
- Otherwise, a clean message: "Try typing a word in either of your selected languages"

---

## Edge Cases and Smart Behaviors

- **Caching:** Every successful lookup is cached in IndexedDB (keyed by query + language pair). Repeated lookups are instant with zero network requests. The cache persists across browser sessions.
- **Keyboard shortcut:** Press `/` or `Ctrl+K` from anywhere on the page to focus the search input.
- **Responsive layout:** On mobile, the two result panels stack vertically. On desktop, they sit side by side.
- **Dark mode:** Follows the system preference automatically via Tailwind's `dark:` variants.

---

## Future Ideas (Not in MVP)

- **Favorites / saved words:** Star words to save them, review later like flashcards
- **Audio pronunciation:** Use browser SpeechSynthesis API to hear the word in both languages
- **PWA:** Make the app installable for quick access from desktop/phone home screen
- **Keyboard navigation:** Arrow keys to navigate history, Enter to select
- **Pre-cached common words:** Batch-process the top 5,000 words in each language to eliminate API latency for common lookups
- **Conjugation tables:** For verbs, show full conjugation in both languages
- **Word of the day:** Surface an interesting word or false friend on the empty state
