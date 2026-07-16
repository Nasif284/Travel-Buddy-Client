import { useState } from "react";
import { useGetInviteCode } from "../hooks/hooks";

export default function ShareLinkModal({ onClose, id }: { onClose: () => void; id: string }) {
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useGetInviteCode(id);
  const inviteCode = data?.data?.inviteCode;
  if (!isLoading) {
    console.log(data)
  }
  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white w-full max-w-md rounded-2xl p-6">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  const inviteLink = `${window.location.origin}/trips/groups/join/${inviteCode}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold">Share Invite</h3>

          <button onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm text-[#3f4944] mb-2">Invite Link</p>

            <div className="flex gap-2">
              <input readOnly value={inviteLink} className="flex-1 h-11 px-3 rounded-xl bg-[#f4f5f4]" />

              <button onClick={() => copyText(inviteLink)} className="px-4 rounded-xl bg-[#0f6e56] text-white">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[#eef8f4] p-4 text-sm text-[#005440]">Anyone with this invite link can request to join this travel group.</div>
        </div>
      </div>
    </div>
  );
}
