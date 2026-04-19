import { useRef, useEffect } from "react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  isLoading: boolean
}

function SearchInput({
  value,
  onChange,
  onFocus,
  onBlur,
  isLoading,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(function setupKeyboardShortcut() {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) &&
        document.activeElement !== inputRef.current
      ) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Type a word or phrase..."
        autoFocus
        className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-20 text-lg text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20"
      />

      <div className="absolute inset-y-0 right-0 flex items-center gap-1.5 pr-3">
        {isLoading && (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
        )}

        {value && !isLoading && (
          <button
            onClick={() => onChange("")}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
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
        )}

        {!value && (
          <kbd className="hidden rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-400 sm:inline-block dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500">
            /
          </kbd>
        )}
      </div>
    </div>
  )
}

export default SearchInput
