import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';

export type InferenceResponse = {
  probs: {
    benign: number;
    malignant: number;
  };
  camPngUrl: string;
};

export const useInference = () => {
  return useMutation({
    mutationFn: async (caseId: string) => {
      const MIN_DURATION = 2000; // 2 seconds
      const start = Date.now();

      const res = await api.post<InferenceResponse>(`/inference/cases/${caseId}`);
      const data = res.data;

      const elapsed = Date.now() - start;
      const remaining = MIN_DURATION - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      return data;
    },
    retry: 0, // don't silently re-run inference
  });
};
