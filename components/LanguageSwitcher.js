import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locales, locale, asPath } = router

  return (
    <div data-testid="language-switcher">
      {locales.map(l => (
        <Link key={l} href={asPath} locale={l} style={{ marginRight: 8 }}>{l.toUpperCase()}</Link>
      ))}
    </div>
  )
}
