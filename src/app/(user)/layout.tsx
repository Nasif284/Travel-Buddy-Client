import LeftSidebar from "@/src/components/LeftSideBar";
import AuthProvider from "@/src/components/providers/AuthProvider";
import TopBar from "@/src/components/TopBar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <div className="bg-[#f7faf6] text-[#181d1a] min-h-screen">
        <LeftSidebar />
        <TopBar />
        {children}
      </div>
    </AuthProvider>
  );
};

export default layout;
