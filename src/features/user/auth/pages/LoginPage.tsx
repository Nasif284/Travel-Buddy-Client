"use client";
import { useLogin } from "@/src/features/user/auth/hooks/auth.hooks";
import Link from "next/link";
import React, { SubmitEvent, useState } from "react";
import PasswordField from "../components/PasswordField";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#3f4944]">
          Email Address
        </label>
        <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] border-none focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all text-[#181d1a] placeholder:text-[#6f7a74]/60 outline-none" />
      </div>

      <PasswordField id="password" label="Password" placeholder="••••••••" onChange={(v) => setPassword(v)} value={password} />

      <Link href="/forgot-password" className="text-xs font-bold text-[#005440] hover:underline">
        Forgot password?
      </Link>

      <div className="pt-4">
        <button type="submit" className="w-full h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center text-lg">
          login
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
