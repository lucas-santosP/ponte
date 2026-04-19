import type { HistoryEntry } from "@/lib/types"
import { getLanguageByCode } from "@/lib/languages"

interface SearchHistoryProps {
  history: HistoryEntry[]
  onSelect: (entry: HistoryEntry) => void
  onRemove: (timestamp: number) => void
  onClearAll: () => void
}

function formatTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function SearchHistory({ history, onSelect, onRemove, onClearAll }: SearchHistoryProps) {
  if (history.length === 0) return null

  return (
    <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 dark:border-gray-700">
        <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Recent lookups</span>
        <button
          onMouseDown={(e) => {
            e.preventDefault()
            onClearAll()
          }}
          className="text-xs text-gray-400 transition-colors hover:text-red-500"
        >
          Clear all
        </button>
      </div>

      {history.map((entry) => {
        const langA = getLanguageByCode(entry.languageA)
        const langB = getLanguageByCode(entry.languageB)
        const detected = getLanguageByCode(entry.detectedLanguage)

        return (
          <div
            key={entry.timestamp}
            className="group flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-850"
            onMouseDown={(e) => {
              e.preventDefault()
              onSelect(entry)
            }}
          >
            <span className="text-sm">{detected?.flag ?? ""}</span>
            <span className="flex-1 truncate text-sm font-medium text-gray-700 dark:text-gray-200">{entry.query}</span>
            <span className="text-xs text-gray-400">
              {langA?.flag} {langB?.flag}
            </span>
            <span className="text-xs text-gray-400">{formatTime(entry.timestamp)}</span>
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onRemove(entry.timestamp)
              }}
              className="invisible text-gray-300 transition-colors hover:text-red-500 group-hover:visible dark:text-gray-500"
              aria-label="Remove from history"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default SearchHistory
