export default function TableOfContents({ toc, activeId }) {
  return (
    <nav data-testid="table-of-contents">
      <ul>
        {toc.map(h => (
          <li key={h.id}>
            <a data-testid={`toc-link-${h.id}`} href={`#${h.id}`} data-active={activeId === h.id ? 'true' : 'false'}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
