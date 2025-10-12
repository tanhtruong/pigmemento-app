import { api } from "@lib/api";
import { queryKeys } from "@lib/query-keys";
import { DailyAttempts } from "@lib/types/attempt";
import { useQuery } from "@tanstack/react-query";

export const useDailyAttempts = () => {
  return useQuery({
    queryKey: queryKeys["daily-attempts"],
    queryFn: async () => {
      const res = await api.get<DailyAttempts>("/me/attempts/today");
      return res.data;
    },
    initialData: {
      limit: 10,
      used: 0,
      remaining: 10,
      resetAtLocal: new Date().toISOString(),
      resetAtUtc: new Date().toUTCString(),
    } satisfies DailyAttempts,
  });
};
