import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import Search from './Search'

export default function Header() {
  return (
    <header className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">Docs</Link>
        <Search />
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  )
}
