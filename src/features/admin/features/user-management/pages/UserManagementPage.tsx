import UsersTable from "../components/UsersTable";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management | Travel Buddy Admin",
  robots: { index: false, follow: false },
};

export default function UserManagementPage() {
  return (
    <main className="flex-grow p-8  overflow-y-auto">
      <UsersTable />
    </main>
  );
}
