import { useState } from "react";
import { getStatus, timeAgo } from "./QueueCard";
import { GetVerificationDetailsResponseDTO } from "../interfaces/interfaces";
import { Icons } from "../utils/icons";
import RiskBadge from "./RiskBadge";
import AiCheckIcon from "./AiCheckicon";



function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(d: Date | string): string {
  return new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function VerificationDetail({ detail, onApprove, onReject, onRequestResubmit, isActioning }: { detail: GetVerificationDetailsResponseDTO; onApprove: () => void; onReject: (reason: string) => void; onRequestResubmit: (reason: string) => void; isActioning: boolean }) {
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const [resubmitNote, setResubmitNote] = useState("");
  const [showReject, setShowReject] = useState(false);
  const [showResubmit, setShowResubmit] = useState(false);

  const { user, verification, documents, aiAnalysis, extractedData, timeline } = detail;
  console.log("verification:", verification);
  const status = getStatus(verification.status.code);
  const isPending = verification.status.code === "pending" || verification.status.code === "under_review";

  const verifyItems = [
    { icon: Icons.mail, label: "Email", ok: user.isEmailVerified },
    { icon: Icons.phone, label: "Phone", ok: user.isPhoneVerified },
    { icon: Icons.id, label: "ID", ok: user.isIdVerified },
  ];

  const extractedRows = [
    { label: "Full Name", value: extractedData.fullName },
    { label: "Document Number", value: extractedData.documentNumber },
    { label: "Nationality", value: extractedData.nationality },
    { label: "Gender", value: extractedData.gender },
    { label: "Date of Birth", value: extractedData.dateOfBirth ? formatDate(extractedData.dateOfBirth) : null },
    { label: "Issuing Country", value: extractedData.issuingCountry },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Scrollable body ─────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden">
        {/* User card */}
        <section className="bg-white rounded-xl p-5 border border-[#bec9c3]/15 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#c9eadb] flex-shrink-0">{user.avatarUrl ? <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-lg font-black text-[#005440]">{user.fullName.slice(0, 2).toUpperCase()}</div>}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-base font-bold text-[#1c1c1a]">{user.fullName}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.badge}`}>{status.label}</span>
              </div>
              <p className="text-xs text-[#6f7a74] mb-2">
                {user.email} · {user.phone ?? "No phone"}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-[#6f7a74] flex-wrap">
                <span className="flex items-center gap-1">
                  {Icons.calendar} Joined {formatDate(user.joinedAt)}
                </span>
                <span>·</span>
                <span>{user.accountAgeInDays} days old account</span>
                {user.country && (
                  <>
                    <span>·</span>
                    <span>{user.country}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Verification chips */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f6f3ef]">
            {verifyItems.map(({ icon, label, ok }) => (
              <span
                key={label}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold
                  ${ok ? "bg-[#c9eadb] text-[#005440]" : "bg-[#e5e2de] text-[#6f7a74]"}`}
              >
                {icon} {label} {ok ? "✓" : "✗"}
              </span>
            ))}
            <span className="ml-auto text-[10px] text-[#6f7a74] flex items-center gap-1">
              {Icons.clock} Submitted {timeAgo(verification.submittedAt)}
            </span>
          </div>
        </section>

        {/* Document images */}
        <section className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">Documents</h4>
          <div className={`grid gap-3 ${documents.front && documents.back ? "grid-cols-2" : "grid-cols-1"}`}>
            {documents.front && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f7a74]">Front</p>
                <div className="aspect-[3/2] rounded-xl overflow-hidden border border-[#bec9c3]/20 cursor-zoom-in" onClick={() => setActiveImg(documents.front!.imageUrl)}>
                  <img src={documents.front.imageUrl} alt="Front" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            )}
            {documents.back && (
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6f7a74]">Back</p>
                <div className="aspect-[3/2] rounded-xl overflow-hidden border border-[#bec9c3]/20 cursor-zoom-in" onClick={() => setActiveImg(documents.back!.imageUrl)}>
                  <img src={documents.back.imageUrl} alt="Back" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            )}
          </div>
          <p className="text-[10px] text-[#6f7a74] text-center">Click image to enlarge</p>
        </section>

        {/* AI analysis */}
        <section className="bg-white rounded-xl p-5 border border-[#bec9c3]/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">AI Analysis</h4>
            <RiskBadge level={aiAnalysis.overallRiskLevel} />
          </div>

          {/* Score bars */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#f6f3ef] rounded-lg p-3">
              <p className="text-[10px] text-[#6f7a74] font-medium mb-1.5">Risk Score</p>
              <p className="text-2xl font-black text-[#1c1c1a]">
                {aiAnalysis.overallRiskScore ?? "—"}
                <span className="text-sm font-medium text-[#6f7a74]">/100</span>
              </p>
              {aiAnalysis.overallRiskScore !== null && (
                <div className="w-full h-1.5 bg-[#e5e2de] rounded-full mt-2">
                  <div className={`h-full rounded-full ${aiAnalysis.overallRiskScore < 30 ? "bg-[#005440]" : aiAnalysis.overallRiskScore < 70 ? "bg-amber-500" : "bg-[#ba1a1a]"}`} style={{ width: `${aiAnalysis.overallRiskScore}%` }} />
                </div>
              )}
            </div>
            <div className="bg-[#f6f3ef] rounded-lg p-3">
              <p className="text-[10px] text-[#6f7a74] font-medium mb-1.5">OCR Confidence</p>
              <p className="text-2xl font-black text-[#1c1c1a]">
                {aiAnalysis.ocrConfidence ?? "—"}
                <span className="text-sm font-medium text-[#6f7a74]">%</span>
              </p>
              {aiAnalysis.ocrConfidence !== null && (
                <div className="w-full h-1.5 bg-[#e5e2de] rounded-full mt-2">
                  <div className="h-full bg-[#005440] rounded-full" style={{ width: `${aiAnalysis.ocrConfidence}%` }} />
                </div>
              )}
            </div>
          </div>

          {/* AI checks */}
          <div className="space-y-2">
            {aiAnalysis.checks?.length &&
              aiAnalysis.checks.map((check, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-[#f6f3ef] rounded-lg">
                  <AiCheckIcon status={check.status} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-xs font-bold text-[#1c1c1a]">{check.title}</p>
                      {check.confidence !== undefined && <span className="text-[10px] text-[#6f7a74] flex-shrink-0">{check.confidence}%</span>}
                    </div>
                    <p className="text-[11px] text-[#6f7a74] leading-relaxed">{check.message}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Extracted data */}
        <section className="bg-white rounded-xl overflow-hidden border border-[#bec9c3]/15 shadow-sm">
          <div className="bg-[#ebe8e4] px-5 py-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">Extracted Data</h4>
          </div>
          <table className="w-full text-xs">
            <tbody>
              {extractedRows
                .filter((r) => r.value)
                .map(({ label, value }) => (
                  <tr key={label} className="border-b border-[#f6f3ef] last:border-0 hover:bg-[#f6f3ef] transition-colors">
                    <th className="px-5 py-3 text-left font-semibold text-[#6f7a74] w-2/5">{label}</th>
                    <td className="px-5 py-3 font-bold text-[#1c1c1a]">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        {/* Timeline */}
        <section className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">Timeline</h4>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#bec9c3]/30" />
            <div className="space-y-3">
              {timeline.map((item, i) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 z-10
                    ${i === 0 ? "bg-[#0f6e56] text-white" : "bg-[#e5e2de] text-[#6f7a74]"}`}
                  >
                    {i === 0 ? (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span className="w-2 h-2 bg-[#bec9c3] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-bold text-[#1c1c1a]">{item.title}</p>
                      <span className="text-[10px] text-[#6f7a74] flex-shrink-0">{formatDateTime(item.createdAt)}</span>
                    </div>
                    <p className="text-[11px] text-[#6f7a74] mt-0.5 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review notes if present */}
        {verification.reviewNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
            <p className="font-bold mb-1">Reviewer Notes</p>
            <p className="leading-relaxed">{verification.reviewNotes}</p>
          </div>
        )}
        {verification.rejectionReason && (
          <div className="bg-[#ffdad6]/40 border border-[#ba1a1a]/20 rounded-xl p-4 text-xs text-[#ba1a1a]">
            <p className="font-bold mb-1">Rejection Reason</p>
            <p className="leading-relaxed">{verification.rejectionReason}</p>
          </div>
        )}
      </div>

      {/* ── Action footer ───────────────────────────────────── */}
      {isPending && (
        <div className="flex-shrink-0 border-t border-[#bec9c3]/15 p-4 bg-white space-y-3">
          {/* Reject note textarea */}
          {showReject && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3f4944]">Reject Reason (required)</label>
              <textarea rows={2} value={rejectNote} onChange={(e) => setRejectNote(e.target.value)} placeholder="Describe why this document is being rejected..." className="w-full px-3 py-2 bg-[#f6f3ef] rounded-lg border border-[#bec9c3]/30 text-xs resize-none outline-none focus:ring-2 focus:ring-[#005440]/20 text-[#1c1c1a]" />
            </div>
          )}
          {showResubmit && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3f4944]">Resubmission Reason (required)</label>
              <textarea rows={2} value={resubmitNote} onChange={(e) => setResubmitNote(e.target.value)} placeholder="Describe why this document is being rejected..." className="w-full px-3 py-2 bg-[#f6f3ef] rounded-lg border border-[#bec9c3]/30 text-xs resize-none outline-none focus:ring-2 focus:ring-[#005440]/20 text-[#1c1c1a]" />
            </div>
          )}

          <div className="flex gap-2">
            {/* Resubmit */}

            {showResubmit ? (
              <button
                onClick={() => {
                  if (resubmitNote.trim()) {
                    onRequestResubmit(resubmitNote);
                    setShowResubmit(false);
                  }
                }}
                disabled={isActioning || !resubmitNote.trim()}
                className="flex-1 h-10 bg-amber-100 text-amber-700 font-bold text-xs rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50"
              >
                Confirm Resubmission
              </button>
            ) : (
              <button onClick={() => setShowResubmit(true)} disabled={isActioning} className="flex-1 h-10 bg-amber-100 text-amber-700 font-bold text-xs rounded-lg hover:bg-amber-200 transition-colors disabled:opacity-50">
                Request Resubmit
              </button>
            )}

            {/* Reject */}
            {showReject ? (
              <button
                onClick={() => {
                  if (rejectNote.trim()) {
                    onReject(rejectNote);
                    setShowReject(false);
                  }
                }}
                disabled={isActioning || !rejectNote.trim()}
                className="flex-1 h-10 bg-[#ba1a1a] text-white font-bold text-xs rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Confirm Reject
              </button>
            ) : (
              <button onClick={() => setShowReject(true)} className="flex-1 h-10 border-2 border-[#ba1a1a]/30 text-[#ba1a1a] font-bold text-xs rounded-lg hover:bg-[#ffdad6]/30 transition-colors">
                Reject
              </button>
            )}

            {/* Approve */}
            <button onClick={onApprove} disabled={isActioning} className="flex-1 h-10 bg-[#0f6e56] text-white font-bold text-xs rounded-lg hover:bg-[#005440] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5">
              {isActioning ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>{Icons.check} Approve</>}
            </button>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {activeImg && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out" onClick={() => setActiveImg(null)}>
          <img src={activeImg} alt="Document enlarged" className="max-w-full max-h-full rounded-xl object-contain shadow-2xl" />
        </div>
      )}
    </div>
  );
}
