import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { queryKeys } from "../../../lib/query-keys";

export const useCase = (caseId: string) => {
  return useQuery({
    queryKey: queryKeys.case(caseId),
    queryFn: async () => {
      const res = await api.get<{ imageUrl: string }>(`/cases/${caseId}`);
      return res.data;
    },
  });
};
