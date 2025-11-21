import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { api } from '@lib/api';

export type InferenceResponse = {
  probs: {
    benign: number;
    malignant: number;
  };
  camPngUrl: string;
};

export const useInference = (caseId?: string) => {
  return useQuery({
    queryKey: queryKeys['infer-case'](caseId),
    enabled: !!caseId,
    queryFn: async () => {
      const MIN_DURATION = 2000; // 2 seconds
      const start = Date.now();

      // Run the actual inference
      const res = await api.post<InferenceResponse>(`/inference/cases/${caseId}`);
      const data = res.data;

      // Enforce minimum loading time
      const elapsed = Date.now() - start;
      const remaining = MIN_DURATION - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      return data;
    },
    gcTime: Infinity,
  });
};
