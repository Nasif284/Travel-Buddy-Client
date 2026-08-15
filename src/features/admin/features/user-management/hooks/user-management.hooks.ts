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

export const useGetUserProfile = (id: string) => {
  return useQuery({
    queryKey: ["user_profile", id],
    queryFn: () => UserManagementServices.getUserProfile(id),
  });
};

export const useGetUserTripGroups = (id: string) => {
  return useQuery({
    queryKey: ["user_trip_groups", id],
    queryFn: () => UserManagementServices.getUserGroups(id),
  });
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChangeUserStatus) => UserManagementServices.changeUserStatus(data),
    onSuccess: async (res) => {
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["users"] }), queryClient.invalidateQueries({ queryKey: ["user_profile"] })]);
      toast.success(res.message);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
};
