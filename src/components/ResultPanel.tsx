import { useState, useCallback } from "react"
import type { Definition, LanguageResult, TargetLanguageResult } from "@/lib/types"
import type { PanelColor } from "@/components/LanguageSelector"

interface ResultPanelProps {
  data: LanguageResult | TargetLanguageResult
  isSource: boolean
  color: PanelColor
  inputWord: string
}

function isTargetResult(
  data: LanguageResult | TargetLanguageResult,
): data is TargetLanguageResult {
  return "translations" in data
}

const panelStyles: Record<PanelColor, string> = {
  indigo: "border-t-indigo-400 dark:border-t-indigo-500",
  emerald: "border-t-emerald-400 dark:border-t-emerald-500",
}

const defBorderStyles: Record<PanelColor, string> = {
  indigo: "border-indigo-300 dark:border-indigo-700",
  emerald: "border-emerald-300 dark:border-emerald-700",
}

const badgeStyles: Record<PanelColor, string> = {
  indigo:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300",
  emerald:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
}

const detectedStyles: Record<PanelColor, string> = {
  indigo:
    "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
  emerald:
    "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
}

function DefinitionItem({
  def,
  color,
}: {
  def: Definition
  color: PanelColor
}) {
  return (
    <div className={`border-l-2 pl-3 ${defBorderStyles[color]}`}>
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${badgeStyles[color]}`}
      >
        {def.partOfSpeech}
      </span>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        {def.meaning}
      </p>
      {def.examples.length > 0 && (
        <ul className="mt-1.5 space-y-0.5">
          {def.examples.map((ex, i) => (
            <li
              key={i}
              className="text-xs text-gray-500 italic dark:text-gray-400"
            >
              &ldquo;{ex}&rdquo;
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function TagList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null

  return (
    <div>
      <h4 className="mb-1.5 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
        {label}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function CopyableHeading({
  word,
  label,
  color,
  alternatives,
}: {
  word: string
  label: string
  color: PanelColor
  alternatives: string[]
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(
    function copyWord() {
      navigator.clipboard.writeText(word).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      })
    },
    [word],
  )

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopy}
          className="group flex items-center gap-1.5 text-2xl font-bold text-gray-900 transition-colors hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
          title="Click to copy"
        >
          {word}
          <span className="text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-600">
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 dark:text-emerald-400">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </span>
        </button>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${detectedStyles[color]}`}
        >
          {label}
        </span>
      </div>
      {alternatives.length > 0 && (
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          also: {alternatives.join(", ")}
        </p>
      )}
    </div>
  )
}

function ResultPanel({ data, isSource, color, inputWord }: ResultPanelProps) {
  const isTarget = isTargetResult(data)
  const headingWord = isTarget
    ? data.translations[0] ?? inputWord
    : inputWord
  const alternativeTranslations = isTarget ? data.translations.slice(1) : []

  return (
    <div
      className={`flex flex-1 flex-col rounded-xl border border-gray-200 border-t-4 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${panelStyles[color]}`}
    >
      <CopyableHeading
        word={headingWord}
        label={isSource ? "source" : "translation"}
        color={color}
        alternatives={alternativeTranslations}
      />

      {data.definitions.length > 0 && (
        <div className="mb-4 space-y-3">
          <h4 className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Definitions
          </h4>
          {data.definitions.map((def, i) => (
            <DefinitionItem key={i} def={def} color={color} />
          ))}
        </div>
      )}

      <div className="mt-auto space-y-3">
        <TagList label="Synonyms" items={data.synonyms} />
        {"antonyms" in data && (
          <TagList label="Antonyms" items={(data as LanguageResult).antonyms} />
        )}
        <TagList label="Related" items={data.relatedWords} />
      </div>
    </div>
  )
}

export default ResultPanel
