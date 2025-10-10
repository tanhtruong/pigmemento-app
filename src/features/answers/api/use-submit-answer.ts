import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { AttemptPostRequest } from "../../../types";
import { queryKeys } from "../../../lib/query-keys";

export const useSubmitAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (attempt: AttemptPostRequest) =>
      await api.post("/answers", attempt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys["drills-due"] });
      queryClient.invalidateQueries({ queryKey: queryKeys["me-progress"] });
      queryClient.invalidateQueries({ queryKey: queryKeys["recent-attempts"] });
    },
  });
};
