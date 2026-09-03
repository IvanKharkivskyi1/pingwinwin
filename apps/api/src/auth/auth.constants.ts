export const ACCESS_TOKEN_COOKIE = 'accessToken';

// Local development runs on http://localhost, where Secure cookies are not accepted by the
// browser unless the app is served over https. In production, the frontend and API are on
// different origins, so the cookie must be sent cross-site.
export function accessTokenCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
    path: '/',
  };
}
