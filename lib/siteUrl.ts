const resolvedBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const baseUrl = resolvedBaseUrl.replace(/\/$/, "");

export const apiUrl = (path: string) =>
  `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
