const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');

const STORAGE_KEYS = {
  access: 'imdb_access',
  refresh: 'imdb_refresh',
};

const normalizeError = (detail, fallback = 'Unexpected error') => {
  if (!detail) return { message: fallback };
  if (typeof detail === 'string') return { message: detail };
  if (Array.isArray(detail)) return { message: detail.join(', ') };
  if (typeof detail === 'object') {
    return {
      message: detail?.message || fallback,
      errors: detail,
    };
  }
  return { message: fallback };
};

const tokenStorage = {
  get: () => ({
    access: localStorage.getItem(STORAGE_KEYS.access),
    refresh: localStorage.getItem(STORAGE_KEYS.refresh),
  }),
  set: ({ access, refresh }) => {
    if (access) localStorage.setItem(STORAGE_KEYS.access, access);
    if (refresh) localStorage.setItem(STORAGE_KEYS.refresh, refresh);
  },
  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.access);
    localStorage.removeItem(STORAGE_KEYS.refresh);
  },
};

let refreshingPromise = null;

const refreshAccessToken = async () => {
  const { refresh } = tokenStorage.get();
  if (!refresh) {
    tokenStorage.clear();
    return null;
  }
  if (!refreshingPromise) {
    refreshingPromise = fetch(`${API_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })
      .then(async (response) => {
        if (!response.ok) {
          tokenStorage.clear();
          throw new Error('Session expired');
        }
        const data = await response.json();
        tokenStorage.set({ access: data.access, refresh: data.refresh ?? refresh });
        return data.access;
      })
      .finally(() => {
        refreshingPromise = null;
      });
  }
  return refreshingPromise;
};

const request = async (endpoint, { method = 'GET', body, headers = {}, retry = true } = {}) => {
  const { access } = tokenStorage.get();
  const response = await fetch(`${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && retry) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      return request(endpoint, { method, body, headers, retry: false });
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const normalized = normalizeError(
      errorBody.detail || errorBody.error || errorBody.non_field_errors || errorBody,
      response.statusText,
    );
    throw Object.assign(new Error(normalized.message), {
      status: response.status,
      errors: normalized.errors ?? errorBody,
    });
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const client = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  tokenStorage,
  refreshAccessToken,
};

