import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { aiAssistantServices } from "../services/services";
import { AxiosError } from "axios";
import { ApiError } from "@/src/types/types";
import { toast } from "sonner";

export function useGetAiChats() {
    return useQuery({
        queryKey: ["ai_chats"],
        queryFn: () => aiAssistantServices.getChats(),
    });
}
export function useChatWithAi() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: {message:string}) => aiAssistantServices.chat(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ai_chats"],
            });
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error(error.response?.data?.error?.message || "Something went wrong");
        },
    });
}