import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { verificationService } from "../services/verification.service";
import { VerificationParams } from "../interfaces/interfaces";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/src/types/types";

export const useGetVerificationQueue = (params: VerificationParams) => {
  return useQuery({
    queryKey: ["verification_queue", params],
    queryFn: () => verificationService.getVerificationQueue(params),
  });
};
export const useGetVerificationDetails = (id: string) => {
  return useQuery({
    queryKey: ["verification_details", id],
    queryFn: () => verificationService.getVerificationDetails(id),
    enabled: !!id,
  });
};

export const useApproveVerification= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id:string) => verificationService.approveVerification(id),
    onSuccess: async (res) => {
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["verification_queue"] }), queryClient.invalidateQueries({ queryKey: ["verification_details"] })]);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
};

export const useRejectVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data:{id: string,reason:string}) => verificationService.rejectVerification(data.id,{rejectionReason:data.reason}),
    onSuccess: async (res) => {
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["verification_queue"] }), queryClient.invalidateQueries({ queryKey: ["verification_details"] })]);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
};

export const useRequestResubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; reason: string }) => verificationService.requestResubmission(data.id, { resubmissionReason: data.reason }),
    onSuccess: async (res) => {
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["verification_queue"] }), queryClient.invalidateQueries({ queryKey: ["verification_details"] })]);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
};

