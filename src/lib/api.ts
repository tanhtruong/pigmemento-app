import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './storage';

// export const api = axios.create({ baseURL: "https://api.pigmemento.app" });
export const api = axios.create({ baseURL: 'http://localhost:5197' });

// cache token in memory to avoid async read every request
let currentToken: string | null = null;
export function setAuthToken(token: string | null) {
  currentToken = token;
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

function applyAuthHeader(config: InternalAxiosRequestConfig, token: string) {
  const h = config.headers;
  // If Axios v1 headers object
  if (h && typeof (h as AxiosHeaders).set === 'function') {
    (h as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    return;
  }
  // Fallback: plain object headers
  // explicitly ensure it's an object and then assign the key
  (config.headers as any) = (h ?? {}) as Record<string, any>;
  (config.headers as any)['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = currentToken ?? (await getToken());
  if (token) {
    applyAuthHeader(config, token);
  }
  return config;
});
