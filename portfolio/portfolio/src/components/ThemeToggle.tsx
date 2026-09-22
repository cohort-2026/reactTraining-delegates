import { useState } from 'react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )

  function toggle() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // storage unavailable, the toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="rounded-md border border-red-300 px-3 py-1.5 font-mono text-xs transition hover:border-red-600 dark:border-red-800 dark:hover:border-red-500"
    >
      {isDark ? '☀ Light' : '☾ Dark'}
    </button>
  )
}

export default ThemeToggle