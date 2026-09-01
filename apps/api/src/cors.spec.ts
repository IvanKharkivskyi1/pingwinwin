import { resolveCorsOrigin } from './cors';

describe('resolveCorsOrigin', () => {
  it('reflects the allowed Vercel origin back to the browser', () => {
    expect(
      resolveCorsOrigin('https://pingwinwin.vercel.app', [
        'https://pingwinwin.vercel.app',
      ]),
    ).toBe('https://pingwinwin.vercel.app');
  });

  it('allows Vercel preview domains', () => {
    expect(
      resolveCorsOrigin(
        'https://staging-pingwinwin-git-main-ivankharkivskyi1.vercel.app',
        ['https://pingwinwin.vercel.app'],
      ),
    ).toBe('https://staging-pingwinwin-git-main-ivankharkivskyi1.vercel.app');
  });

  it('rejects untrusted origins', () => {
    expect(
      resolveCorsOrigin('https://evil.example', [
        'https://pingwinwin.vercel.app',
      ]),
    ).toBe(false);
  });
});
