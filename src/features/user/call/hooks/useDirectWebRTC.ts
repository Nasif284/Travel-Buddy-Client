"use client";

import { useCallback, useEffect, useRef } from "react";

import { onCallAnswer, onCallIceCandidate, onCallOffer, onCallParticipantJoined } from "@/src/socket/call/call.socket";

import { useCallStore } from "@/src/store/call.store";
import { useAuthStore } from "@/src/store/auth.store";
import { WebRTCManager } from "@/src/webRtc/WebRTCManager";

export function useDirectWebRTC() {
  const managerRef = useRef<WebRTCManager | null>(null);
  const activeCall = useCallStore((state) => state.activeCall);
  const setLocalStream = useCallStore((state) => state.setLocalStream);
  const setRemoteStream = useCallStore((state) => state.setRemoteStream);
  const setActive = useCallStore((state) => state.setActive);
  const currentUserId = useAuthStore((state) => state.user?.id);

  const remoteUserId = activeCall && currentUserId && activeCall.scope === "DIRECT" ? (activeCall.callerId === currentUserId ? activeCall.recipientId : activeCall.callerId) : undefined;

  useEffect(() => {
    if (!activeCall) {
      return;
    }
    if (activeCall.scope !== "DIRECT") {
      return;
    }
    if (!remoteUserId) {
      return;
    }

    console.log("[WebRTC] Creating manager for call:", activeCall.callId);

    const manager = new WebRTCManager(
      activeCall.callId,
      remoteUserId,
      (stream) => {
        console.log("[WebRTC] Remote stream received");
        setRemoteStream(stream);
      },
      () => {
        console.log("[WebRTC] Connection established");
        setActive();
      },
    );

    managerRef.current = manager;

    return () => {
      console.log("[WebRTC] Destroying manager");
      manager.cleanup();
      managerRef.current = null;
    };
  }, [activeCall, remoteUserId, setRemoteStream, setActive]);


  const initialize = useCallback(async () => {
    if (!activeCall) {
      return;
    }
    if (activeCall.scope !== "DIRECT") {
      return;
    }
    const manager = managerRef.current;

    if (!manager) {
      throw new Error("WebRTC manager is not initialized.");
    }

    const stream = await manager.initializeLocalStream(activeCall.mediaType);
    setLocalStream(stream);
  }, [activeCall, setLocalStream]);


  const createOffer = useCallback(async () => {
    const manager = managerRef.current;
    if (!manager) {
      throw new Error("WebRTC manager is not initialized.");
    }
    await manager.createOffer();
  }, []);


  const handleParticipantJoined = useCallback(
    async (data: { callId: string; userId: string }) => {
      if (!activeCall) {
        return;
      }
      if (activeCall.scope !== "DIRECT") {
        return;
      }
      if (data.callId !== activeCall.callId) {
        return;
      }
      if (!currentUserId) {
        return;
      }
      if (activeCall.callerId !== currentUserId) {
        return;
      }

      try {
        console.log("[WebRTC] Participant joined.");
        useCallStore.getState().setConnecting();
        await initialize();
        await createOffer();
        console.log("[WebRTC] Offer created.");
      } catch (error) {
        console.error("[WebRTC] Failed to start negotiation:", error);
      }
    },
    [activeCall, currentUserId, initialize, createOffer],
  );

  const handleOffer = useCallback(
    async (data: { callId: string; senderUserId: string; offer: RTCSessionDescriptionInit }) => {
      const manager = managerRef.current;
      if (!manager) {
        return;
      }
      if (data.callId !== activeCall?.callId) {
        return;
      }

      try {
        console.log("[WebRTC] Offer received.");
        useCallStore.getState().setConnecting();
        await initialize();
        await manager.handleOffer(data.offer);
      } catch (error) {
        console.error("[WebRTC] Failed to handle offer:", error);
      }
    },
    [activeCall?.callId, initialize],
  );

  const handleAnswer = useCallback(
    async (data: { callId: string; senderUserId: string; answer: RTCSessionDescriptionInit }) => {
      const manager = managerRef.current;
      if (!manager) {
        return;
      }
      if (data.callId !== activeCall?.callId) {
        return;
      }
      try {
        console.log("[WebRTC] Answer received.");
        await manager.handleAnswer(data.answer);
      } catch (error) {
        console.error("[WebRTC] Failed to handle answer:", error);
      }
    },
    [activeCall?.callId],
  );

  const handleIceCandidate = useCallback(
    async (data: { callId: string; senderUserId: string; candidate: RTCIceCandidateInit }) => {
      const manager = managerRef.current;

      if (!manager) {
        return;
      }

      if (data.callId !== activeCall?.callId) {
        return;
      }

      try {
        await manager.handleIceCandidate(data.candidate);
      } catch (error) {
        console.error("[WebRTC] Failed to handle ICE candidate:", error);
      }
    },
    [activeCall?.callId],
  );


  useEffect(() => {
    const cleanupParticipantJoined = onCallParticipantJoined(handleParticipantJoined);
    const cleanupOffer = onCallOffer(handleOffer);
    const cleanupAnswer = onCallAnswer(handleAnswer);
    const cleanupIce = onCallIceCandidate(handleIceCandidate);

    return () => {
      cleanupParticipantJoined();
      cleanupOffer();
      cleanupAnswer();
      cleanupIce();
    };
  }, [handleParticipantJoined, handleOffer, handleAnswer, handleIceCandidate]);

  return {
    initialize,
    createOffer,
  };
}
