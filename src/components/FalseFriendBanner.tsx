import type { FalseFriend } from "@/lib/types"

interface FalseFriendBannerProps {
  falseFriends: FalseFriend[]
}

function FalseFriendBanner({ falseFriends }: FalseFriendBannerProps) {
  if (falseFriends.length === 0) return null

  return (
    <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-700/50 dark:bg-amber-950/30">
      <div className="mb-2 flex items-center gap-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-600 dark:text-amber-400"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-300">False Friend Alert</h4>
      </div>
      <div className="space-y-2">
        {falseFriends.map((ff, i) => (
          <p key={i} className="text-sm text-amber-800 dark:text-amber-200">
            <strong>"{ff.word}"</strong> looks like it means <em>"{ff.appearsToMean}"</em>, but it actually means{" "}
            <em>"{ff.actuallyMeans}"</em>.
            {ff.correctTranslation && (
              <span>
                {" "}
                The correct translation is <strong>"{ff.correctTranslation}"</strong>.
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  )
}

export default FalseFriendBanner
