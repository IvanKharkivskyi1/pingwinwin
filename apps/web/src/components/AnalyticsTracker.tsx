'use client';

import { useEffect } from 'react';

export function AnalyticsTracker() {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/visit`, {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {
      // Analytics must never break the application
    });
  }, []);

  return null;
}
