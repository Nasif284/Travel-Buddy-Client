"use client";

import { useCallStore } from "@/src/store/call.store";
import OutgoingCallModal from "./OutgoingCallModal";
import IncomingCallModal from "./IncomingCallModal";
import ActiveCallModal from "./ActiveCallModal";
import ActiveGroupCallModal from "./ActiveGroupCallModal";

export default function CallModals() {
  const status = useCallStore((state) => state.status);
  const activeCall = useCallStore((state) => state.activeCall);

  console.log("[CallModals]", {
    status,
    activeCall,
    scope: activeCall?.scope,
  });

  if (status === "OUTGOING") {
    console.log("[CallModals] Rendering outgoing");
    return <OutgoingCallModal />;
  }

  if (status === "INCOMING") {
    console.log("[CallModals] Rendering incoming");
    return <IncomingCallModal />;
  }

  if ((status === "CONNECTING" || status === "ACTIVE") && activeCall) {
    console.log("[CallModals] Active branch");

    if (activeCall.scope === "DIRECT") {
      console.log("[CallModals] Rendering DIRECT ActiveCallModal");
      return <ActiveCallModal />;
    }

    if (activeCall.scope === "TRIP_GROUP") {
      console.log("[CallModals] Rendering GROUP ActiveGroupCallModal");
      return <ActiveGroupCallModal />;
    }
  }

  console.log("[CallModals] Rendering nothing");

  return null;
}