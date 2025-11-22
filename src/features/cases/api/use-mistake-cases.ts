import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { CaseListItem } from '@lib/types/case';
import { api } from '@lib/api';

export const useMistakeCases = (limit = 20) => {
  return useQuery({
    queryKey: queryKeys['mistake-cases'](limit),
    queryFn: async () => {
      const res = await api.get<CaseListItem[]>('/me/mistakes', {
        params: { limit },
      });
      return res.data;
    },
  });
};
