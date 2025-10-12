import { api } from "@lib/api";
import { queryKeys } from "@lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export type DrillsDue = {
  count: number;
  nextDueAt?: string;
};

export const useDrillsDue = () => {
  return useQuery({
    queryKey: queryKeys["drills-due"],
    queryFn: async () => {
      const res = await api.get<DrillsDue>("/me/drills-due");
      return res.data;
    },
    initialData: {
      count: 0,
      nextDueAt: undefined,
    } satisfies DrillsDue,
  });
};
