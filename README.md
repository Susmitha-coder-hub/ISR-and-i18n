# Next.js Multi-Language Documentation Site (ISR + i18n)

This repo contains a minimal Next.js documentation portal implementing:
- Incremental Static Regeneration (revalidate: 60)
- Internationalization (en, es, fr, de) via Next.js i18n
- Client-side full-text search using FlexSearch with a static index
- Swagger UI rendering from `public/openapi.json`
- Dockerized with `Dockerfile` and `docker-compose.yml`

Quick start

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Or with Docker:

```bash
docker-compose up --build
```

Notes
- Documentation markdown files live in `_docs/{locale}/{version}`.
- Pages are available under `/en/docs/v1/introduction`, `/es/docs/v1/introduction`, etc.
- The docs pages use ISR with `revalidate: 60`.
