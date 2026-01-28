import { useRef } from 'react'

export default function CodeBlock({ inline, className, children }) {
  const codeRef = useRef()
  const text = String(children).replace(/\n$/, '')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied')
    } catch (e) {
      console.error(e)
    }
  }

  if (inline) return <code>{children}</code>

  return (
    <div data-testid="code-block" className="relative">
      <button data-testid="copy-code-button" onClick={copy} style={{ position: 'absolute', right: 8, top: 8 }}>Copy</button>
      <pre ref={codeRef} className={className}><code>{text}</code></pre>
    </div>
  )
}
