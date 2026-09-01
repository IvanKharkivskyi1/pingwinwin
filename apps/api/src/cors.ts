export function resolveCorsOrigin(
  origin: string | undefined,
  allowedOrigins: string[],
): string | boolean {
  if (!origin) {
    return true;
  }

  const cleanOrigin = origin.replace(/\/$/, '');
  const normalizedAllowed = allowedOrigins.map((value) =>
    value.replace(/\/$/, ''),
  );

  if (normalizedAllowed.includes(cleanOrigin)) {
    return cleanOrigin;
  }

  if (/\.vercel\.app$/.test(cleanOrigin)) {
    return cleanOrigin;
  }

  return false;
}
