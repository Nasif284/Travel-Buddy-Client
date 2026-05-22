"use client";
import { useGoogleAuth } from "../hooks/auth.hooks";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  const googleAuth = useGoogleAuth();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      googleAuth.mutate(tokenResponse.access_token);
    },

    onError: () => {
      console.log("Google Login Failed");
    },
  });
  return (
    <div className="mb-8 ">
      <button type="button" onClick={() => googleLogin()} className="w-full flex items-center justify-center gap-3 h-12 bg-white rounded-xl text-[#181d1a] font-semibold hover:bg-[#e5e9e5] transition-colors ring-1 ring-[#bec9c3]/20 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.2 36 26.7 37 24 37c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.7 39.5 16.3 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.5 6.8l6.3 5.2C39.7 36.1 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z" />
        </svg>
        Continue with Google
      </button>

      <div className="relative flex items-center gap-4 my-8">
        <div className="flex-grow h-px bg-[#bec9c3]/30" />
        <span className="text-[#3f4944] text-sm">or</span>
        <div className="flex-grow h-px bg-[#bec9c3]/30" />
      </div>
    </div>
  );
};

export default GoogleAuth;
