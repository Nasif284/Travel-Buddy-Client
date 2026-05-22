import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
    id: string
    name: string
    email:string
}

type AuthStore = {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
    logout:()=> void
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,

    setUser: (user) =>
      set({
        user,
        isAuthenticated: !!user,
      }),
    setLoading: (loading) => set({ loading }),
    logout: () =>
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      }),
  }),{name:"auth-storage"}),
);