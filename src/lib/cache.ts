import { get, set } from "idb-keyval"
import type { DictionaryResponse } from "./types"

const CACHE_VERSION = 2

function buildCacheKey(
  query: string,
  langA: string,
  langB: string,
): string {
  return `ponte:v${CACHE_VERSION}:${query.toLowerCase().trim()}:${langA}:${langB}`
}

export async function getCachedResult(
  query: string,
  langA: string,
  langB: string,
): Promise<DictionaryResponse | undefined> {
  const key = buildCacheKey(query, langA, langB)
  return get<DictionaryResponse>(key)
}

export async function setCachedResult(
  query: string,
  langA: string,
  langB: string,
  result: DictionaryResponse,
): Promise<void> {
  const key = buildCacheKey(query, langA, langB)
  await set(key, result)
}
