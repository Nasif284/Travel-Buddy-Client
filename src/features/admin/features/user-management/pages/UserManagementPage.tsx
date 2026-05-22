import AdminSidebar from "../../../components/AdminSideBar";
import AdminTopBar from "../../../components/AdminTopBar";
import UsersTable from "../components/UsersTable";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Travel Buddy Admin",
  robots: { index: false, follow: false },
};

export default function UserManagementPage() {
  return (
    <div className="bg-[#fcf9f5] text-[#1c1c1a] flex min-h-screen overflow-hidden antialiased">
      <AdminSidebar />

      <div className="flex-grow flex flex-col min-w-0 ml-60">
        <AdminTopBar />

        <main className="flex-grow p-8 pt-20 overflow-y-auto">
          <UsersTable />
        </main>
      </div>
    </div>
  );
}
