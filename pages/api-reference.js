import dynamic from 'next/dynamic'
import Header from '../components/Header'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })
import 'swagger-ui-react/swagger-ui.css'

export default function ApiReference() {
  return (
    <div>
      <Header />
      <div className="p-6">
        <h1>API Reference</h1>
        <div>
          <SwaggerUI url="/openapi.json" />
        </div>
      </div>
    </div>
  )
}
