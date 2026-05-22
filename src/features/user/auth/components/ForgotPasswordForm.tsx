import { useState, SubmitEvent } from "react";
import { useForgotPasswordOtp } from "@/src/features/user/auth/hooks/auth.hooks";


const ForgotPasswordForm = () => {
      const [email, setEmail] = useState("");
      const sendOtp = useForgotPasswordOtp();
      const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        localStorage.setItem("email", email);
        sendOtp.mutate({ email });
      };
  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-[#3f4944] ml-1">
          Enter your email
        </label>
        <div className="flex items-center h-12 px-4 rounded-xl bg-[#e0e3e0] transition-all focus-within:bg-white focus-within:ring-1 focus-within:ring-[#005440]">
          <input id="email" type="text" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="new-password" className="w-full bg-transparent border-none focus:ring-0 outline-none text-[#181d1a] placeholder:text-[#6f7a74] text-sm" />
        </div>
      </div>

      <button type="submit" className="w-full h-12 bg-[#0f6e56] hover:bg-[#005440] text-white font-bold rounded-xl transition-all active:scale-[0.98] mt-2">
        Send Otp
      </button>
    </form>
  );
}

export default ForgotPasswordForm