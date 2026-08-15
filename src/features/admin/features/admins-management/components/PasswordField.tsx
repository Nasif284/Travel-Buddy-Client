import { useState } from "react";
import Icon from "./Icon";
import { icons } from "../interfaces/interfaces";

export default function PasswordField({ label, value, onChange, placeholder = "••••••••" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-stone-500 tracking-wider uppercase">{label}</label>
      <div className="relative">
        <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0f6e56] focus:border-transparent transition-all" />
        <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
          <Icon path={icons.eye} className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}