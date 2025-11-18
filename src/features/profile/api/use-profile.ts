import { User, UserStats } from '@lib/types/user';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';

export const useProfile = () => {
  return useQuery<User>({
    queryKey: queryKeys.me,
    queryFn: async () => {
      const res = await api.get<User>('/me');
      return res.data;
    },
  });
};

export const useProfileStats = () => {
  return useQuery<UserStats>({
    queryKey: queryKeys['me-stats'],
    queryFn: async () => {
      const res = await api.get<UserStats>('/me/progress');
      return res.data;
    },
  });
};
