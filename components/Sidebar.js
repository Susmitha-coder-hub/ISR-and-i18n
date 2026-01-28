import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar({ pages, version }) {
  const router = useRouter()
  const { locale } = router

  return (
    <aside data-testid="sidebar" className="w-64 border-r p-4">
      <ul>
        {pages.map(p => (
          <li key={p.slug}>
            <Link href={`/${locale}/docs/${version}/${p.slug}`} data-testid={`sidebar-nav-link-${p.slug}`}>{p.title || p.slug}</Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
