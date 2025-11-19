import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';
import { CaseListItem } from '@lib/types/case';

export const useCaseHistory = () => {
  return useQuery({
    queryKey: queryKeys['attempted-cases'],
    queryFn: async () => {
      const res = await api.get<CaseListItem[]>('/cases/attempted');
      return res.data;
    },
  });
};
