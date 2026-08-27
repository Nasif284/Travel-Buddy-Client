"use client";

import { useCancelCall } from "@/src/features/user/call/hooks/hooks";
import { useCallStore } from "@/src/store/call.store";

export default function OutgoingCallModal() {
  const status = useCallStore((state) => state.status);
  const activeCall = useCallStore((state) => state.activeCall);
  const clearCall = useCallStore((state) => state.clearCall);
  const setEnding = useCallStore((state) => state.setEnding);

  const cancelCallMutation = useCancelCall();

  if (status !== "OUTGOING" || !activeCall) {
    return null;
  }

  const handleCancel = async () => {
    try {
      setEnding();

      await cancelCallMutation.mutateAsync(activeCall.callId);

      clearCall();
    } catch {
      // mutation handles the error toast
      // keep the call state intact if cancellation failed
    }
  };
const isGroupCall = activeCall.scope === "TRIP_GROUP";
const displayName = isGroupCall ? (activeCall.groupName ?? "Group call") : (activeCall.recipientName ?? "Unknown user");
const image = isGroupCall ? (activeCall.groupCoverUrl ?? null) : (activeCall.recipientProfileImage ?? null);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-surface p-8 shadow-2xl">
        {/* Header */}

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Calling</p>

          <h2 className="mt-2 text-xl font-bold">Waiting for answer...</h2>
        </div>

        {/* Avatar */}
        <div className="my-8 flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-surface-container-highest">{image ? <img src={image} alt={displayName} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-2xl font-bold">{displayName.charAt(0).toUpperCase()}</div>}</div>

            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-surface bg-primary" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">{displayName}</h2>

          <p className="mt-1 text-sm text-on-surface-variant">{activeCall.mediaType === "VIDEO" ? "Video calling..." : "Calling..."}</p>
        </div>

        {/* Call information */}

        <div className="text-center">
          <p className="font-bold">{activeCall.scope === "DIRECT" ? "Direct call" : "Group call"}</p>

          <p className="mt-1 text-sm text-on-surface-variant">{activeCall.mediaType === "VIDEO" ? "Video call" : "Audio call"}</p>
        </div>

        {/* Cancel */}

        <button type="button" onClick={handleCancel} disabled={cancelCallMutation.isPending} className="mt-8 w-full rounded-2xl bg-error px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {cancelCallMutation.isPending ? "Cancelling..." : "Cancel call"}
        </button>
      </div>
    </div>
  );
}
