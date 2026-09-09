export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  try {
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

    // 3. Resolve 404 on /cdn-cgi/l/email-protection by 301-redirecting to Contact Us
    // Resolves crawler outlink errors caused by Cloudflare email obfuscation scraper links
    if (url.pathname.startsWith('/cdn-cgi/l/email-protection')) {
      return Response.redirect('https://inchpixels.com/contact-us/', 301);
    }

    // 4. Resolve 500 error page crawling by 301-redirecting standalone /500 routes to homepage
    // Prevents error template paths from being indexed or reported as 5XX errors in SEO audits
    if (url.pathname === '/500' || url.pathname === '/500/' || url.pathname === '/500.html' || /\/(es|ja|fr|de|pt|ko|it)\/500\/?$/.test(url.pathname)) {
      return Response.redirect('https://inchpixels.com/', 301);
    }

    // 5. 301 Redirect all pages.dev requests to inchpixels.com
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

    return await context.next();
  } catch (err) {
    console.error('Cloudflare Pages middleware error:', err);
    return await context.next();
  }
};

