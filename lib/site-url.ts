function normalizeSiteUrl(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return undefined;
  }
}

export function getSiteUrl(): string | undefined {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL
  );
}

export function absoluteUrl(path = "/"): string | undefined {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return undefined;
  }

  return new URL(path, `${siteUrl}/`).toString();
}
