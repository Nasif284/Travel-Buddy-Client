"use client";

import { useState } from "react";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
}

export default function PasswordField<T extends FieldValues>({ id, label, placeholder, register, error }: PasswordFieldProps<T>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-[#3f4944] ml-1">
        {label}
      </label>

      <div className="flex items-center h-12 px-4 rounded-xl bg-[#e0e3e0] transition-all focus-within:bg-white focus-within:ring-1 focus-within:ring-[#005440]">
        <input id={id} type={visible ? "text" : "password"} placeholder={placeholder} autoComplete="new-password" {...register(id)} className="w-full bg-transparent border-none focus:ring-0 outline-none text-[#181d1a] placeholder:text-[#6f7a74] text-sm" />

        <button type="button" onClick={() => setVisible((v) => !v)} aria-label={visible ? "Hide password" : "Show password"} className="text-[#3f4944] hover:text-[#005440] transition-colors flex items-center ml-2 flex-shrink-0">
          {visible ? (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          )}
        </button>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
