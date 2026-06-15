import LeftSidebar from "@/src/components/LeftSideBar";
import TopBar from "@/src/components/TopBar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-[#f7faf6] text-[#181d1a] min-h-screen">
      <LeftSidebar />
      <TopBar />
      {children}
    </div>
  );
};

export default layout;
