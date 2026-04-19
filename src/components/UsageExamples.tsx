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
      <div className="space-y-2">
        {examples.map((ex, i) => (
          <div key={i} className="flex gap-4 max-md:flex-col">
            <div className="flex-1 rounded-lg bg-indigo-50/50 px-3 py-2 dark:bg-indigo-950/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">{ex.original}</p>
            </div>
            <div className="flex-1 rounded-lg bg-emerald-50/50 px-3 py-2 dark:bg-emerald-950/20">
              <p className="text-sm text-gray-700 dark:text-gray-300">{ex.translated}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsageExamples
