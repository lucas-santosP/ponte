"use client"

import { useState, useEffect, useCallback } from "react"
import LanguageSelector from "@/components/LanguageSelector"
import SearchInput from "@/components/SearchInput"
import SearchHistory from "@/components/SearchHistory"
import ResultPanel from "@/components/ResultPanel"
import FalseFriendBanner from "@/components/FalseFriendBanner"
import SpellSuggestion from "@/components/SpellSuggestion"
import UsageExamples from "@/components/UsageExamples"
import ThemeToggle from "@/components/ThemeToggle"
import { useDictionaryLookup } from "@/hooks/useDictionaryLookup"
import { useSearchHistory } from "@/hooks/useSearchHistory"
import { useTheme } from "@/hooks/useTheme"
import { getLanguagePair, setLanguagePair } from "@/lib/settings"
import type { LanguagePair, HistoryEntry } from "@/lib/types"

function App() {
  const [pair, setPair] = useState<LanguagePair>(getLanguagePair)
  const [query, setQuery] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const { theme, toggle: toggleTheme, mounted } = useTheme()

  const { result, isLoading, error, lookup } = useDictionaryLookup({
    languageA: pair.languageA,
    languageB: pair.languageB,
  })

  const { history, addEntry, removeEntry, clearAll } = useSearchHistory()

  function updatePair(newPair: LanguagePair) {
    setPair(newPair)
    setLanguagePair(newPair)
  }

  function handleSwap() {
    updatePair({ languageA: pair.languageB, languageB: pair.languageA })
  }

  function handleChangeA(code: string) {
    updatePair({ ...pair, languageA: code })
  }

  function handleChangeB(code: string) {
    updatePair({ ...pair, languageB: code })
  }

  const handleQueryChange = useCallback(
    function onQueryChange(value: string) {
      setQuery(value)
      lookup(value)
    },
    [lookup],
  )

  useEffect(
    function saveToHistoryOnResult() {
      if (result && query.trim().length >= 2) {
        addEntry({
          query: query.trim(),
          languageA: pair.languageA,
          languageB: pair.languageB,
          detectedLanguage: result.detectedLanguage,
        })
      }
    },
    [result],
  )

  function handleHistorySelect(entry: HistoryEntry) {
    if (entry.languageA !== pair.languageA || entry.languageB !== pair.languageB) {
      updatePair({
        languageA: entry.languageA,
        languageB: entry.languageB,
      })
    }
    setQuery(entry.query)
    lookup(entry.query)
    setShowHistory(false)
  }

  const sourceData = result?.detectedLanguage === pair.languageA ? result.sourceLanguage : result?.targetLanguage
  const targetData = result?.detectedLanguage === pair.languageA ? result.targetLanguage : result?.sourceLanguage

  return (
    <div className="flex min-h-svh flex-col bg-gray-50 dark:bg-gray-950">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
        <div className="relative mx-auto flex max-w-5xl items-center justify-center px-4 py-3">
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <img src="/logo.png" alt="" width={28} height={28} />
            <span className="text-indigo-600 dark:text-indigo-400">Ponte</span>
          </h1>

          {mounted && (
            <div className="absolute right-3">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-4 px-4 py-8">
        <div className="relative w-full max-w-2xl">
          <SearchInput
            value={query}
            onChange={handleQueryChange}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            isLoading={isLoading}
          />
          {showHistory && !query && (
            <SearchHistory
              history={history}
              onSelect={handleHistorySelect}
              onRemove={removeEntry}
              onClearAll={clearAll}
            />
          )}
        </div>

        {result?.correctedInput && (
          <SpellSuggestion original={result.input} corrected={result.correctedInput} onAccept={handleQueryChange} />
        )}

        <div className="flex w-full gap-4 max-md:flex-col">
          <div className="flex flex-1 flex-col gap-4">
            <LanguageSelector
              value={pair.languageA}
              otherValue={pair.languageB}
              onChange={handleChangeA}
              onSwap={handleSwap}
              color="indigo"
            />
            {isLoading && !result && (
              <div className="flex-1 rounded-xl border border-gray-200 border-t-4 border-t-indigo-400 bg-white p-6 dark:border-gray-700 dark:border-t-indigo-500 dark:bg-gray-800">
                <div className="animate-pulse space-y-4">
                  <div className="h-5 w-24 rounded-md bg-indigo-100 dark:bg-indigo-900/30" />
                  <div className="h-8 w-48 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            )}
            {result && sourceData && (
              <ResultPanel
                data={sourceData}
                isSource={sourceData.language === result.detectedLanguage}
                color="indigo"
                inputWord={result.correctedInput ?? result.input}
              />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <LanguageSelector
              value={pair.languageB}
              otherValue={pair.languageA}
              onChange={handleChangeB}
              onSwap={handleSwap}
              color="emerald"
            />
            {isLoading && !result && (
              <div className="flex-1 rounded-xl border border-gray-200 border-t-4 border-t-emerald-400 bg-white p-6 dark:border-gray-700 dark:border-t-emerald-500 dark:bg-gray-800">
                <div className="animate-pulse space-y-4">
                  <div className="h-5 w-24 rounded-md bg-emerald-100 dark:bg-emerald-900/30" />
                  <div className="h-8 w-48 rounded-md bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            )}
            {result && targetData && (
              <ResultPanel
                data={targetData}
                isSource={targetData.language === result.detectedLanguage}
                color="emerald"
                inputWord={result.correctedInput ?? result.input}
              />
            )}
          </div>
        </div>

        {error && (
          <div className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {result && (
          <>
            {result.existsInBothLanguages && (
              <div className="w-full rounded-lg border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm text-purple-700 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-300">
                This word exists in both languages with potentially different meanings.
              </div>
            )}

            {result.falseFriends && result.falseFriends.length > 0 && (
              <FalseFriendBanner falseFriends={result.falseFriends} />
            )}

            {result.usageExamples.length > 0 && <UsageExamples examples={result.usageExamples} />}
          </>
        )}

        {!result && !isLoading && !error && query.length < 2 && (
          <div className="mt-16 text-center">
            <img src="/logo.png" alt="" width={64} height={64} className="mx-auto" />
            <p className="mt-3 text-lg font-medium text-gray-400 dark:text-gray-500">Type a word to bridge languages</p>
            <p className="mt-1 text-sm text-gray-300 dark:text-gray-600">
              Works with any word in either of your selected languages
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
