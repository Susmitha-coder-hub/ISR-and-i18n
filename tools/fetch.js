const http = require('http')

const url = 'http://localhost:3000/en/docs/v1/introduction'

http.get(url, (res) => {
  console.log('STATUS', res.statusCode)
  console.log('CACHE', res.headers['cache-control'] || '(none)')
  let body = ''
  res.on('data', c => body += c)
  res.on('end', () => {
    console.log('DOCCONTENT', body.includes('data-testid="doc-content"') ? 'present' : 'missing')
    console.log('SEARCH_INPUT', body.includes('data-testid="search-input"') ? 'present' : 'missing')
  })
}).on('error', (err) => {
  console.error('ERR', err.message)
  process.exit(1)
})
