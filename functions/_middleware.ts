export const onRequest = async (context: { request: Request; next: () => Promise<Response> }) => {
  const url = new URL(context.request.url);

  // If the visitor or Google arrives at inchpixels.pages.dev or any preview .pages.dev URL
  if (url.hostname.endsWith('.pages.dev')) {
    url.hostname = 'inchpixels.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
};
