import { Role } from "../interfaces/interfaces";
import Icon from "./Icon";

export default function RoleCard({ role, icon, description, selected, onSelect }: { role: Role; icon: string; description: string; selected: boolean; onSelect: () => void }) {
  return (
    <label className={`relative cursor-pointer flex flex-col p-4 rounded-lg transition-all ${selected ? "border-2 border-[#0f6e56] bg-emerald-50/40 shadow-sm" : "border border-stone-200 bg-stone-50 hover:border-stone-300"}`}>
      <input type="radio" name="role" checked={selected} onChange={onSelect} className="absolute top-3 right-3 h-4 w-4 text-[#0f6e56] border-stone-300 focus:ring-[#0f6e56]" />
      <Icon path={icon} className={`w-5 h-5 mb-3 ${selected ? "text-[#0f6e56]" : "text-stone-400"}`} />
      <span className="text-sm font-bold text-stone-900">{role}</span>
      <span className="text-[11px] leading-tight text-stone-500 mt-1">{description}</span>
    </label>
  );
}
