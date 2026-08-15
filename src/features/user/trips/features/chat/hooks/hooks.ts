import { useQuery } from "@tanstack/react-query";
import { groupChatService } from "../services/services";

export function useGetConversationId(groupId: string) {
  return useQuery({
    queryKey: ["group_chat_conversation_id", groupId],
    queryFn: () => groupChatService.getGroupChatConversationId(groupId),
  });
}