import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';
import { CaseDetail } from '@lib/types/case';

export const useDrillCases = (limit: number = 10) => {
  return useQuery({
    queryKey: queryKeys['drill-cases'],
    queryFn: async () => {
      const res = await api.get<CaseDetail[]>('/cases/drill', {
        params: { limit },
      });
      return res.data;
    },
    gcTime: Infinity,
  });
};
