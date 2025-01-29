export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
        }
      ],
      sitemap: 'https://cgrigoriadis.info/sitemap.xml',
      host: 'https://cgrigoriadis.info'
    }
  }