export const ACCESS_TOKEN_COOKIE = 'accessToken';

// The frontend and API are hosted on different origins in production, so the cookie must
// be sent cross-site for browser-authenticated requests.
export function accessTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    path: '/',
  };
}
