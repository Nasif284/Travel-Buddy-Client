"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import Link from "next/link";
import { OTPVerificationCardProps } from "../interfaces/auth.interfaces";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 48;

export default function OTPVerificationCard({ email, onVerify, onResend }:OTPVerificationCardProps) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const canResend = countdown <= 0;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResend = () => {
    if (!canResend || !email) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setCountdown(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
    onResend()
  };

  const handleVerify = () => {
    if (!email) return;
    const code = otp.join("");
    if (code.length < OTP_LENGTH) return;
    onVerify(code)
    console.log("Verifying OTP:", code);
  };

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="font-body text-[#181d1a] flex min-h-screen flex-col bg-[#F5F5F3]">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white rounded-2xl p-12 flex flex-col items-center shadow-sm">
          <div className="mb-10">
            <span className="font-headline font-black text-[#0F6E56] text-2xl tracking-tight">Travel Buddy</span>
          </div>

          <div className="mb-8 w-16 h-16 rounded-full bg-[#c9eadb] flex items-center justify-center">
            <svg className="w-7 h-7 text-[#005440] fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-headline font-bold text-2xl text-[#181d1a] mb-3">Verify your email</h1>
            <p className="text-[#3f4944] leading-relaxed text-sm">
              We sent a 6-digit code to your email address.
              <br />
              It expires in 10 minutes.
            </p>
          </div>

          <div className="flex gap-[10px] mb-6" role="group" aria-label="One-time passcode">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                placeholder="·"
                aria-label={`Digit ${index + 1}`}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.target.select()}
                className="w-[52px] h-[64px] border-2 border-[#e0e3e0] bg-[#f1f4f1] rounded-xl text-center text-2xl font-bold text-[#005440] focus:border-[#005440] focus:ring-0 focus:bg-white transition-all outline-none caret-transparent"
              />
            ))}
          </div>

          <div className="mb-10">
            {canResend ? (
              <button onClick={handleResend} className="text-[#005440] font-semibold text-sm hover:underline">
                Resend code
              </button>
            ) : (
              <p className="text-[#3f4944] font-medium text-sm">
                Resend code in <span className="text-[#181d1a]">{formatCountdown(countdown)}</span>
              </p>
            )}
          </div>

          <button onClick={handleVerify} disabled={!isComplete} className="w-full bg-[#0f6e56] text-white h-12 rounded-xl font-headline font-bold text-base hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
            Verify and continue
          </button>

          <div className="mt-8">
            <p className="text-xs text-[#3f4944] text-center opacity-70">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-[#005440]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-[#005440]">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-[#3f4944] text-sm">
          <span className="font-headline font-bold text-[#0F6E56]">© 2026 Travel Buddy. The Curated Wayfinder.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[#0F6E56] underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#0F6E56] underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            <Link href="/support" className="hover:text-[#0F6E56] underline-offset-4 hover:underline">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
