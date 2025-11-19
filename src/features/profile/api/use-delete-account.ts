import { useMutation } from '@tanstack/react-query';
import { api } from '@lib/api';

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async () => await api.delete('/me'),
  });
};
