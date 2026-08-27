"use client";

import { useEffect } from "react";
import { onIncomingCall, onGroupCallIncoming, onCallParticipantJoined, onCallParticipantLeft, onCallDeclined, onCallCancelled, onCallEnded, onCallError } from "@/src/socket/call/call.socket";
import { useCallStore } from "@/src/store/call.store";
import DirectWebRTCController from "./DirectWebRTCController";
import GroupWebRTCController from "./GroupWebRTCController";

export default function CallProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const cleanupIncoming = onIncomingCall((call) => {
      console.log("[CallProvider] Direct incoming:", call);

      useCallStore.getState().setIncomingCall({
        ...call,
        scope: "DIRECT",
      });
    });

    const cleanupGroupIncoming = onGroupCallIncoming((call) => {
      console.log("[CallProvider] Group incoming:", call);
      useCallStore.getState().setIncomingCall({
        ...call,
        scope: "TRIP_GROUP",
      });
    });

  const cleanupParticipantJoined = onCallParticipantJoined((data) => {
    console.log("[CallProvider] Participant joined:", data);

    const state = useCallStore.getState();

    if (state.activeCall?.callId !== data.callId) {
      return;
    }

    if (state.activeCall.scope === "TRIP_GROUP") {
      state.setConnecting();

      const existingParticipant = state.groupParticipants.some((participant) => participant.userId === data.userId);

      if (!existingParticipant) {
        state.setGroupParticipants([
          ...state.groupParticipants,
          {
            userId: data.userId,
            name: data.name,
            profileImage: data.profileImage,
          },
        ]);
      }

      return;
    }

    state.setConnecting();
  });

    const cleanupParticipantLeft = onCallParticipantLeft((data) => {
      console.log("[CallProvider] Participant left:", data);

      const state = useCallStore.getState();

      if (state.activeCall?.callId !== data.callId) {
        return;
      }

      if (state.activeCall.scope === "DIRECT") {
        state.clearCall();
        return;
      }
    });

    const cleanupDeclined = onCallDeclined((data) => {
      console.log("[CallProvider] Call declined:", data);

      const state = useCallStore.getState();

      if (state.activeCall?.callId === data.callId) {
        state.clearCall();
      }
    });

    const cleanupCancelled = onCallCancelled((data) => {
      console.log("[CallProvider] Call cancelled:", data);

      const state = useCallStore.getState();

      if (state.activeCall?.callId === data.callId) {
        state.clearCall();
      }
    });

    const cleanupEnded = onCallEnded((data) => {
      console.log("[CallProvider] Call ended:", data);

      const state = useCallStore.getState();

      if (state.activeCall?.callId === data.callId) {
        state.clearCall();
      }
    });

    const cleanupError = onCallError((data) => {
      console.error("[CallProvider] Call error:", data.message);
    });

    return () => {
      cleanupIncoming();
      cleanupGroupIncoming();
      cleanupParticipantJoined();
      cleanupParticipantLeft();
      cleanupDeclined();
      cleanupCancelled();
      cleanupEnded();
      cleanupError();
    };
  }, []);

  return (
    <>
      <DirectWebRTCController />
      <GroupWebRTCController />
      {children}
    </>
  );
}
