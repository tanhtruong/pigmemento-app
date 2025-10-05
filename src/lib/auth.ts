import { api } from "./api";
import { LoginResponse } from "../types";

export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("auth/login", {
    email,
    password,
  });
  return data;
}

export async function register(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("auth/register", {
    email,
    password,
  });
  return data;
}
