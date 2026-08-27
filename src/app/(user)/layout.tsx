import CallModals from "@/src/components/call/CallModals";
import LeftSidebar from "@/src/components/LeftSideBar";
import AuthProvider from "@/src/components/providers/AuthProvider";
import CallProvider from "@/src/components/providers/CallProvider";
import TopBar from "@/src/components/TopBar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <CallProvider>
        <div className="bg-[#f7faf6] text-[#181d1a] min-h-screen">
          <LeftSidebar />
          <TopBar />
          {children}
        </div>
        <CallModals/>
      </CallProvider>
    </AuthProvider>
  );
};

export default layout;
