"use client";
import { useState } from "react";
import PhoneVerificationModal from "./PhoneVerificatiionModal";

const ShieldCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.19 6.19l.95-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CheckCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const BadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

interface VerificationSectionProps {
  isPhoneVerified?: boolean;
  phone?: string | null;
}

const VerificationSection = ({ isPhoneVerified, phone }: VerificationSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  function maskPhone(phone: string): string {
    if (!phone) return "+1 ••• ••• 42";
    const last3 = phone.slice(-3);
    return `${phone.slice(0, 3)} ••• ••• ${last3}`;
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-5 flex items-center gap-2 font-headline">
        <span className="text-[#005440]">
          <ShieldCheck />
        </span>
        Verification Status
      </h2>

      <div className="flex flex-wrap items-center gap-10">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center
            ${isPhoneVerified ? "bg-[#0f6e56]/10 text-[#005440]" : "bg-stone-100 text-stone-400"}`}
          >
            <PhoneIcon />
          </div>
          <div>
            {isPhoneVerified ? (
              <>
                <p className="text-sm font-bold text-[#005440] flex items-center gap-1">
                  Phone verified
                  <span className="text-[#005440]">
                    <CheckCircle />
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-[#3f4944]">{maskPhone(phone!)}</p>
                  <button onClick={() => setModalOpen(true)} className="text-xs text-[#005440] font-semibold hover:underline">
                    Update
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-stone-500">Phone not verified</p>
                <button onClick={() => setModalOpen(true)} className="text-xs text-[#005440] font-semibold hover:underline">
                  Verify now
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <BadgeIcon />
          </div>
          <div>
            <p className="text-sm font-bold text-stone-500">ID not verified</p>
            <a href="#" className="text-xs text-[#005440] font-semibold hover:underline">
              Verify now
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && <PhoneVerificationModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default VerificationSection;
