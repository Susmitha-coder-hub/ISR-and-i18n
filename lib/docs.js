const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const DOCS_ROOT = path.join(process.cwd(), '_docs')

function readDoc(locale, version, slugParts) {
  const slugPath = slugParts && slugParts.length ? slugParts.join('/') : 'introduction'
  const filePath = path.join(DOCS_ROOT, locale, version, `${slugPath}.md`)
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    return { data, content, filePath: filePath.replace(process.cwd() + path.sep, '') }
  }
  return null
}

function listAllDocs() {
  const entries = []
  if (!fs.existsSync(DOCS_ROOT)) return entries
  const locales = fs.readdirSync(DOCS_ROOT)
  locales.forEach(locale => {
    const localePath = path.join(DOCS_ROOT, locale)
    if (!fs.statSync(localePath).isDirectory()) return
    const versions = fs.readdirSync(localePath)
    versions.forEach(version => {
      const versionPath = path.join(localePath, version)
      if (!fs.statSync(versionPath).isDirectory()) return
      const files = walkDir(versionPath)
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const rel = path.relative(DOCS_ROOT, file).replace(/\\/g, '/')
          const parts = rel.split('/')
          const slug = parts.slice(2).join('/').replace('.md', '')
          entries.push({ locale: parts[0], version: parts[1], slug, file })
        }
      })
    })
  })
  return entries
}

function walkDir(dir) {
  const res = []
  const items = fs.readdirSync(dir)
  items.forEach(it => {
    const full = path.join(dir, it)
    if (fs.statSync(full).isDirectory()) res.push(...walkDir(full))
    else res.push(full)
  })
  return res
}

module.exports = { readDoc, listAllDocs }
