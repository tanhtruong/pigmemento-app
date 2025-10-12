import { api } from "@lib/api";
import { queryKeys } from "@lib/query-keys";
import { ProgressSummary } from "@lib/types/progress";
import { useQuery } from "@tanstack/react-query";

export const useProgress = () => {
  return useQuery({
    queryKey: queryKeys["me-progress"],
    queryFn: async () => {
      const res = await api.get<ProgressSummary>("/me/progress");
      return res.data;
    },
    initialData: null,
  });
};
