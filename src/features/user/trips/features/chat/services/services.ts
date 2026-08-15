import { userApi as api } from "@/src/lib/api-client";

export const groupChatService = {
  getGroupChatConversationId: async (groupId: string) => {
    const res = await api.get(`/chat/group/${groupId}`);
    return res.data;
  },
};
