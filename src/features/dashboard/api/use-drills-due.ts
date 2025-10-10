import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { queryKeys } from "../../../lib/query-keys";

export const useDrillsDue = () => {
  return useQuery({
    queryKey: queryKeys["drills-due"],
    queryFn: async () => {
      const res = await api.get<{ count: number; nextDueAt?: string }>(
        "/me/drills-due"
      );
      return res.data;
    },
  });
};
