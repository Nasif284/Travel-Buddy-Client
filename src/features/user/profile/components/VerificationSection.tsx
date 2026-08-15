"use client";

import { useState } from "react";
import DocumentUploadModal from "./DocumentUploadModal";
import PhoneVerificationModal from "./PhoneVerificatiionModal";
import { useGetDocVerificationStatus } from "../hooks/profile.hooks";

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

const BadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const CheckCircle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

type IdVerificationStatus = "not_submitted" | "processing" | "under_review" | "approved" | "rejected" | "resubmission_requested";
interface VerificationSectionProps {
  phoneVerified?: boolean;
  verifiedPhone?: string;
}

export default function VerificationSection({ phoneVerified = false, verifiedPhone = "" }: VerificationSectionProps) {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const { data: docVerificationData, isLoading } = useGetDocVerificationStatus();
  const idStatus = (docVerificationData?.data?.status?.code as IdVerificationStatus) ?? "not_submitted";
  


  function handleDocSuccess() {
    // setIdStatus("pending");
  }

  function maskPhone(phone: string): string {
    if (!phone) return "+1 ••• ••• 42";
    const last3 = phone.slice(-3);
    return `${phone.slice(0, 3)} ••• ••• ${last3}`;
  }

const idStatusConfig: Record<
  IdVerificationStatus,
  {
    label: string;
    sublabel: string;
    actionLabel: string | null;
    itemClass: string;
    iconClass: string;
    badgeClass: string;
  }
> = {
  not_submitted: {
    label: "ID not verified",
    sublabel: "Submit a document to verify your identity",
    actionLabel: "Verify now",
    itemClass: "",
    iconClass: "bg-stone-100 text-stone-400",
    badgeClass: "",
  },

  processing: {
    label: "Documents processing",
    sublabel: "We're extracting information from your documents.",
    actionLabel: null,
    itemClass: "",
    iconClass: "bg-blue-100 text-blue-600",
    badgeClass: "bg-blue-100 text-blue-600",
  },

  under_review: {
    label: "Under review",
    sublabel: "Your documents are being reviewed by our team.",
    actionLabel: null,
    itemClass: "",
    iconClass: "bg-amber-100 text-amber-600",
    badgeClass: "bg-amber-100 text-amber-600",
  },

  approved: {
    label: "ID verified",
    sublabel: "Your identity has been successfully verified.",
    actionLabel: "Update",
    itemClass: "",
    iconClass: "bg-[#0f6e56]/10 text-[#005440]",
    badgeClass: "bg-[#c9eadb] text-[#005440]",
  },

  rejected: {
    label: "Verification rejected",
    sublabel: "Your documents couldn't be verified.",
    actionLabel: "Resubmit",
    itemClass: "",
    iconClass: "bg-[#ffdad6] text-[#ba1a1a]",
    badgeClass: "bg-[#ffdad6] text-[#ba1a1a]",
  },

  resubmission_requested: {
    label: "Resubmission required",
    sublabel: "Please upload clearer or updated documents.",
    actionLabel: "Resubmit",
    itemClass: "",
    iconClass: "bg-orange-100 text-orange-600",
    badgeClass: "bg-orange-100 text-orange-600",
  },
};

  const idCfg = idStatusConfig[idStatus];
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h2 className="text-lg font-bold mb-5 flex items-center gap-2 font-headline">
        <span className="text-[#005440]">
          <ShieldCheck />
        </span>
        Verification Status
      </h2>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
            ${phoneVerified ? "bg-[#0f6e56]/10 text-[#005440]" : "bg-stone-100 text-stone-400"}`}
          >
            <PhoneIcon />
          </div>
          <div>
            {phoneVerified ? (
              <>
                <p className="text-sm font-bold text-[#005440] flex items-center gap-1">
                  Phone verified
                  <span className="text-[#005440]">
                    <CheckCircle />
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-[#3f4944]">{maskPhone(verifiedPhone)}</p>
                  <button onClick={() => setPhoneModalOpen(true)} className="text-xs text-[#005440] font-semibold hover:underline">
                    Update
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-stone-500">Phone not verified</p>
                <button onClick={() => setPhoneModalOpen(true)} className="text-xs text-[#005440] font-semibold hover:underline">
                  Verify now
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${idCfg.iconClass}`}>{["processing", "under_review"].includes(idStatus) ? <ClockIcon /> : <BadgeIcon />}</div>
          <div>
            <p
              className={`text-sm font-bold flex items-center gap-1.5
              ${idStatus === "approved" ? "text-[#005440]" : idStatus === "processing" || idStatus === "under_review" ? "text-amber-600" : idStatus === "rejected" ? "text-[#ba1a1a]" : "text-stone-500"}`}
            >
              {idCfg.label}
              {idStatus === "approved" && (
                <span className="text-[#005440]">
                  <CheckCircle />
                </span>
              )}
              {idStatus === "processing" ||
                (idStatus === "under_review" && (
                  <span className="flex gap-0.5 ml-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </span>
                ))}
            </p>
            <p className="text-xs text-[#3f4944] max-w-[200px] leading-relaxed">{idCfg.sublabel}</p>
            {idCfg.actionLabel && (
              <button onClick={() => setDocModalOpen(true)} className="text-xs text-[#005440] font-semibold hover:underline mt-0.5 block">
                {idCfg.actionLabel}
              </button>
            )}
          </div>
        </div>
      </div>

      {phoneModalOpen && <PhoneVerificationModal onClose={() => setPhoneModalOpen(false)}  />}
      {docModalOpen && <DocumentUploadModal onClose={() => setDocModalOpen(false)} onSuccess={handleDocSuccess} />}
    </>
  );
}
