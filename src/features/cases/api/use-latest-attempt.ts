import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';
import { Label } from '@lib/types/case';
import { AttemptResponse } from '@lib/types/attempt';

export const useLatestAttempt = (caseId: string, options?: { enabled?: boolean }) => {
  return useQuery<AttemptResponse & { chosenLabel: Label; timeToAnswerMs: number }>({
    queryKey: queryKeys['latest-attempt'](caseId),
    queryFn: async () => {
      const res = await api.get<AttemptResponse & { chosenLabel: Label; timeToAnswerMs: number }>(
        `/cases/${caseId}/attempts/latest`,
      );
      return res.data;
    },
    enabled: options?.enabled !== false,
  });
};
