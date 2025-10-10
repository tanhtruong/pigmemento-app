import { api } from "./api";
import { AuthResponse } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await api.post<AuthResponse>("auth/login", {
        email,
        password,
      });
      return res.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await api.post<AuthResponse>("auth/register", {
        name,
        email,
        password,
      });

      return res.data;
    },
  });
};

// export async function login(email: string, password: string) {
//   const { data } = await api.post<AuthResponse>("auth/login", {
//     email,
//     password,
//   });
//   return data;
// }

// export async function register(name: string, email: string, password: string) {
//   const { data } = await api.post<AuthResponse>("auth/register", {
//     name,
//     email,
//     password,
//   });
//   return data;
// }
