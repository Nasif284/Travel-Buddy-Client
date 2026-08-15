import { useQuery } from "@tanstack/react-query";
import { chatService } from "../services/service";

export function useGetConversationId(userId: string, enabled:boolean) {
  return useQuery({
    queryKey: ["conversation_id", userId],
    queryFn: () => chatService.getConversationId(userId),
    enabled,
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
