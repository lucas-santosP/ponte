import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ponte - Dual Language Dictionary",
  description:
    "Type a word in any language and get instant translations, definitions, synonyms, and more in both directions.",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
