import { api } from './api';
import { useMutation } from '@tanstack/react-query';
import { AuthResponse } from './types/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res = await api.post<AuthResponse>('auth/login', {
        email,
        password,
      });
      return res.data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ name, email, password }: { name: string; email: string; password: string }) => {
      const res = await api.post<AuthResponse>('auth/register', {
        name,
        email,
        password,
      });

      return res.data;
    },
  });
};
