"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/src/features/user/auth/hooks/auth.hooks";
import { useAuthStore } from "@/src/store/auth.store";
import { connectSocket, disconnectSocket } from "@/src/socket/socket";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data, isLoading } = useAuthMe();
  const me = data?.data;

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (!me) return;
    setUser(me.user);

    if (!me.isVerified) {
      router.replace("/verify");
      return;
    }

    if (!me.onboardingCompleted) {
      switch (me.onboardingStep) {
        case 1:
          router.replace("/onboarding/source");
          break;

        case 2:
          router.replace("/onboarding/profile");
          break;

        default:
          router.replace("/onboarding/travel-style");
      }
    }
  }, [me, router, setUser]);

  useEffect(() => {
    if (!me || !me.isVerified || !me.onboardingCompleted) {
      return;
    }
    const socket = connectSocket();

    const handleConnect = () => {
      console.log("[Socket] Connected:", socket.id);
    };

    const handleError = (error: Error) => {
      console.error("[Socket] Connection error:", error.message);
    };

    socket.on("connect", handleConnect);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error", handleError);
      disconnectSocket();
    };
  }, [me]);

  const shouldRedirect = !me?.isVerified || !me?.onboardingCompleted;

  if (isLoading || shouldRedirect) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return children;
}
