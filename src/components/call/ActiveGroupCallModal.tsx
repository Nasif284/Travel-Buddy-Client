"use client";

import { useCallStore } from "@/src/store/call.store";
import ParticipantVideo from "./ParticipantVideo";
import { useLeaveCall } from "@/src/features/user/call/hooks/hooks";

export default function ActiveGroupCallModal() {
  const status = useCallStore((state) => state.status);
  const activeCall = useCallStore((state) => state.activeCall);

  const localStream = useCallStore((state) => state.localStream);
  const remoteStreams = useCallStore((state) => state.groupRemoteStreams);

  const groupParticipants = useCallStore((state) => state.groupParticipants);
  console.log("groupParticipant:",groupParticipants);
  const isMuted = useCallStore((state) => state.isMuted);
  const isCameraOn = useCallStore((state) => state.isCameraOn);
  const setMuted = useCallStore((state) => state.setMuted);
  const setCameraOn = useCallStore((state) => state.setCameraOn);
  const toggleMute = () => {
    if (!localStream) return;

    const nextMuted = !isMuted;

    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !nextMuted;
    });

    setMuted(nextMuted);
  };
  const toggleCamera = () => {
    if (!localStream) return;

    const nextCameraOn = !isCameraOn;

    localStream.getVideoTracks().forEach((track) => {
      track.enabled = nextCameraOn;
    });

    setCameraOn(nextCameraOn);
  };
  const leaveCall = useLeaveCall();

  const handleLeave = async () => {
    if (!activeCall) return;

    try {
      await leaveCall.mutateAsync(activeCall.callId);

      useCallStore.getState().clearCall();
    } catch (error) {
      console.error("[GroupCall] Failed to leave:", error);
    }
  };
  if (!activeCall || activeCall.scope !== "TRIP_GROUP" || (status !== "CONNECTING" && status !== "ACTIVE")) {
    return null;
  }

  const remoteUsers = Object.entries(remoteStreams);
  console.log(remoteUsers)
  return (
    <div className="fixed inset-0 z-[1000] bg-black text-white">
      {/* Header */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-6">
        <div>
          <h2 className="text-lg font-bold">{activeCall.groupName ?? "Group call"}</h2>

          <p className="text-sm text-white/60">{remoteUsers.length + 1} participants</p>
        </div>

        <div className="rounded-full bg-white/10 px-4 py-2 text-sm">{status === "CONNECTING" ? "Connecting..." : "Connected"}</div>
      </div>

      {/* Participants */}
      <div className="flex h-full items-center justify-center p-6 pt-24 pb-32">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Local user */}
          <ParticipantVideo stream={localStream} name="You" muted isCameraOn={isCameraOn} />

          {remoteUsers.map(([userId, stream]) => {
            const participant = groupParticipants.find((p) => p.userId === userId);
            return <ParticipantVideo key={userId} stream={stream} name={participant?.name ?? "Participant"} isCameraOn={stream.getVideoTracks().some((track) => track.enabled)} />;
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-6">
        <button type="button" onClick={toggleMute} className="rounded-full bg-white/10 px-6 py-3">
          {isMuted ? "Unmute 🎤" : "Mute 🔇"}
        </button>

        {activeCall.mediaType === "VIDEO" && (
          <button type="button" onClick={toggleCamera} className="rounded-full bg-white/10 px-6 py-3">
            {isCameraOn ? "Camera off 📹" : "Camera on 📷"}
          </button>
        )}

        <button type="button" onClick={handleLeave} disabled={leaveCall.isPending} className="rounded-full bg-red-600 px-6 py-3">
          {leaveCall.isPending ? "Leaving..." : "Leave 📞"}
        </button>
      </div>
    </div>
  );
}
