"use client";
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            throwOnError: (error: any) => {
              const status = error?.response?.status;

              return !status || status >= 500;
            },
          },
          mutations: {
            throwOnError: (error: any) => {
              const status = error?.response?.status;

              return !status || status >= 500;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>{children}</GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
