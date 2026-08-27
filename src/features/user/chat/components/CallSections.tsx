"use client";

import React from "react";
import ChatActionButton from "./ChatActionButton";
import { CallIcon, VideoIcon } from "../../trips/features/chat/utils/icons";

import { useCallStore } from "@/src/store/call.store";
import { useCreateDirectCall } from "../../call/hooks/hooks";


const CallSections = ({ userId, userName, userProfileImage }: { userId: string; userName: string; userProfileImage: string | null }) => {
  const createDirectCall = useCreateDirectCall();

  const setOutgoingCall = useCallStore((state) => state.setOutgoingCall);

  const handleCall = (mediaType: "AUDIO" | "VIDEO") => {
    if (createDirectCall.isPending) {
      return;
    }

    createDirectCall.mutate(
      {
        recipientId: userId,
        mediaType,
      },
      {
        onSuccess: (response) => {
          const call = response.data.call;

        setOutgoingCall({
          callId: call.id,
          scope: "DIRECT",
          mediaType: call.mediaType,
          callerId: call.callerId,
          recipientId: call.recipientId,
          recipientName: userName,
          recipientProfileImage: userProfileImage,
        });
        },
      },
    );
  };

  return (
    <>
      <ChatActionButton label="Call" onClick={() => handleCall("AUDIO")}>
        <CallIcon />
      </ChatActionButton>

      <ChatActionButton label="Start video call" onClick={() => handleCall("VIDEO")}>
        <VideoIcon />
      </ChatActionButton>
    </>
  );
};

export default CallSections;
