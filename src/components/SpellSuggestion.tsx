interface SpellSuggestionProps {
  original: string
  corrected: string
  onAccept: (corrected: string) => void
}

function SpellSuggestion({
  original,
  corrected,
  onAccept,
}: SpellSuggestionProps) {
  return (
    <div className="w-full rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm dark:border-blue-800 dark:bg-blue-950/30">
      <span className="text-blue-700 dark:text-blue-300">
        Showing results for{" "}
        <button
          onClick={() => onAccept(corrected)}
          className="font-semibold underline underline-offset-2 transition-colors hover:text-blue-900 dark:hover:text-blue-100"
        >
          {corrected}
        </button>
      </span>
      <span className="text-blue-500 dark:text-blue-400">
        {" "}
        (you typed "{original}")
      </span>
    </div>
  )
}

export default SpellSuggestion
