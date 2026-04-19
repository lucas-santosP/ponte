import { LANGUAGES } from "@/lib/languages"

export type PanelColor = "indigo" | "emerald"

interface LanguageSelectorProps {
  value: string
  otherValue: string
  onChange: (code: string) => void
  onSwap: () => void
  color: PanelColor
}

const colorStyles: Record<PanelColor, string> = {
  indigo:
    "border-indigo-200 bg-indigo-50/50 hover:border-indigo-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-indigo-800 dark:bg-indigo-950/30 dark:hover:border-indigo-700",
  emerald:
    "border-emerald-200 bg-emerald-50/50 hover:border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/20 dark:border-emerald-800 dark:bg-emerald-950/30 dark:hover:border-emerald-700",
}

function LanguageSelector({
  value,
  otherValue,
  onChange,
  onSwap,
  color,
}: LanguageSelectorProps) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value
    if (code === otherValue) {
      onSwap()
    } else {
      onChange(code)
    }
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`w-full rounded-xl border px-4 py-3 text-base font-semibold text-gray-700 shadow-sm transition-colors focus:ring-2 focus:outline-none dark:text-gray-200 ${colorStyles[color]}`}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
