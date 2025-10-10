import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { queryKeys } from "../../../lib/query-keys";

export type ProgressSummary = {
  accuracy: number; // 0..1
  sensitivity: number; // 0..1
  specificity: number; // 0..1
  avgTimeMs: number; // milliseconds
  totalAttempts: number;
  streakDays: number;
  trend?: Array<{ date: string; accuracy: number; sensitivity: number }>;
};

export const useProgress = () => {
  return useQuery({
    queryKey: queryKeys["me-progress"],
    queryFn: async () => {
      const res = await api.get<ProgressSummary>("/me/progress");
      return res.data;
    },
  });
};
