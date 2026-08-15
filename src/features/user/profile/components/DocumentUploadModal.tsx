"use client";

import { useState } from "react";
import { DocType, DocumentUploadModalProps, MAX_SIZE_MB, UploadedFile, UploadStep } from "../interfaces/profile.interface";
import StepDots from "./DotSteps";
import UploadZone from "./UploadZone";
import { useSubmitVerifyDocs } from "../hooks/profile.hooks";

const Icons = {
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  image: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  passport: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
    </svg>
  ),
  idCard: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <circle cx="9" cy="13" r="2" />
      <path d="M15 13h2" />
      <path d="M15 17h2" />
      <path d="M5 17h6" />
    </svg>
  ),
  license: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="7" y1="15" x2="7" y2="15" />
      <line x1="11" y1="15" x2="17" y2="15" />
    </svg>
  ),
  arrowLeft: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  info: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  file: (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
};

export const DOC_TYPES: {
  id: DocType;
  label: string;
  description: string;
  icon: React.ReactNode;
  hasTwoSides: boolean;
}[] = [
  {
    id: "passport",
    label: "Passport",
    description: "Photo page of your valid passport",
    icon: Icons.passport,
    hasTwoSides: false,
  },
  {
    id: "national_id",
    label: "National ID",
    description: "Front and back of your national identity card",
    icon: Icons.idCard,
    hasTwoSides: true,
  },
  {
    id: "drivers_license",
    label: "Driver's License",
    description: "Front and back of your driving licence",
    icon: Icons.license,
    hasTwoSides: true,
  },
];

