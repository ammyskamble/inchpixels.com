export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(context.request.url);

  // 1. Directly return Google site verification with 200 OK (bypasses Cloudflare Pages 308 redirect)
  if (url.pathname.startsWith('/google69cf40e0a99bf7e3') || (url.pathname.startsWith('/google') && url.pathname.endsWith('.html'))) {
    return new Response('google-site-verification: google69cf40e0a99bf7e3.html\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // 2. Serve robots.txt directly on pages.dev with 200 OK without cross-domain redirect.
  // Googlebot / GSC Change of Address requires direct robots.txt access to validate the site move.
  if (url.pathname === '/robots.txt') {
    return new Response('User-agent: *\nAllow: /\n', {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // 3. 301 Redirect all pages.dev requests to inchpixels.com
  if (url.hostname.endsWith('.pages.dev')) {
    url.hostname = 'inchpixels.com';
    url.protocol = 'https:';

    // Normalize trailing slash for directory routes to avoid 301 -> 308 redirect chains
    const lastSegment = url.pathname.split('/').pop() || '';
    if (!url.pathname.endsWith('/') && !lastSegment.includes('.')) {
      url.pathname = `${url.pathname}/`;
    }

    return Response.redirect(url.toString(), 301);
  }

  return context.next();
};

