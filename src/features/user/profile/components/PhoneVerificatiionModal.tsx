"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCountdown, useSendPhoneOtp, useVerifyPhoneOtp } from "../hooks/profile.hooks";
import { PhoneVerificationModalProps, Step } from "../interfaces/profile.interface";
import { otpSchema, PhoneForm, phoneSchema } from "../validators/validators";
import OtpInput from "./OtpInput";

const Icons = {
  phone: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  ),
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  arrowBack: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  arrowForward: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  chevronDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

const COUNTRY_CODES = [
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+91", label: "IN +91" },
  { code: "+33", label: "FR +33" },
  { code: "+49", label: "DE +49" },
];

export default function PhoneVerificationModal({ onClose }: PhoneVerificationModalProps) {
  const [step, setStep] = useState<Step>("phone");
  const [fullPhone, setFullPhone] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState<string | undefined>();

  const { formatted: timer, expired: timerExpired, start: startTimer } = useCountdown(59);

  const sendOtp = useSendPhoneOtp();
  const verifyOtp = useVerifyPhoneOtp();

  const {
    register: regPhone,
    handleSubmit: handlePhoneSubmit,
    formState: { errors: phoneErrors },
    watch: watchPhone,
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { countryCode: "+91", phone: "" },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  async function onPhoneSubmit(values: PhoneForm) {
    const phone = `${values.countryCode}${values.phone.replace(/\D/g, "")}`;
    setFullPhone(phone);
    await sendOtp.mutateAsync({ phone });
    setStep("otp");
    startTimer();
    setOtpValue("");
    setOtpError(undefined);
  }

  async function handleVerifyOtp() {
    const result = otpSchema.safeParse({ otp: otpValue });
    if (!result.success) {
      setOtpError(result.error.message);
      return;
    }
    setOtpError(undefined);
    await verifyOtp.mutateAsync({ phone: fullPhone, otp: otpValue });
    onClose();
  }

  async function handleResend() {
    if (!timerExpired) return;
    await sendOtp.mutateAsync({ phone: fullPhone });
    startTimer();
    setOtpValue("");
    setOtpError(undefined);
  }

  const progressPct = step === "phone" ? 50 : 100;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(24,29,26,0.4)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#f7faf6] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#e5e9e5] transition-colors z-10 text-[#3f4944]" aria-label="Close">
          {Icons.close}
        </button>

        {step === "phone" && (
          <div className="p-8 md:p-10">
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#c9eadb] text-[#005440] rounded-2xl flex items-center justify-center">{Icons.phone}</div>
              <h2 className="text-2xl font-black text-[#005440] font-headline leading-tight">Verify Phone Number</h2>
              <p className="text-[#3f4944] text-sm leading-relaxed max-w-xs">Enter your mobile number to receive a verification code for secure account access.</p>
            </div>

            <form onSubmit={handlePhoneSubmit(onPhoneSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#3f4944] ml-1">Mobile Number</label>
                <div className="flex gap-2">
                  {/* Country code picker */}
                  <div className="relative">
                    <select {...regPhone("countryCode")} className="appearance-none bg-[#e0e3e0] border-none rounded-xl h-12 pl-4 pr-8 text-sm font-medium focus:bg-white focus:ring-1 focus:ring-[#0f6e56] transition-all cursor-pointer outline-none text-[#181d1a]">
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#3f4944]">{Icons.chevronDown}</span>
                  </div>

                  {/* Phone number */}
                  <div className="flex-1">
                    <input
                      {...regPhone("phone")}
                      type="tel"
                      placeholder="000-000-0000"
                      className={`w-full bg-[#e0e3e0] border-none rounded-xl h-12 px-4 text-sm font-medium placeholder:text-[#6f7a74] focus:bg-white focus:ring-1 focus:ring-[#0f6e56] transition-all outline-none text-[#181d1a]
                        ${phoneErrors.phone ? "ring-1 ring-[#ba1a1a]" : ""}`}
                    />
                  </div>
                </div>
                {phoneErrors.phone && <p className="text-xs text-[#ba1a1a] ml-1">{phoneErrors.phone.message}</p>}
              </div>

              <button type="submit" disabled={sendOtp.isPending} className="w-full bg-[#0f6e56] text-white h-12 rounded-xl font-bold text-sm tracking-wide shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {sendOtp.isPending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <> Send OTP {Icons.arrowForward} </>}
              </button>

              <p className="text-[11px] text-center text-[#3f4944] px-4">Standard carrier message and data rates may apply.</p>
            </form>
          </div>
        )}

        {/* ── Step 2: OTP verification ────────────────────────── */}
        {step === "otp" && (
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#c9eadb] text-[#005440] rounded-2xl flex items-center justify-center">{Icons.shield}</div>
              <h2 className="text-2xl font-black text-[#005440] font-headline leading-tight">Enter Code</h2>
              <p className="text-[#3f4944] text-sm leading-relaxed">
                We&apos;ve sent a 6-digit verification code to
                <br />
                <span className="font-bold text-[#181d1a]">{fullPhone}</span>
              </p>
            </div>

            <div className="space-y-8">
              {/* OTP boxes */}
              <OtpInput value={otpValue} onChange={setOtpValue} error={otpError} />

              <div className="space-y-4">
                <button type="button" onClick={handleVerifyOtp} disabled={verifyOtp.isPending || otpValue.length < 6} className="w-full bg-[#0f6e56] text-white h-12 rounded-xl font-bold text-sm tracking-wide shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {verifyOtp.isPending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify & Continue"}
                </button>

                {/* Timer + resend */}
                <div className="flex flex-col items-center gap-2">
                  {!timerExpired && (
                    <div className="flex items-center gap-2 text-xs font-medium text-[#3f4944]">
                      <span>Resend code in</span>
                      <span className="text-[#005440] font-bold tabular-nums">{timer}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={!timerExpired || sendOtp.isPending}
                    className={`text-sm font-bold transition-all
                      ${timerExpired ? "text-[#005440] hover:underline cursor-pointer" : "text-[#3f4944] opacity-40 cursor-not-allowed"}`}
                  >
                    {sendOtp.isPending ? "Resending…" : "Resend OTP"}
                  </button>
                </div>
              </div>

              {/* Back */}
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtpValue("");
                  setOtpError(undefined);
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-[#3f4944] hover:text-[#005440] transition-colors"
              >
                {Icons.arrowBack} Edit Phone Number
              </button>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="h-1.5 w-full bg-[#ebefeb]">
          <div className="h-full bg-[#005440] transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>
    </div>
  );
}
