import {api} from "@lib/api";
import {queryKeys} from "@lib/query-keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {AttemptRequest, AttemptResponse} from "@lib/types/attempt";

export const useSubmitAnswer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({caseId, attempt}: { caseId: string, attempt: AttemptRequest }) => {
            const res = await api.post<AttemptResponse>(`/cases/${caseId}/answer`, attempt)
            return res.data as AttemptResponse;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: queryKeys["cases"]});
        },
    });
};
