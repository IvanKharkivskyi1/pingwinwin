'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  API_URL,
  clearAccessToken,
  getAccessToken,
  getErrorMessage,
} from '../../lib/auth';

type Profile = {
  id: string;
  email: string;
  name: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.replace('/login');
      return;
    }

    const loadProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(getErrorMessage(data, 'Failed to load profile'));
        }

        setProfile(data);
      } catch (err) {
        clearAccessToken();
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        router.replace('/login');
      }
    };

    void loadProfile();
  }, [router]);

  const handleLogout = () => {
    clearAccessToken();
    router.push('/login');
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>Profile</h1>
      {error && <p>{error}</p>}
      <p>Email: {profile.email}</p>
      <p>Name: {profile.name ?? '—'}</p>
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
      <Link href="/">Home</Link>
    </main>
  );
}
