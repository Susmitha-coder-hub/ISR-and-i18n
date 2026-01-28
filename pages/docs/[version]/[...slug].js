import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import CodeBlock from '../../../components/CodeBlock'
import TableOfContents from '../../../components/TableOfContents'
import FeedbackWidget from '../../../components/FeedbackWidget'
import VersionSelector from '../../../components/VersionSelector'
// Note: server-only modules (fs, path, lib/docs) are required inside
// getStaticPaths/getStaticProps so they are not bundled into the client.

export async function getStaticPaths() {
  const { listAllDocs } = require('../../../lib/docs')
  const all = listAllDocs()
  const paths = all.map(d => ({ params: { version: d.version, slug: d.slug ? d.slug.split('/') : ['introduction'] }, locale: d.locale }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params, locale }) {
  const { readDoc, listAllDocs } = require('../../../lib/docs')
  const path = require('path')
  const version = params.version
  const slugParts = params.slug || ['introduction']
  const doc = readDoc(locale, version, slugParts)
  if (!doc) return { notFound: true }

  // generate simple TOC
  const toc = []
  const headingRe = /^(#{2,3})\s+(.*)$/gm
  let m
  while ((m = headingRe.exec(doc.content)) !== null) {
    const level = m[1].length
    const text = m[2].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    toc.push({ id, text, level })
  }

  // list pages for sidebar for current version & locale
  const entries = listAllDocs().filter(d => d.locale === locale && d.version === version).map(e => ({ slug: e.slug || 'introduction', title: path.basename(e.file).replace('.md','') }))

  return { props: { content: doc.content, toc, filePath: doc.filePath, version, entries }, revalidate: 60 }
}

export default function DocPage({ content, toc, filePath, version, entries }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver((items) => {
      const visible = items.find(i => i.isIntersecting)
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '0px 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] })

    document.querySelectorAll('h2, h3').forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [content])

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar pages={entries} version={version} />
        <main className="p-6 flex-1">
          <div className="flex justify-between items-center">
            <VersionSelector currentVersion={version} />
            <a href={`https://github.com/your/repo/blob/main/${filePath}`}>Edit this page on GitHub</a>
          </div>
          <article data-testid="doc-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
              code: ({node, inline, className, children, ...props}) => (<CodeBlock inline={inline} className={className}>{children}</CodeBlock>),
              h2: ({node, children}) => {
                const text = children[0]
                const id = String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-')
                return <h2 id={id}>{children}</h2>
              },
              h3: ({node, children}) => {
                const text = children[0]
                const id = String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-')
                return <h3 id={id}>{children}</h3>
              }
            }}>{content}</ReactMarkdown>
          </article>

          <FeedbackWidget />
        </main>
        <aside className="w-64 p-4">
          <TableOfContents toc={toc} activeId={active} />
        </aside>
      </div>
    </div>
  )
}
