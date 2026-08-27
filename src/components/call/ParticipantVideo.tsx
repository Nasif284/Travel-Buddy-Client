"use client";

import { useEffect, useRef } from "react";

interface ParticipantVideoProps {
  stream: MediaStream | null;
  name: string;
  muted?: boolean;
  isCameraOn?: boolean;
}

export default function ParticipantVideo({ stream, name, muted = false, isCameraOn = true }: ParticipantVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const hasVideo = stream?.getVideoTracks().some((track) => track.readyState === "live") ?? false;

  const hasAudio = stream?.getAudioTracks().some((track) => track.readyState === "live") ?? false;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.srcObject = stream;

    return () => {
      video.srcObject = null;
    };
  }, [stream]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.srcObject = stream;

    return () => {
      audio.srcObject = null;
    };
  }, [stream]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-900">
      {/* Video is ALWAYS mounted */}
      <video ref={videoRef} autoPlay playsInline muted={muted} className={`h-full w-full object-cover ${hasVideo && isCameraOn ? "block" : "hidden"}`} />

      {/* Avatar when camera is off */}
      {(!hasVideo || !isCameraOn) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-700 text-2xl font-bold">{name.charAt(0).toUpperCase()}</div>
        </div>
      )}

      {/* Audio */}
      {hasAudio && <audio ref={audioRef} autoPlay muted={muted} />}

      {/* Name */}
      <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-3 py-1 text-sm">{name}</div>
    </div>
  );
}
