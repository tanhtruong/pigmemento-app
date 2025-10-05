import { api } from "./api";
import { LoginResponse } from "../types";

export async function login(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("auth/login", {
    email,
    password,
  });
  return data;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post<LoginResponse>("auth/register", {
    name,
    email,
    password,
  });
  return data;
}
