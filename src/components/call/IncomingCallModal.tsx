"use client";

import { useDeclineCall, useJoinCall } from "@/src/features/user/call/hooks/hooks";

import { CallIcon, VideoIcon } from "@/src/features/user/trips/features/chat/utils/icons";
import { useAuthStore } from "@/src/store/auth.store";
import { useCallStore } from "@/src/store/call.store";

export default function IncomingCallModal() {
  const incomingCall = useCallStore((state) => state.incomingCall);
  const currentUserId = useAuthStore((state) => state.user?.id);
  const setConnecting = useCallStore((state) => state.setConnecting);
  const clearCall = useCallStore((state) => state.clearCall);
  const setGroupParticipants = useCallStore((state) => state.setGroupParticipants);
const { mutateAsync: joinCall, isPending: isJoining } = useJoinCall();
  const { mutate: declineCall, isPending: isDeclining } = useDeclineCall();
  if (!incomingCall) {
    return null;
  }

  const isGroupCall = incomingCall.scope === "TRIP_GROUP";

  const image = isGroupCall ? incomingCall.groupCoverUrl : incomingCall.callerProfileImage;

  const displayName = isGroupCall ? (incomingCall.groupName ?? "Group call") : incomingCall.callerName;

const handleAccept = async () => {
  console.log("[IncomingCallModal] ACCEPT CLICKED");
  console.log("[IncomingCallModal] callId:", incomingCall.callId);
  console.log("[IncomingCallModal] scope:", incomingCall.scope);

  try {
    console.log("[IncomingCallModal] Calling joinCall mutation...");
    const response = await joinCall(incomingCall.callId);
    console.log("[IncomingCallModal] ✅ JOIN SUCCESS");
    console.log("[IncomingCallModal] Participants:", response.data.call.participants);
    if (incomingCall.scope === "TRIP_GROUP") {
      const participants = response.data.call.participants
        .filter((participant: { status: string; userId: string }) => participant.status === "JOINED" && participant.userId !== currentUserId)
        .map(
          (participant: {
            status: string;
            userId: string;
            user: {
              fullName: string;
              avatarUrl: string;
            };
          }) => ({
            userId: participant.userId,
            name: participant.user.fullName,
            profileImage: participant.user.avatarUrl,
          }),
        );
      console.log("[IncomingCallModal] Mapped participants:", participants);
      setGroupParticipants(participants);
      console.log("[IncomingCallModal] Group participants stored");
    }
    setConnecting();
  } catch (error) {
    console.error("[IncomingCallModal] ❌ Failed to join call:", error);

    clearCall();
  }
};

  const handleDecline = () => {
    if (isGroupCall) {
      clearCall();
      return;
    }
    declineCall(incomingCall.callId, {
      onSuccess: () => {
        clearCall();
      },
    });
  };

  const isBusy = isJoining || isDeclining;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-surface p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-5">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-surface-container">{image ? <img src={image} alt={displayName} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-2xl font-bold">{displayName.charAt(0).toUpperCase()}</div>}</div>

            <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">{incomingCall.mediaType === "VIDEO" ? <VideoIcon /> : <CallIcon />}</span>
          </div>

          {/* Call type */}
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{isGroupCall ? `Incoming group ${incomingCall.mediaType.toLowerCase()} call` : `Incoming ${incomingCall.mediaType.toLowerCase()} call`}</p>

          {/* Name */}
          <h2 className="mt-2 text-2xl font-bold">{displayName}</h2>

          {/* Description */}
          <p className="mt-1 text-sm text-on-surface-variant">{isGroupCall ? `${incomingCall.callerName} started a group call` : "is calling you"}</p>

          {/* Actions */}
          <div className="mt-8 flex w-full gap-4">
            <button type="button" disabled={isBusy} onClick={handleDecline} className="flex flex-1 items-center justify-center rounded-2xl bg-surface-container-highest px-5 py-3 text-sm font-bold text-on-surface transition hover:bg-surface-container-high disabled:opacity-50">
              {isDeclining ? "Declining..." : "Decline"}
            </button>

            <button type="button" disabled={isBusy} onClick={handleAccept} className="flex flex-1 items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary/90 disabled:opacity-50">
              {isJoining ? "Joining..." : "Accept"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
