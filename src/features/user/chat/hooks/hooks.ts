import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { chatService } from "../services/service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/src/types/types";

export function useGetConversationId() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => chatService.getConversationId(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
}
export function useGetConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => chatService.getConversations(),
  });
}
export function useGetMessages(conversationId: string) {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => chatService.getMessages(conversationId),
    enabled: !!conversationId,
  });
}
export function useUploadImage() {
  return useMutation({
    mutationFn: (data: FormData) => chatService.uploadImage(data),
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
