import type { Language } from "./types"

export const LANGUAGES: Language[] = [
  { code: "pt", name: "Portuguese", nativeName: "Portugues", flag: "\ud83c\udde7\ud83c\uddf7" },
  { code: "en", name: "English", nativeName: "English", flag: "\ud83c\uddfa\ud83c\uddf8" },
  { code: "es", name: "Spanish", nativeName: "Espanol", flag: "\ud83c\uddea\ud83c\uddf8" },
  { code: "fr", name: "French", nativeName: "Francais", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1" },
  { code: "ru", name: "Russian", nativeName: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "\ud83c\uddf7\ud83c\uddfa" },
  { code: "ja", name: "Japanese", nativeName: "\u65e5\u672c\u8a9e", flag: "\ud83c\uddef\ud83c\uddf5" },
  { code: "ko", name: "Korean", nativeName: "\ud55c\uad6d\uc5b4", flag: "\ud83c\uddf0\ud83c\uddf7" },
  { code: "zh", name: "Chinese (Simplified)", nativeName: "\u7b80\u4f53\u4e2d\u6587", flag: "\ud83c\udde8\ud83c\uddf3" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "\u7e41\u9ad4\u4e2d\u6587", flag: "\ud83c\uddf9\ud83c\uddfc" },
  { code: "ar", name: "Arabic", nativeName: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\ud83c\uddf8\ud83c\udde6" },
  { code: "hi", name: "Hindi", nativeName: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "\ud83c\uddee\ud83c\uddf3" },
  { code: "tr", name: "Turkish", nativeName: "Turkce", flag: "\ud83c\uddf9\ud83c\uddf7" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "\ud83c\uddf5\ud83c\uddf1" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "\ud83c\uddf8\ud83c\uddea" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "\ud83c\uddf3\ud83c\uddf4" },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "\ud83c\udde9\ud83c\uddf0" },
  { code: "fi", name: "Finnish", nativeName: "Suomi", flag: "\ud83c\uddeb\ud83c\uddee" },
  { code: "cs", name: "Czech", nativeName: "Cestina", flag: "\ud83c\udde8\ud83c\uddff" },
  { code: "el", name: "Greek", nativeName: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac", flag: "\ud83c\uddec\ud83c\uddf7" },
  { code: "ro", name: "Romanian", nativeName: "Romana", flag: "\ud83c\uddf7\ud83c\uddf4" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar", flag: "\ud83c\udded\ud83c\uddfa" },
  { code: "uk", name: "Ukrainian", nativeName: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", flag: "\ud83c\uddfa\ud83c\udde6" },
  { code: "th", name: "Thai", nativeName: "\u0e44\u0e17\u0e22", flag: "\ud83c\uddf9\ud83c\udded" },
  { code: "vi", name: "Vietnamese", nativeName: "Tieng Viet", flag: "\ud83c\uddfb\ud83c\uddf3" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "\ud83c\uddee\ud83c\udde9" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "\ud83c\uddf2\ud83c\uddfe" },
  { code: "he", name: "Hebrew", nativeName: "\u05e2\u05d1\u05e8\u05d9\u05ea", flag: "\ud83c\uddee\ud83c\uddf1" },
]

export function getLanguageByCode(code: string): Language | undefined {
  return LANGUAGES.find((l) => l.code === code)
}
