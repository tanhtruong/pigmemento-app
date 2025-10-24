import { api } from "@lib/api";
import { queryKeys } from "@lib/query-keys";
import { AttemptPostRequest } from "@lib/types/attempt";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attempt: AttemptPostRequest) =>
      await api.post("/answers", attempt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys["drills-due"] });
      queryClient.invalidateQueries({ queryKey: queryKeys["me-progress"] });
      queryClient.invalidateQueries({ queryKey: queryKeys["recent-attempts"] });
      queryClient.invalidateQueries({ queryKey: queryKeys["daily-attempts"] });
      queryClient.invalidateQueries({ queryKey: queryKeys["cases"] });
    },
  });
};
