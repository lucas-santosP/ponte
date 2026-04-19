import type { UsageExample } from "@/lib/types"

interface UsageExamplesProps {
  examples: UsageExample[]
}

function UsageExamples({ examples }: UsageExamplesProps) {
  if (examples.length === 0) return null

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h4 className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
        Usage Examples
      </h4>
      <div className="space-y-3">
        {examples.map((ex, i) => (
          <div
            key={i}
            className="grid grid-cols-1 gap-1 rounded-lg bg-gray-50 p-3 sm:grid-cols-2 sm:gap-4 dark:bg-gray-850"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {ex.original}
            </p>
            <p className="text-sm text-gray-500 italic dark:text-gray-400">
              {ex.translated}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsageExamples
