function normalizeApiBase(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  let cleaned = value.trim();

  cleaned = cleaned.replace(/^#sym:/i, '').replace(/^\[+|\]+$/g, '');
  cleaned = cleaned.replace(/^https:\/+/, 'https://');
  cleaned = cleaned.replace(/^http:\/+/, 'http://');

  try {
    const url = new URL(cleaned);
    return url.origin.replace(/\/$/, '');
  } catch {
    const match = cleaned.match(/^https?:\/\/[^/]+/i);
    return match ? match[0].replace(/\/$/, '') : undefined;
  }
}

const AUTH_SESSION_KEY = 'pingwinwin-auth';

const fallbackApiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://pingwinwin-api.onrender.com'
    : 'http://localhost:3001';

export const API_URL =
  normalizeApiBase(process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL) ?? fallbackApiUrl;

export function hasStoredAuthSession() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(AUTH_SESSION_KEY) === '1';
}

export function setStoredAuthSession(value: boolean) {
  if (typeof window === 'undefined') {
    return;
  }

  if (value) {
    window.localStorage.setItem(AUTH_SESSION_KEY, '1');
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

export function apiFetch(path: string, init: RequestInit = {}) {
  const url = /^https?:\/\//i.test(path) ? path : `${API_URL}${path}`;
  return fetch(url, { ...init, credentials: 'include' });
}

export async function logout() {
  try {
    await apiFetch('/auth/logout', { method: 'POST' });
  } finally {
    setStoredAuthSession(false);
  }
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
