"use client";

import { useEffect } from "react";

import { useCallStore } from "@/src/store/call.store";
import { useGroupWebRTC } from "@/src/features/user/call/hooks/useGroupWebRTC";

export default function GroupWebRTCController() {
  const status = useCallStore((state) => state.status);
  const activeCall = useCallStore((state) => state.activeCall);
  const groupParticipants = useCallStore((state) => state.groupParticipants);
  const groupParticipantIds = groupParticipants.map((participant) => participant.userId);
  const { initialize, connectToParticipants } = useGroupWebRTC();

  useEffect(() => {
    if (!activeCall) return;

    if (activeCall.scope !== "TRIP_GROUP") {
      return;
    }

    if (status !== "CONNECTING" && status !== "ACTIVE") {
      return;
    }

    initialize().catch((error) => {
      console.error("[GroupWebRTCController] Failed to initialize media:", error);
    });
  }, [activeCall, status, initialize]);

  useEffect(() => {
    if (!activeCall) return;

    if (activeCall.scope !== "TRIP_GROUP") {
      return;
    }

    if (status !== "CONNECTING" && status !== "ACTIVE") {
      return;
    }

    if (groupParticipantIds.length === 0) {
      return;
    }

    connectToParticipants(groupParticipantIds).catch((error) => {
      console.error("[GroupWebRTCController] Failed to connect participants:", error);
    });
  }, [activeCall?.callId, activeCall?.scope, status, groupParticipantIds, connectToParticipants]);

  return null;
}
