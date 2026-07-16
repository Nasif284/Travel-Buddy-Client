"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/src/features/user/auth/hooks/auth.hooks";
import { useAuthStore } from "@/src/store/auth.store";

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

  const shouldRedirect = !me?.isVerified || !me?.onboardingCompleted;

  if (isLoading || shouldRedirect) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return children;
}
