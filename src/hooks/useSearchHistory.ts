import { useState, useCallback } from "react"
import type { HistoryEntry } from "@/lib/types"
import { getHistory, addHistoryEntry, removeHistoryEntry, clearHistory as clearStoredHistory } from "@/lib/settings"

interface UseSearchHistoryReturn {
  history: HistoryEntry[]
  addEntry: (entry: Omit<HistoryEntry, "timestamp">) => void
  removeEntry: (timestamp: number) => void
  clearAll: () => void
  refresh: () => void
}

export function useSearchHistory(): UseSearchHistoryReturn {
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory)

  const refresh = useCallback(function refreshHistory() {
    setHistory(getHistory())
  }, [])

  const addEntry = useCallback(function addToHistory(entry: Omit<HistoryEntry, "timestamp">) {
    addHistoryEntry(entry)
    setHistory(getHistory())
  }, [])

  const removeEntry = useCallback(function removeFromHistory(timestamp: number) {
    removeHistoryEntry(timestamp)
    setHistory(getHistory())
  }, [])

  const clearAll = useCallback(function clearAllHistory() {
    clearStoredHistory()
    setHistory([])
  }, [])

  return { history, addEntry, removeEntry, clearAll, refresh }
}
