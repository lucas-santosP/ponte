import type { LanguagePair, HistoryEntry } from "./types"

const LANGUAGE_PAIR_KEY = "ponte:language-pair"
const HISTORY_KEY = "ponte:history"
const MAX_HISTORY = 100

export function getLanguagePair(): LanguagePair {
  try {
    const stored = localStorage.getItem(LANGUAGE_PAIR_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore parse errors
  }
  return { languageA: "pt", languageB: "en" }
}

export function setLanguagePair(pair: LanguagePair): void {
  localStorage.setItem(LANGUAGE_PAIR_KEY, JSON.stringify(pair))
}

export function getHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore parse errors
  }
  return []
}

export function addHistoryEntry(entry: Omit<HistoryEntry, "timestamp">): void {
  const history = getHistory()
  const newEntry: HistoryEntry = { ...entry, timestamp: Date.now() }

  const existingIndex = history.findIndex(
    (h) =>
      h.query.toLowerCase() === entry.query.toLowerCase() &&
      h.languageA === entry.languageA &&
      h.languageB === entry.languageB,
  )

  if (existingIndex !== -1) {
    history.splice(existingIndex, 1)
  }

  history.unshift(newEntry)

  if (history.length > MAX_HISTORY) {
    history.length = MAX_HISTORY
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function removeHistoryEntry(timestamp: number): void {
  const history = getHistory().filter((h) => h.timestamp !== timestamp)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}
