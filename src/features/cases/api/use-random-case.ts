import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';
import { CaseDetail } from '@lib/types/case';

export const useRandomCase = (enabled: boolean) => {
  return useQuery({
    queryKey: queryKeys['random-case'],
    queryFn: async () => {
      const res = await api.get<CaseDetail>('/cases/random');
      return res.data as CaseDetail;
    },
    enabled,
  });
};
