import { create } from "zustand";
import { persist } from "zustand/middleware";

type Admin = {
  id: string;
  fullName: string;
  email: string;
  role: string;
};

type AdminAuthStore = {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;

  setAdmin: (user: Admin | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      loading: true,

      setAdmin: (admin) =>
        set({
          admin,
          isAuthenticated: !!admin,
        }),
      setLoading: (loading) => set({ loading }),
      logout: () =>
        set({
          admin: null,
          isAuthenticated: false,
          loading: false,
        }),
    }),
    { name: "admin-auth-storage" },
  ),
);
