import axios from "axios";
import { CONFIG } from "../config";
import { getToken } from "./storage";

export const api = axios.create({ baseURL: "https://api.pigmemento.app" });

// Attach JWT if present
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simple error surface
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message || err.message;
    console.warn("API error:", message);
    return Promise.reject(err);
  }
);
