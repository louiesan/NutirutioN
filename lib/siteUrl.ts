export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const apiUrl = (path: string) =>
  `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
