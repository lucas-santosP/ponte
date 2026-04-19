import { useState, useEffect } from "react"

type Theme = "light" | "dark"

const THEME_KEY = "ponte:theme"

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(function initTheme() {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === "light" || stored === "dark") {
      setTheme(stored)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
    setMounted(true)
  }, [])

  useEffect(
    function applyTheme() {
      if (!mounted) return
      document.documentElement.classList.toggle("dark", theme === "dark")
      localStorage.setItem(THEME_KEY, theme)
    },
    [theme, mounted],
  )

  function toggle() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return { theme, toggle, mounted }
}
