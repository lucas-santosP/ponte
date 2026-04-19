interface SpellSuggestionProps {
  original: string
  corrected: string
  onAccept: (corrected: string) => void
}

function SpellSuggestion({ original, corrected, onAccept }: SpellSuggestionProps) {
  return (
    <div className="w-full max-w-2xl rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm dark:border-blue-800 dark:bg-blue-950/30">
      <p className="text-blue-700 dark:text-blue-300">
        Did you mean &ldquo;
        <button
          onClick={() => onAccept(corrected)}
          className="cursor-pointer font-semibold underline underline-offset-2 transition-colors hover:text-blue-900 dark:hover:text-blue-100"
        >
          {corrected}
        </button>
        &rdquo;?
      </p>
      <p className="mt-0.5 text-blue-400 dark:text-blue-500">You typed &ldquo;{original}&rdquo;</p>
    </div>
  )
}

export default SpellSuggestion
