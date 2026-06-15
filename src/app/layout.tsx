import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Travel Buddy",
  description: "Find your travel tribe. Connect with like-minded travelers, plan trips, and explore the world together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-surface">
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
