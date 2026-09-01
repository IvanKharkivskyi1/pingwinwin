export const ACCESS_TOKEN_COOKIE = 'accessToken';

// No maxAge: cookie lives for the browser session, actual expiry is enforced by the JWT itself.
export function accessTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}
