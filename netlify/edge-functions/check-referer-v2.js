export default async (request, context) => {
  const referer = request.headers.get('referer');
  const requestUrl = request.url;

  console.log('Incoming request URL:', requestUrl);
  console.log('Referer header:', referer);

  const allowedHosts = [
    'pro-culinaria.ru',
    'www.pro-culinaria.ru',
    'pies-glorious-pies.netlify.app',
    'pies-glorious-pies.proculinaria-book.ru',
  ];

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererHost = refererUrl.hostname;

      console.log('Parsed Referer Host:', refererHost);

      const isAllowed = allowedHosts.includes(refererHost);

      console.log('Is referer allowed?', isAllowed);

      if (isAllowed) {
        return context.next();
      }
    } catch (e) {
      console.error('Invalid referer URL or parsing error:', referer, e);
    }
  } else {
    console.log('No referer header found. Blocking.');
  }

  console.log('Blocking request: Referer not allowed or missing.');
  return new Response('Access Denied: This page is only accessible from allowed sources.', {
    status: 403,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
