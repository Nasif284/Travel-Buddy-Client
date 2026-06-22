import { ConnectionRequestData } from "../interfaces/connection.interface";
import { userApi as api } from "../../../../lib/api-client";

export const connectionServices = {
  sendConnectionRequest: async (data: ConnectionRequestData) => {
    const res = await api.post("/connection", data);
    return res.data;
  },
  getIncomingRequests: async () => {
    const res = await api.get("/connection/requests/incoming");
    return res.data;
  },
  acceptRequest: async (id: string) => {
    const res = await api.patch(`/connection/accept/${id}`);
    return res.data;
  },
  rejectRequest: async (id: string) => {
    const res = await api.patch(`/connection/reject/${id}`);
    return res.data;
  },
  getConnections: async () => {
    const res = await api.get("/connection")
    return res.data
  },
  disconnect: async (id:string) => {
    const res = await api.patch(`/connection/disconnect/${id}`)
    return res.data
  },
  getAllRequests: async () => {
       const res = await api.get("/connection/requests");
       return res.data;
  }
};