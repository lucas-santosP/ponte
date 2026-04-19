import { useState, useEffect, useRef, useCallback } from "react"
import type { DictionaryResponse } from "@/lib/types"
import { getCachedResult, setCachedResult } from "@/lib/cache"

interface UseDictionaryLookupOptions {
  languageA: string
  languageB: string
  debounceMs?: number
}

interface UseDictionaryLookupReturn {
  result: DictionaryResponse | null
  isLoading: boolean
  error: string | null
  lookup: (query: string) => void
}

export function useDictionaryLookup({
  languageA,
  languageB,
  debounceMs = 400,
}: UseDictionaryLookupOptions): UseDictionaryLookupReturn {
  const [result, setResult] = useState<DictionaryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(function cleanupOnUnmount() {
    return () => {
      abortControllerRef.current?.abort()
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [])

  const lookup = useCallback(
    function performLookup(query: string) {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
      abortControllerRef.current?.abort()

      const trimmed = query.trim()

      if (trimmed.length < 2) {
        setResult(null)
        setError(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      debounceTimerRef.current = setTimeout(async () => {
        try {
          const cached = await getCachedResult(trimmed, languageA, languageB)
          if (cached) {
            setResult(cached)
            setIsLoading(false)
            return
          }

          const controller = new AbortController()
          abortControllerRef.current = controller

          const response = await fetch("/api/lookup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: trimmed,
              languageA,
              languageB,
            }),
            signal: controller.signal,
          })

          if (!response.ok) {
            const body = await response.json().catch(() => ({}))
            throw new Error(body.error ?? `Request failed with status ${response.status}`)
          }

          const data: DictionaryResponse = await response.json()
          setResult(data)

          await setCachedResult(trimmed, languageA, languageB, data).catch(() => {})
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") return
          setError(err instanceof Error ? err.message : "Something went wrong")
          setResult(null)
        } finally {
          setIsLoading(false)
        }
      }, debounceMs)
    },
    [languageA, languageB, debounceMs],
  )

  return { result, isLoading, error, lookup }
}
