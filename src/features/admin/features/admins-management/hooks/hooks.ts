import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminsServices } from "../services/admins.service";
import { CreateAdminFormData, EditAdminFormData } from "../validators/validators";
import { AxiosError } from "axios";
import { ApiError } from "@/src/types/types";
import { toast } from "sonner";


export function useGetAdmins() {
  return useQuery({
    queryKey: ["admins"],
    queryFn: () => adminsServices.getAllAdmins(),
  });
}
export function useCreateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAdminFormData) => adminsServices.createAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useEditAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload:{data: EditAdminFormData,id:string}) => adminsServices.updateAdmin(payload.id,payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}