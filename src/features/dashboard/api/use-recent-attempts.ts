import { api } from "@lib/api";
import { Page } from "@lib/helpers/pagination";
import { queryKeys } from "@lib/query-keys";
import { AnswerListItemDto } from "@lib/types/attempt";
import { useQuery } from "@tanstack/react-query";

export const useRecentAttempts = (
  limit: number = 5,
  cursor?: string | null
) => {
  return useQuery({
    queryKey: queryKeys["recent-attempts"],
    queryFn: async () => {
      const res = await api.get<Page<AnswerListItemDto>>(`/answers/my-recent`, {
        params: {
          limit,
          ...(cursor ? { cursor } : {}),
        },
      });

      return res.data;
    },
    initialData: { items: [], nextCursor: null },
  });
};
