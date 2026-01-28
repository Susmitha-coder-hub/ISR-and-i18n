const http = require('http')

function get(url){
  return new Promise((resolve,reject)=>{
    http.get(url, res => {
      let body = ''
      res.on('data', c => body += c)
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body }))
    }).on('error', reject)
  })
}

async function run(){
  for(let i=0;i<20;i++){
    try{
      const r = await get('http://localhost:3000/en/docs/v1/introduction')
      console.log('STATUS', r.statusCode)
      console.log('CACHE', r.headers['cache-control'] || '(none)')
      console.log('DOC_CONTENT', r.body.includes('data-testid="doc-content"') ? 'present' : 'missing')
      console.log('SEARCH_INPUT', r.body.includes('data-testid="search-input"') ? 'present' : 'missing')

      const a = await get('http://localhost:3000/api-reference')
      console.log('API_SWAGGER', a.body.includes('swagger-ui') ? 'present' : 'missing')
      return
    }catch(e){
      await new Promise(r=>setTimeout(r,1000))
    }
  }
  console.error('ERROR: server not responding after retries')
  process.exit(1)
}

run()
