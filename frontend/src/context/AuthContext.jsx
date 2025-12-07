import { createContext, useCallback, useMemo, useState } from 'react';
import { client } from '../api/client.js';
import { useLoginMutation } from '../api/auth.js';
import { decodeJwt } from '../lib/utils.js';

export const AuthContext = createContext(null);

const mapTokenToUser = (accessToken) => {
  const payload = decodeJwt(accessToken);
  if (!payload) return null;
  return {
    id: payload.user_id,
    username: payload.username || payload.user || payload.sub,
    exp: payload.exp,
  };
};

export const AuthProvider = ({ children }) => {
  const existingTokens = client.tokenStorage.get();
  const [user, setUser] = useState(() => mapTokenToUser(existingTokens.access));

  const loginMutation = useLoginMutation();

  const login = useCallback(
    async (credentials) => {
      const tokens = await loginMutation.mutateAsync(credentials);
      client.tokenStorage.set(tokens);
      setUser(mapTokenToUser(tokens.access));
      return tokens;
    },
    [loginMutation],
  );

  const logout = useCallback(() => {
    client.tokenStorage.clear();
    setUser(null);
  }, []);

  const refreshToken = useCallback(async () => {
    const access = await client.refreshAccessToken();
    if (access) {
      setUser(mapTokenToUser(access));
    } else {
      setUser(null);
    }
    return access;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshToken,
      authLoading: loginMutation.isPending,
    }),
    [user, login, logout, refreshToken, loginMutation.isPending],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


