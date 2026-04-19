import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI, Type } from "@google/genai"
import { buildSystemPrompt } from "@/lib/prompt"
import { LANGUAGES } from "@/lib/languages"
import type { DictionaryResponse } from "@/lib/types"

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? "" })

const validLanguageCodes = new Set(LANGUAGES.map((l) => l.code))

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    detectedLanguage: { type: Type.STRING },
    input: { type: Type.STRING },
    correctedInput: { type: Type.STRING, nullable: true },
    sourceLanguage: {
      type: Type.OBJECT,
      properties: {
        language: { type: Type.STRING },
        languageName: { type: Type.STRING },
        definitions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              partOfSpeech: { type: Type.STRING },
              meaning: { type: Type.STRING },
              examples: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["partOfSpeech", "meaning", "examples"],
          },
        },
        synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
        antonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
        relatedWords: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["language", "languageName", "definitions", "synonyms", "antonyms", "relatedWords"],
    },
    targetLanguage: {
      type: Type.OBJECT,
      properties: {
        language: { type: Type.STRING },
        languageName: { type: Type.STRING },
        translations: { type: Type.ARRAY, items: { type: Type.STRING } },
        definitions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              partOfSpeech: { type: Type.STRING },
              meaning: { type: Type.STRING },
              examples: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["partOfSpeech", "meaning", "examples"],
          },
        },
        synonyms: { type: Type.ARRAY, items: { type: Type.STRING } },
        relatedWords: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["language", "languageName", "translations", "definitions", "synonyms", "relatedWords"],
    },
    usageExamples: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING },
          translated: { type: Type.STRING },
        },
        required: ["original", "translated"],
      },
    },
    falseFriends: {
      type: Type.ARRAY,
      nullable: true,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          appearsToMean: { type: Type.STRING },
          actuallyMeans: { type: Type.STRING },
          correctTranslation: { type: Type.STRING },
        },
        required: ["word", "appearsToMean", "actuallyMeans", "correctTranslation"],
      },
    },
    existsInBothLanguages: { type: Type.BOOLEAN, nullable: true },
    pronunciation: {
      type: Type.OBJECT,
      nullable: true,
      properties: {
        source: { type: Type.STRING },
        target: { type: Type.STRING },
      },
      required: ["source", "target"],
    },
  },
  required: ["detectedLanguage", "input", "sourceLanguage", "targetLanguage", "usageExamples"],
}

export async function POST(request: NextRequest) {
  const { query, languageA, languageB } = await request.json()

  if (typeof query !== "string" || query.trim().length < 2) {
    return NextResponse.json({ error: "Query must be at least 2 characters" }, { status: 400 })
  }

  if (query.trim().length > 200) {
    return NextResponse.json({ error: "Query must be at most 200 characters" }, { status: 400 })
  }

  if (!validLanguageCodes.has(languageA) || !validLanguageCodes.has(languageB)) {
    return NextResponse.json({ error: "Invalid language codes" }, { status: 400 })
  }

  if (languageA === languageB) {
    return NextResponse.json({ error: "Languages must be different" }, { status: 400 })
  }

  try {
    const systemPrompt = buildSystemPrompt(languageA, languageB)

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: query.trim(),
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema,
      },
    })

    const text = response.text
    if (!text) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 })
    }

    const parsed: DictionaryResponse = JSON.parse(text)
    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Lookup error:", error)

    const message = error instanceof Error ? error.message : "Internal server error"

    if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        {
          error: "Rate limit reached. Please wait a few seconds and try again.",
        },
        { status: 429 },
      )
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
