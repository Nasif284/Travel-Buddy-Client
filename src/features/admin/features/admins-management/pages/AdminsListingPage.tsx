"use client";

import { useState } from "react";
import { AdminAccount, icons, Role, ROLE_BADGE_CLASS, ROLE_INFO, Status } from "../interfaces/interfaces";
import Icon from "../components/Icon";
import CreateAdminModal from "../components/CreateAdminModal";
import EditAdminModal from "../components/EditAdminModal";
import { useGetAdmins } from "../hooks/hooks";

export function getInitials(name: string): string {
  if (!name.trim()) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function AdminSettingsPage() {
  const { data: adminsData, isLoading } = useGetAdmins();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminAccount | null>(null);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const accounts = adminsData?.data?.admins;
  console.log(accounts)
  return (
    <>
      <main className="ml-0 mt-14 min-h-screen pb-32">
        <div className="p-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">Admin accounts</h2>
              <p className="text-stone-500 text-sm font-medium">Manage permissions and oversee organizational security access.</p>
            </div>
            <button onClick={() => setShowCreateModal(true)} className="bg-gradient-to-br from-[#005440] to-[#0f6e56] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#0f6e56]/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <span>Add new admin</span>
              <Icon path={icons.add} className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {ROLE_INFO.map((role) => (
              <div key={role.label} className="bg-stone-50 p-5 rounded-xl border border-stone-200/40">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${role.badgeClass}`}>{role.label}</span>
                  <span className={role.iconClass}>
                    <Icon path={role.icon} className="w-5 h-5" />
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1">{role.title}</p>
                <p className="text-xs text-stone-500 leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>

          <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-200/40 mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-100 text-[10px] uppercase tracking-widest font-bold text-stone-500">
                    <th className="px-6 py-4">Administrator</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Last active</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/40">
                  {accounts.map((admin: AdminAccount) => (
                    <tr key={admin.id} className={`hover:bg-stone-50 transition-colors group ${admin.status === "Deactivated" ? "opacity-60" : ""}`}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-500 font-bold text-xs">{getInitials(admin.name)}</div>
                          <div>
                            <p className="text-sm font-bold">{admin.name}</p>
                            <p className="text-xs text-stone-500">{admin.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ROLE_BADGE_CLASS[admin.role]}`}>{admin.role}</span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-xs font-medium">
                          {new Date(admin.lastActive).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "2-digit",
                            hour: "numeric",
                          })}
                        </p>
                        <p className="text-[10px] text-stone-500">IP: {admin.ip}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${admin.status === "Active" ? "bg-[#0f6e56]" : "bg-stone-400"}`} />
                          <span className="text-xs font-semibold">{admin.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button onClick={() => setEditingAdmin(admin)} className="text-[#0F6E56] text-xs font-bold uppercase tracking-wider hover:underline transition-colors">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <button onClick={() => setShowCreateModal(true)} className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-[#005440] to-[#0f6e56] text-white rounded-full flex items-center justify-center shadow-2xl md:hidden z-50">
        <Icon path={icons.personAdd} className="w-6 h-6" />
      </button>
      {showCreateModal && <CreateAdminModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />}

      {editingAdmin && <EditAdminModal admin={editingAdmin!} onClose={() => setEditingAdmin(null)} />}
    </>
  );
}
