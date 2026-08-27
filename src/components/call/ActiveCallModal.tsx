"use client";

import { useEffect, useRef, useState } from "react";
import { useCallStore } from "@/src/store/call.store";
import { useLeaveCall } from "@/src/features/user/call/hooks/hooks";
import { useAuthStore } from "@/src/store/auth.store";

export default function ActiveCallModal() {
  const currentUserId = useAuthStore((state) => state.user?.id);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const status = useCallStore((state) => state.status);
  const activeCall = useCallStore((state) => state.activeCall);
  const localStream = useCallStore((state) => state.localStream);
  const remoteStream = useCallStore((state) => state.remoteStream);

  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => {
    if (!localStream) return;

    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsMuted(!isMuted);
  };
  const [isCameraOff, setIsCameraOff] = useState(false);

  const toggleCamera = () => {
    if (!localStream) return;

    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    setIsCameraOff(!isCameraOff);
  };
  const leaveCall = useLeaveCall();

  const handleLeave = async () => {
    if (!activeCall) return;

    try {
      await leaveCall.mutateAsync(activeCall.callId);

      useCallStore.getState().clearCall();
    } catch (error) {
      console.error("[Call] Failed to leave:", error);
    }
  };
  useEffect(() => {
    if (!localVideoRef.current) return;

    localVideoRef.current.srcObject = localStream;
  }, [localStream]);

  useEffect(() => {
    if (!remoteVideoRef.current) return;

    remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  useEffect(() => {
    if (!remoteAudioRef.current) return;

    remoteAudioRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  if (!activeCall || (status !== "CONNECTING" && status !== "ACTIVE")) {
    return null;
  }

  const isVideo = activeCall.mediaType === "VIDEO";

  const isCaller = activeCall.callerId === currentUserId;

  const remoteName = isCaller ? activeCall.recipientName : activeCall.callerName;

  const remoteImage = isCaller ? activeCall.recipientProfileImage : activeCall.callerProfileImage;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-neutral-900">
        {/* Remote video */}
        {isVideo && remoteStream ? (
          <video ref={remoteVideoRef} autoPlay playsInline className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-white">
            <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-neutral-700 text-3xl">{remoteImage ? <img src={remoteImage} alt={remoteName ?? "User"} className="h-full w-full object-cover" /> : (remoteName?.charAt(0).toUpperCase() ?? "U")}</div>

            <p className="text-xl font-semibold">{remoteName ?? "Unknown user"}</p>

            <p className="mt-2 text-sm text-neutral-400">{status === "CONNECTING" ? "Connecting..." : "Connected"}</p>
          </div>
        )}

        {/* Local video */}
        {isVideo && localStream && <video ref={localVideoRef} autoPlay muted playsInline className="absolute right-4 top-4 h-32 w-48 rounded-xl border border-white/20 bg-black object-cover shadow-lg" />}

        {/* Connecting indicator */}
        {status === "CONNECTING" && <div className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">Connecting...</div>}

        {/* Controls */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-4">
          <button onClick={toggleMute} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
            {isMuted ? "🔇" : "🎤"}
          </button>
          {activeCall.mediaType === "VIDEO" && <button onClick={toggleCamera}>{isCameraOff ? "📷" : "📹"}</button>} {activeCall.mediaType === "AUDIO" && <audio ref={remoteAudioRef} autoPlay />}
          <button onClick={handleLeave} className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600">
            📞
          </button>
        </div>
      </div>
    </div>
  );
}
