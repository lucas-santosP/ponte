export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

export interface Definition {
  partOfSpeech: string
  meaning: string
  examples: string[]
}

export interface LanguageResult {
  language: string
  languageName: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
  relatedWords: string[]
}

export interface TargetLanguageResult {
  language: string
  languageName: string
  translations: string[]
  definitions: Definition[]
  synonyms: string[]
  relatedWords: string[]
}

export interface FalseFriend {
  word: string
  appearsToMean: string
  actuallyMeans: string
  correctTranslation: string
}

export interface UsageExample {
  original: string
  translated: string
}

export interface DictionaryResponse {
  detectedLanguage: string
  input: string
  correctedInput?: string
  sourceLanguage: LanguageResult
  targetLanguage: TargetLanguageResult
  usageExamples: UsageExample[]
  falseFriends?: FalseFriend[]
  existsInBothLanguages?: boolean
  pronunciation?: {
    source: string
    target: string
  }
}

export interface HistoryEntry {
  query: string
  languageA: string
  languageB: string
  detectedLanguage: string
  timestamp: number
}

export interface LanguagePair {
  languageA: string
  languageB: string
}
