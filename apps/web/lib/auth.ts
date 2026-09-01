const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://pingwinwin-api.onrender.com'
    : 'http://localhost:3001');

export const API_URL = rawApiUrl.replace(/\/$/, '');

export function apiFetch(path: string, init: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, { ...init, credentials: 'include' });
}

export async function logout() {
  await apiFetch('/auth/logout', { method: 'POST' });
}

export function getErrorMessage(data: unknown, fallback: string) {
  if (
    data &&
    typeof data === 'object' &&
    'message' in data &&
    (typeof data.message === 'string' || Array.isArray(data.message))
  ) {
    return Array.isArray(data.message) ? data.message.join(', ') : data.message;
  }

  return fallback;
}
