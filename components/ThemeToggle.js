import { useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('theme') || 'system' : 'system'))

  function toggle() {
    const isDark = document.documentElement.classList.toggle('dark')
    const next = isDark ? 'dark' : 'light'
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  return (
    <button data-testid="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
