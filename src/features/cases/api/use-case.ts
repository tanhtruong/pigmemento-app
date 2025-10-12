import { api } from "@lib/api";
import { queryKeys } from "@lib/query-keys";
import { CaseDetail } from "@lib/types/case";
import { useQuery } from "@tanstack/react-query";

export const useCase = (caseId: string) => {
  return useQuery({
    queryKey: queryKeys.case(caseId),
    queryFn: async () => {
      const res = await api.get<CaseDetail>(`/cases/${caseId}`);
      return res.data;
    },
  });
};
