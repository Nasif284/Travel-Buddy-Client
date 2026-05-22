"use client";
import { useRegister } from "@/src/features/user/auth/hooks/auth.hooks";
import { SubmitEvent, useState } from "react";
import PasswordField from "../components/PasswordField";

const SignUpPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const register = useRegister();
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    register.mutate({ fullName, email, password });
    console.log("Sign up submitted:", { fullName, email, password });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-[#3f4944]">
          Full name
        </label>
        <input id="fullName" type="text" autoComplete="name" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] border-none focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all text-[#181d1a] placeholder:text-[#6f7a74]/60 outline-none" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-[#3f4944]">
          Email
        </label>
        <input id="email" type="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-12 px-4 rounded-xl bg-[#e0e3e0] border-none focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all text-[#181d1a] placeholder:text-[#6f7a74]/60 outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <PasswordField id="password" label="Password" placeholder="••••••••" onChange={(v) => setPassword(v)} value={password} />
        <PasswordField id="confirmPassword" label="Confirm password" placeholder="••••••••" onChange={(v) => setConfirmPassword(v)} value={confirmPassword} />
      </div>

      {error && (
        <p className="text-[#ba1a1a] text-sm font-medium" role="alert">
          {error}
        </p>
      )}

      <div className="pt-4">
        <button type="submit" className="w-full h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center text-lg">
          Create account
        </button>
      </div>
    </form>
  );
};

export default SignUpPage;
