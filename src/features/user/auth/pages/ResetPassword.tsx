"use client";

import { useState, SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordField from "../components/PasswordField";
import { useResetPassword } from "@/src/features/user/auth/hooks/auth.hooks";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const reset = useResetPassword();
  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const email = localStorage.getItem("email") as string;
    reset.mutate({ email, password: newPassword });

    console.log("Password reset:", newPassword);
    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative" style={{ backgroundColor: "#F5F5F3" }}>
      <main className="w-full max-w-[480px] bg-white rounded-2xl p-12 flex flex-col items-center shadow-sm z-10 relative">
        <div className="mb-8 flex flex-col items-center w-full">
          <div className="mb-6">
            <span className="font-headline text-lg font-black text-[#005440] tracking-tight">Travel Buddy</span>
          </div>
          <div className="w-14 h-14 bg-[#c9eadb] rounded-full flex items-center justify-center mb-6">
            <svg className="w-7 h-7 text-[#0f6e56] fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#181d1a] mb-2 text-center tracking-tight font-headline">Reset your password</h1>
        </div>

        {success ? (
          <div className="w-full text-center space-y-4 py-4">
            <div className="w-14 h-14 bg-[#c9eadb] rounded-full flex items-center justify-center mx-auto">
              <svg className="w-7 h-7 text-[#005440] fill-current" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <p className="text-[#181d1a] font-semibold">Password updated successfully!</p>
            <p className="text-[#3f4944] text-sm">Redirecting you to login…</p>
          </div>
        ) : (
          <form className="w-full space-y-6" onSubmit={handleSubmit} noValidate>
            <PasswordField id="new_password" label="New password" placeholder="Enter new password" value={newPassword} onChange={setNewPassword} />
            <PasswordField id="confirm_password" label="Confirm password" placeholder="Re-type new password" value={confirmPassword} onChange={setConfirmPassword} />

            {newPassword.length > 0 && newPassword.length < 8 && <p className="text-xs text-[#6f7a74]">Use at least 8 characters.</p>}

            {error && (
              <p className="text-[#ba1a1a] text-sm font-medium" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl transition-all active:scale-[0.98] mt-2">
              Update password
            </button>
          </form>
        )}

        <div className="mt-10">
          <Link href="/login" className="group flex items-center gap-2 text-[#3f4944] hover:text-[#005440] transition-colors text-sm font-medium">
            <svg className="w-4 h-4 fill-current group-hover:-translate-x-0.5 transition-transform" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Back to login
          </Link>
        </div>
      </main>

      <div className="fixed top-0 right-0 p-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="relative w-64 h-64 overflow-hidden rounded-2xl rotate-3">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoOQtb9fjvKax3zhQ6qPi2ZRsI8fLcvLhLgymVlM75EY7uBC3JVmtm1gw39JapTDZA0qApIo6M5cfXxWwbMWBCtKTeTuuPIhhewAqyIjfPGqDEIvNESFBJYct6-jOwK4psfju86egssUcCV8KoICzBqDZfbE5itSH2GIOYo6jJ6IA2aFZZswbPlDTMdEmQ5GXQWMHMCZgYINDqxxYhdqQNz9FJoue_i_0S5_w7E1E5FffcCDGILWqLpGOCJUd0UNT7xJD3WMamMfY" alt="" className="w-full h-full object-cover grayscale" />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 p-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="relative w-72 h-48 overflow-hidden rounded-2xl -rotate-6">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB050z8TQ2sr5HmpW9coaUcAjOuUsymIuiBqwgB9s0udSpk8lGfKvFFwhD1v01A9SewT7k86XHmzYKiw-TY9Y4Usg_rpPvsb2GAmfwn4sWmZBp5VxvOC1DDP2ajz4QmUF_NUjk5a6yyOX5hoXW0mc_h7egq7a_G4oy6N_Zs_nPJqAScaYPG0O9BJRxUdM6aNnjbovkCfqZ6k9dKhDVNGOdmRgxCqk4CkXXgduLeLPo7cE5se49s0BK4qTbSPUrkVkSQ0m0JKX0YbWE" alt="" className="w-full h-full object-cover grayscale" />
        </div>
      </div>
    </div>
  );
}
