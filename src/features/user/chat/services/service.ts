import { userApi as api } from "@/src/lib/api-client";

export const chatService = {
  getConversationId: async (userId: string) => {
    const res = await api.get(`/chat/direct/${userId}`);
    return res.data;
  },
  getConversations: async () => {
    const res = await api.get(`/chat/conversations`);
    return res.data;
  },
  getMessages: async (conversationId: string) => {
    const res = await api.get(`/chat/${conversationId}/messages`);
    return res.data;
  },
  uploadImage: async (data: FormData) => {
    const res = await api.post(`/chat/upload/image`, data);
    return res.data;
  },
};
