import { adminService } from "../services/admin-auth.services";
import { useAuthStore } from "@/src/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/src/types/types";
import { AdminLoginInput } from "../interfaces/admin-auth.interfaces";

export function useAdminLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  return useMutation({
    mutationFn: (data: AdminLoginInput) => adminService.login(data),
    onSuccess: (res) => {
      setUser(res.data);
      toast.success(res.message);
      router.push("/admin/users");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useAdminLogout() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: () => adminService.logout(),
    onSuccess: () => {
      toast.success("Admin Logged Out Successfully");
      logout();
      router.replace("/admin/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}
