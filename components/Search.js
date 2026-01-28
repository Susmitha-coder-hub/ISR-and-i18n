import { useState, useEffect } from 'react'
import FlexSearch from 'flexsearch'

export default function Search() {
  const [idx, setIdx] = useState(null)
  const [data, setData] = useState([])
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('/search-index.json').then(r => r.json()).then(js => {
      const index = new FlexSearch.Index({ tokenize: 'forward', cache: true })
      js.forEach((d, i) => index.add(i, d.content))
      setIdx(index)
      setData(js)
    })
  }, [])

  useEffect(() => {
    if (!idx || !q) return setResults([])
    const ids = idx.search(q, 10)
    setResults(ids.map(i => data[i]))
  }, [q, idx, data])

  return (
    <div>
      <input data-testid="search-input" value={q} onChange={e => setQ(e.target.value)} placeholder="Search docs" />
      <div data-testid="search-results">
        {results.length ? results.map((r, i) => <div key={i}>{r.title}</div>) : (q ? <div data-testid="search-no-results">No results</div> : null)}
      </div>
    </div>
  )
}
