const resolvedBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXTAUTH_URL ||
  process.env.DEPLOY_PRIME_URL ||
  process.env.URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export function getApiBaseUrl() {
  if (typeof window !== "undefined") {
    return (process.env.NEXT_PUBLIC_API_URL || window.location.origin).replace(
      /\/$/,
      "",
    );
  }

  return resolvedBaseUrl.replace(/\/$/, "");
}

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getApiBaseUrl()}${normalizedPath}`;
}
