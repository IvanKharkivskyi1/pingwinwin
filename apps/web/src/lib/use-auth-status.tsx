'use client';

import { apiFetch, hasStoredAuthSession, setStoredAuthSession } from '@lib/auth';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function triggerAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('auth:changed'));
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!hasStoredAuthSession()) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await apiFetch('/auth/me');

      if (!res.ok) {
        setStoredAuthSession(false);
        setUser(null);
        return;
      }

      const data = (await res.json()) as AuthUser;
      setUser(data);
    } catch {
      setStoredAuthSession(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      void refresh();
    };

    window.addEventListener('auth:changed', handleAuthChange);
    void refresh();

    return () => {
      window.removeEventListener('auth:changed', handleAuthChange);
    };
  }, [refresh]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      refresh,
    }),
    [loading, refresh, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthStatus() {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      loading: true,
      refresh: async () => {},
    };
  }

  return context;
}

export function useRequireAuth(
  options: { redirectTo?: string; requireUser?: boolean; redirectIfAuthenticatedTo?: string } = {},
) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuthStatus();
  const redirectTo = options.redirectTo ?? '/login';
  const redirectIfAuthenticatedTo = options.redirectIfAuthenticatedTo;

  useEffect(() => {
    if (loading) {
      return;
    }

    if (redirectIfAuthenticatedTo && isAuthenticated) {
      router.replace(redirectIfAuthenticatedTo);
      return;
    }

    const shouldRedirect =
      !hasStoredAuthSession() || !isAuthenticated || (options.requireUser && !user);

    if (shouldRedirect) {
      router.replace(redirectTo);
    }
  }, [
    isAuthenticated,
    loading,
    options.requireUser,
    redirectIfAuthenticatedTo,
    redirectTo,
    router,
    user,
  ]);

  return {
    user,
    isAuthenticated,
    loading,
    isReady:
      !loading &&
      (!redirectIfAuthenticatedTo || !isAuthenticated) &&
      isAuthenticated &&
      (!options.requireUser || !!user),
  };
}
