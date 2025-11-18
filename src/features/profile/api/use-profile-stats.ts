import { useQuery } from '@tanstack/react-query';
import { UserStats } from '@lib/types/user';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';

export const useProfileStats = () => {
  return useQuery<UserStats>({
    queryKey: queryKeys['me-stats'],
    queryFn: async () => {
      const res = await api.get<UserStats>('/me/progress');
      return res.data;
    },
  });
};
