import { renderToStaticMarkup } from 'react-dom/server';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from './consts';
import type { Route } from './routes';

const escapeHtml = (s: string) =>
  s.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

export function renderPage(route: Route, { css, js }: { css: string; js?: string }): string {
  const title = escapeHtml(route.meta?.title ?? SITE_TITLE);
  const description = escapeHtml(route.meta?.description ?? SITE_DESCRIPTION);
  const url = `${SITE_URL}${route.path === '/' ? '/' : `${route.path}/`}`;

  const app = renderToStaticMarkup(route.element);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link rel="canonical" href="${url}" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(SITE_TITLE)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <link rel="preload" href="/CosmicOcto-Medium.woff2" as="font" type="font/woff2" crossorigin />
    <style>${css}</style>
${js ? `    <script type="module">${js}</script>\n` : ''}  </head>
  <body>
    <div id="root">${app}</div>
  </body>
</html>
`;
}
