import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeUserStatus, GetAllUsersQuery } from "../interfaces/users.interfaces";
import { UserManagementServices } from "../services/user-management.service";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiError } from "@/src/types/types";


export const useGetAllUsers = (params: GetAllUsersQuery) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => UserManagementServices.getAllUsers(params),
  });
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (data: ChangeUserStatus) => UserManagementServices.changeUserStatus(data),
      onSuccess: (res) => {
        queryClient.invalidateQueries({
          queryKey:["users"]
        })
        toast.success(res.message);
        
      },
      onError: (error: AxiosError<ApiError>) => {
        toast.error(error.response?.data?.error?.message || "Something went wrong");
      },
    });
}
