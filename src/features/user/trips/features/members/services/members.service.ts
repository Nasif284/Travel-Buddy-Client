import { userApi as api } from "@/src/lib/api-client";

export const memberServices = {
  getMembers: async (id: string) => {
    const res = await api.get(`/trip/group/${id}/members`);
    return res.data;
  },
  addMembers: async (id: string, data: { members: string[] }) => {
    const res = await api.post(`/trip/group/${id}/members`, data);
    return res.data;
  },
  getInviteCode: async (id: string) => {
    const res = await api.get(`/trip/group/${id}/invite/code`);
    return res.data;
  },
  inviteByEmail: async (id: string, data: { email: string }) => {
    const res = await api.post(`/trip/group/${id}/invite/email`, data);
    return res.data;
  },
  joinWithLink: async (inviteCode: string) => {
    const res = await api.post(`/trip/group/join/${inviteCode}`);
    return res.data;
  },
  getInvites: async (id: string) => {
    const res = await api.get(`/trip/group/${id}/invites`);
    return res.data;
  },
  removeMember: async (groupId: string, memberId: string) => {
    const res = await api.patch(`/trip/group/${groupId}/members/remove/${memberId}`);
    return res.data;
  },
  leaveGroup: async (groupId: string) => {
    const res = await api.patch(`/trip/group/${groupId}/members/leave`);
    return res.data;
  },
  changeRole: async (groupId: string, memberId: string) => {
    const res = await api.patch(`/trip/group/${groupId}/members/role/${memberId}`);
    return res.data;
  },
};
