import { userApi as api } from "@/src/lib/api-client";

export const callService = {
  createDirectCall: async (data: { recipientId: string; mediaType: "AUDIO" | "VIDEO" }) => {
    const res = await api.post("/calls/direct", data);
    return res.data;
  },

  createGroupCall: async (data: { tripGroupId: string; mediaType: "AUDIO" | "VIDEO" }) => {
    const res = await api.post("/calls/group", data);
    return res.data;
  },

  joinCall: async (callId: string) => {
    const res = await api.post(`/calls/${callId}/join`);
    return res.data;
  },

  declineCall: async (callId: string) => {
    const res = await api.post(`/calls/${callId}/decline`);
    return res.data;
  },

  cancelCall: async (callId: string) => {
    const res = await api.post(`/calls/${callId}/cancel`);
    return res.data;
  },

  leaveCall: async (callId: string) => {
    const res = await api.post(`/calls/${callId}/leave`);
    return res.data;
  },
};