export default function DocumentUploadModal({ onClose, onSuccess }: DocumentUploadModalProps) {
  const [step, setStep] = useState<UploadStep>("select_type");
  const [docType, setDocType] = useState<DocType | null>(null);
  const [frontFile, setFrontFile] = useState<UploadedFile | null>(null);
  const [backFile, setBackFile] = useState<UploadedFile | null>(null);

  const selectedDoc = DOC_TYPES.find((d) => d.id === docType);
  const hasTwoSides = selectedDoc?.hasTwoSides ?? false;

  const STEPS: UploadStep[] = hasTwoSides ? ["select_type", "upload_front", "upload_back", "review", "success"] : ["select_type", "upload_front", "review", "success"];
  const stepIndex = STEPS.indexOf(step);

  function handleFile(file: File, side: "front" | "back") {
    const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
    const uploaded: UploadedFile = { file, preview, side };
    if (side === "front") setFrontFile(uploaded);
    else setBackFile(uploaded);
  }

  function removeFile(side: "front" | "back") {
    if (side === "front") {
      frontFile && URL.revokeObjectURL(frontFile.preview);
      setFrontFile(null);
    } else {
      backFile && URL.revokeObjectURL(backFile.preview);
      setBackFile(null);
    }
  }

  function goNext() {
    if (step === "select_type" && docType) setStep("upload_front");
    else if (step === "upload_front") setStep(hasTwoSides ? "upload_back" : "review");
    else if (step === "upload_back") setStep("review");
    else if (step === "review") handleSubmit();
  }

  function goBack() {
    if (step === "upload_front") setStep("select_type");
    else if (step === "upload_back") setStep("upload_front");
    else if (step === "review") setStep(hasTwoSides ? "upload_back" : "upload_front");
  }

  const submit = useSubmitVerifyDocs();
  async function handleSubmit() {
    if (!docType || !frontFile) return;
    const formData = new FormData();
    formData.append("documentTypeCode", docType);
    formData.append("front", frontFile.file);
    if (backFile) formData.append("back", backFile.file);
    submit.mutate(formData, {
      onSuccess: () => {
        setStep("success");
      },
    });
  }

  const canProceed = (step === "select_type" && !!docType) || (step === "upload_front" && !!frontFile) || (step === "upload_back" && !!backFile) || step === "review";

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(24,29,26,0.5)" }} onClick={handleBackdrop}>
      <div className="bg-[#f7faf6] w-full max-w-[560px] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-8 pt-8 pb-0">
          <div className="flex items-center gap-3">
            {step !== "select_type" && step !== "success" && (
              <button onClick={goBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e0e3e0] transition-colors text-[#3f4944]">
                {Icons.arrowLeft}
              </button>
            )}
            <div>
              <h2 className="text-2xl font-extrabold font-headline text-[#005440] tracking-tight leading-none">
                {step === "select_type" && "Verify Identity"}
                {step === "upload_front" && "Upload Front"}
                {step === "upload_back" && "Upload Back"}
                {step === "review" && "Review & Submit"}
                {step === "success" && "Submitted!"}
              </h2>
              {step !== "success" && (
                <p className="text-xs text-[#3f4944] mt-1">
                  {step === "select_type" && "Choose your ID document type"}
                  {step === "upload_front" && `Front of your ${selectedDoc?.label}`}
                  {step === "upload_back" && `Back of your ${selectedDoc?.label}`}
                  {step === "review" && "Make sure both sides are clear and legible"}
                </p>
              )}
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#e0e3e0] transition-colors text-[#3f4944] flex-shrink-0">
            {Icons.close}
          </button>
        </header>

        {/* ── Step dots (not on success) ──────────────────────── */}
        {step !== "success" && (
          <div className="px-8 pt-6">
            <StepDots total={STEPS.length} current={stepIndex} />
          </div>
        )}

        {/* ── Content ────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 [&::-webkit-scrollbar]:hidden">
          {/* ── Step 1: Select doc type ────────────────────── */}
          {step === "select_type" && (
            <div className="space-y-3">
              {DOC_TYPES.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setDocType(doc.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left
                    ${docType === doc.id ? "border-[#0f6e56] bg-[#c9eadb]/20" : "border-[#bec9c3]/30 bg-white hover:border-[#0f6e56]/40"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${docType === doc.id ? "bg-[#0f6e56] text-white" : "bg-[#e0e3e0] text-[#3f4944]"}`}
                  >
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#181d1a] text-sm">{doc.label}</p>
                    <p className="text-xs text-[#3f4944] mt-0.5">{doc.description}</p>
                    {doc.hasTwoSides && <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f6e56] mt-1 block">Requires front & back</span>}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                    ${docType === doc.id ? "bg-[#0f6e56] border-[#0f6e56]" : "border-[#bec9c3]"}`}
                  >
                    {docType === doc.id && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}

              {/* Tips */}
              <div className="bg-[#e5f2ee] rounded-2xl p-4 mt-4 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#005440] flex items-center gap-1.5">{Icons.info} Tips for a successful verification</p>
                <ul className="text-xs text-[#3f4944] space-y-1.5 ml-1">
                  {["Ensure the document is valid and not expired", "All four corners of the document must be visible", "Take the photo in good lighting with no glare", "Make sure all text is sharp and legible"].map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <span className="text-[#0f6e56] mt-0.5 flex-shrink-0">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ── Step 2: Upload front ──────────────────────── */}
          {step === "upload_front" && (
            <div className="space-y-6">
              <UploadZone side="front" file={frontFile} onFile={handleFile} onRemove={removeFile} />
              <p className="text-xs text-[#3f4944] flex items-start gap-2 bg-[#f1f4f1] p-3 rounded-xl">
                {Icons.info}
                <span>Ensure the document is flat, well-lit, and all four corners are visible. Max file size {MAX_SIZE_MB} MB.</span>
              </p>
            </div>
          )}

          {/* ── Step 3: Upload back (two-sided only) ──────── */}
          {step === "upload_back" && (
            <div className="space-y-6">
              <UploadZone side="back" file={backFile} onFile={handleFile} onRemove={removeFile} />
              <p className="text-xs text-[#3f4944] flex items-start gap-2 bg-[#f1f4f1] p-3 rounded-xl">
                {Icons.info}
                <span>Flip the document and capture the back side clearly.</span>
              </p>
            </div>
          )}

          {/* ── Step 4: Review ────────────────────────────── */}
          {step === "review" && (
            <div className="space-y-6">
              <div className={`grid gap-4 ${hasTwoSides ? "grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"}`}>
                {frontFile && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">Front</p>
                    <div className="rounded-xl overflow-hidden aspect-[3/2] bg-[#e0e3e0]">
                      {frontFile.file.type.startsWith("image/") ? (
                        <img src={frontFile.preview} alt="Front" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#005440]">
                          {Icons.file}
                          <span className="text-xs font-semibold text-[#3f4944]">{frontFile.file.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {backFile && hasTwoSides && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">Back</p>
                    <div className="rounded-xl overflow-hidden aspect-[3/2] bg-[#e0e3e0]">
                      {backFile.file.type.startsWith("image/") ? (
                        <img src={backFile.preview} alt="Back" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#005440]">
                          {Icons.file}
                          <span className="text-xs font-semibold text-[#3f4944]">{backFile.file.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="bg-[#f1f4f1] rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#3f4944] font-medium">Document type</span>
                  <span className="font-bold text-[#181d1a]">{selectedDoc?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3f4944] font-medium">Files</span>
                  <span className="font-bold text-[#181d1a]">{hasTwoSides ? "2 sides" : "1 file"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#3f4944] font-medium">Size</span>
                  <span className="font-bold text-[#181d1a]">{(((frontFile?.file.size ?? 0) + (backFile?.file.size ?? 0)) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>

              <p className="text-xs text-[#3f4944] text-center leading-relaxed">By submitting, you confirm these documents are genuine and belong to you. Verification typically takes 24–48 hours.</p>
            </div>
          )}

          {/* ── Success ────────────────────────────────────── */}
          {step === "success" && (
            <div className="flex flex-col items-center text-center py-8 gap-5">
              <div className="w-20 h-20 bg-[#c9eadb] rounded-full flex items-center justify-center text-[#005440]">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold font-headline text-[#181d1a]">Documents Submitted</h3>
                <p className="text-[#3f4944] leading-relaxed max-w-xs">
                  We have received your <span className="font-bold text-[#005440]">{selectedDoc?.label}</span>. Our team will review it within <span className="font-bold">24–48 hours</span>.
                </p>
              </div>
              <div className="bg-[#e5f2ee] rounded-2xl p-5 w-full text-left space-y-3">
                {[
                  { step: "1", label: "Document submitted", done: true, active: false },
                  { step: "2", label: "Under review by our team", done: false, active: true },
                  { step: "3", label: "Verification complete", done: false, active: false },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0
                      ${item.done ? "bg-[#0f6e56] text-white" : item.active ? "bg-[#0f6e56]/20 text-[#0f6e56] ring-2 ring-[#0f6e56]/30" : "bg-[#e0e3e0] text-[#6f7a74]"}`}
                    >
                      {item.done ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        item.step
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium
                      ${item.done || item.active ? "text-[#005440] font-semibold" : "text-[#6f7a74]"}`}
                    >
                      {item.label}
                    </span>
                    {item.active && (
                      <span className="ml-auto flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                          <span key={i} className="w-1.5 h-1.5 bg-[#0f6e56]/60 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  onSuccess?.(docType!);
                  onClose();
                }}
                className="w-full h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:bg-[#005440] transition-colors"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* ── Footer CTA (hidden on success) ─────────────────── */}
        {step !== "success" && (
          <footer className="px-8 pb-8 pt-2 border-t border-[#bec9c3]/10 flex-shrink-0">
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed || submit.isPending}
              className="w-full h-14 bg-[#0f6e56] text-white font-bold text-base rounded-xl
                hover:bg-[#005440] active:scale-[0.98] transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-3 shadow-lg shadow-[#0f6e56]/20"
            >
              {submit.isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading…
                </>
              ) : step === "review" ? (
                "Submit for verification"
              ) : (
                "Continue"
              )}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
