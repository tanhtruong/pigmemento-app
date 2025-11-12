import { useQuery } from "@tanstack/react-query";
import { CaseListItem } from "@lib/types/case";
import { queryKeys } from "@lib/query-keys";
import { api } from "@lib/api";
import { Page } from "@lib/helpers/pagination";

export const useCases = () => {
  return useQuery({
    queryKey: queryKeys.cases,
    queryFn: async () => {
      const res = await api.get<CaseListItem[]>(`/cases`);
      return res.data;
    },
  });
};
