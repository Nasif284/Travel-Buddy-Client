"use client"
import OTPVerificationCard from "../components/OTPVerificationCard";
import { useSendOtp, useVerifyOtp } from "../hooks/auth.hooks";

export default function ForgotPasswordVerifyPage() {
  const email = localStorage.getItem("email");

  const verify = useVerifyOtp();

  const resend = useSendOtp();

  return (
    <OTPVerificationCard
      email={email ?? ""}
      onVerify={(code) =>
        verify.mutate({
          email: email ?? "",
          code,
          purpose: "password_reset",
        })
      }
      onResend={() =>
        resend.mutate({
          email: email ?? "",
          purpose: "password_reset",
        })
      }
    />
  );
}
