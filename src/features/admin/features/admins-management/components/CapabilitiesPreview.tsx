import { Role } from "../interfaces/interfaces";
import Icon from "./Icon";

const icons = {
  checkCircle: "M9 12.75 11.25 15 15 9.75m-3-6.75a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
};

const ROLE_CAPABILITIES: Record<Role, string[]> = {
  "Super Admin": ["Manage billing & invoices", "Add/remove admin users", "Edit system configurations", "Delete platform data", "Manage API integrations", "Access audit logs"],
  Moderator: ["Review flagged content", "Manage user reports", "Respond to support tickets", "Edit user-submitted itineraries"],
  Analyst: ["View analytics dashboards", "Export performance logs", "View financial summaries"],
};

export default function CapabilitiesPreview({ role }: { role: Role }) {
  return (
    <div className="bg-stone-50 rounded-xl p-6 border border-stone-200/60">
      <h4 className="text-[11px] font-black text-stone-500 uppercase tracking-widest mb-4">Capabilities for {role}</h4>
      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
        {ROLE_CAPABILITIES[role].map((cap) => (
          <div key={cap} className="flex items-center gap-3">
            <Icon path={icons.checkCircle} className="w-[18px] h-[18px] text-[#0f6e56] shrink-0" />
            <span className="text-sm text-stone-700">{cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}