import { accessTokenCookieOptions } from './auth.constants';

describe('accessTokenCookieOptions', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (originalNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalNodeEnv;
    }
  });

  it('uses cross-site-safe cookies in production', () => {
    process.env.NODE_ENV = 'production';

    expect(accessTokenCookieOptions()).toMatchObject({
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
  });
});
