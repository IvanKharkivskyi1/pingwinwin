'use client';

import { useEffect, useState } from 'react';

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/visits`)
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {
        // Counter must never break the application
      });
  }, []);

  if (count === null) {
    return null;
  }

  return <span>{count.toLocaleString()}</span>;
}
