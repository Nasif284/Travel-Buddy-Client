import DashboardNav from "@/src/features/user/trips/components/DashboardNav";
import GroupHeader from "@/src/features/user/trips/components/GroupHeader";
import React from "react";
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="ml-64 mt-20 min-h-screen pb-32">
      <div className="max-w-[1400px] mx-auto w-full px-6 py-8">
        <GroupHeader/>
        <DashboardNav />
        {children}
      </div>
    </main>
  );
};

export default layout;
