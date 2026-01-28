import { useRouter } from 'next/router'

export default function VersionSelector({ currentVersion }) {
  const router = useRouter()
  const { locale, asPath } = router

  const change = (v) => {
    const newPath = asPath.replace(`/${currentVersion}/`, `/${v}/`)
    router.push(newPath)
  }

  return (
    <div>
      <button data-testid="version-selector">Version: {currentVersion}</button>
      <div>
        <button data-testid="version-option-v1" onClick={() => change('v1')}>v1</button>
        <button data-testid="version-option-v2" onClick={() => change('v2')}>v2</button>
        <button data-testid="version-option-v3" onClick={() => change('v3')}>v3</button>
      </div>
    </div>
  )
}
