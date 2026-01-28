/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es", "fr", "de"],
    defaultLocale: "en",
    localeDetection: false
  }
  ,
  async headers() {
    return [
      {
        // apply ISR-style caching headers to docs pages
        source: '/:locale/docs/:version/:slug*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate' }
        ]
      }
    ]
  }
}
