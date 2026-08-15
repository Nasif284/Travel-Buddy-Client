import { adminApi as api } from "@/src/lib/admin-api"
import { VerificationParams } from "../interfaces/interfaces";

export const verificationService = {
  getVerificationQueue: async (params: VerificationParams) => {
    const res = await api.get("/verifications", { params });
    return res.data;
  },
  getVerificationDetails: async (id: string) => {
    const res = await api.get(`/verifications/${id}`);
    return res.data;
  },
  approveVerification: async (id: string) => {
    const res = await api.post(`/verifications/${id}/approve`);
    return res.data;
  },
  rejectVerification: async (id: string, data: { rejectionReason: string }) => {
    const res = await api.post(`/verifications/${id}/reject`, data);
    return res.data;
  },
  requestResubmission: async (id: string, data: { resubmissionReason: string }) => {
    const res = await api.post(`/verifications/${id}/resubmission`, data);
    return res.data;
  },
};