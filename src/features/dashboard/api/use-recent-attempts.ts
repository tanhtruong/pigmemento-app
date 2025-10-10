import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { AnswerListItemDto, Page } from "../../../types";
import { queryKeys } from "../../../lib/query-keys";

export const useRecentAttempts = (
  limit: number = 5,
  cursor?: string | null
) => {
  return useQuery({
    queryKey: queryKeys["recent-attempts"],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: String(limit) });
      if (cursor) params.set("cursor", cursor);

      const res = await api.get<Page<AnswerListItemDto>>(
        `/answers/my-recent${params.toString()}`
      );

      return res.data;
    },
  });
};
