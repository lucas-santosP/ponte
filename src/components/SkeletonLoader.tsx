function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
    />
  )
}

function SkeletonPanel() {
  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <SkeletonBlock className="mb-4 h-5 w-24" />
      <SkeletonBlock className="mb-6 h-8 w-48" />

      <div className="mb-4 space-y-2">
        <SkeletonBlock className="h-4 w-16" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
      </div>

      <div className="mb-4 space-y-2">
        <SkeletonBlock className="h-4 w-20" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-7 w-16 rounded-full" />
          <SkeletonBlock className="h-7 w-20 rounded-full" />
          <SkeletonBlock className="h-7 w-14 rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
      </div>
    </div>
  )
}

function SkeletonLoader() {
  return (
    <div className="flex w-full gap-4 max-md:flex-col">
      <SkeletonPanel />
      <SkeletonPanel />
    </div>
  )
}

export default SkeletonLoader
