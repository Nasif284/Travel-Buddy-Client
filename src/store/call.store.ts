import { create } from "zustand";

export type CallStatus = "IDLE" | "OUTGOING" | "INCOMING" | "CONNECTING" | "ACTIVE" | "ENDING";

export type CallScope = "DIRECT" | "TRIP_GROUP";
export type CallMediaType = "AUDIO" | "VIDEO";
export interface GroupCallParticipant {
  userId: string;
  name: string;
  profileImage?: string | null;
}
export interface IncomingCall {
  callId: string;
  callerId: string;
  callerName: string;
  callerProfileImage: string | null;
  mediaType: CallMediaType;
  scope: "DIRECT";
}

export interface GroupCallIncoming {
  callId: string;
  callerId: string;
  callerName: string;
  callerProfileImage: string | null;
  tripGroupId: string;
  groupName: string;
  groupCoverUrl: string | null;
  mediaType: CallMediaType;
  scope: "TRIP_GROUP";
}

export type IncomingCallData = IncomingCall | GroupCallIncoming;

export interface ActiveCall {
  callId: string;
  scope: CallScope;
  mediaType: CallMediaType;

  callerId: string;
  callerName?: string;
  callerProfileImage?: string | null;

  recipientId?: string;
  recipientName?: string;
  recipientProfileImage?: string | null;

  tripGroupId?: string;
  groupName?: string;
  groupCoverUrl?: string | null;
}

interface CallState {
  status: CallStatus;

  activeCall: ActiveCall | null;
  incomingCall: IncomingCallData | null;

  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  groupRemoteStreams: Record<string, MediaStream>;

  isMuted: boolean;
  isCameraOn: boolean;

  groupParticipants: GroupCallParticipant[];

  setOutgoingCall: (call: ActiveCall) => void;
  setIncomingCall: (call: IncomingCallData) => void;
  clearIncomingCall: () => void;

  setConnecting: () => void;
  setActive: () => void;
  setEnding: () => void;

  setLocalStream: (stream: MediaStream | null) => void;
  setRemoteStream: (stream: MediaStream | null) => void;

  setGroupRemoteStream: (userId: string, stream: MediaStream) => void;
  removeGroupRemoteStream: (userId: string) => void;
  clearGroupRemoteStreams: () => void;

  setMuted: (muted: boolean) => void;
  setCameraOn: (enabled: boolean) => void;

  setGroupParticipants: (participants: GroupCallParticipant[]) => void;
  removeGroupParticipant: (userId: string) => void;

  clearCall: () => void;
}

export const useCallStore = create<CallState>((set) => ({
  status: "IDLE",
  activeCall: null,
  incomingCall: null,
  localStream: null,
  remoteStream: null,
  groupRemoteStreams: {},
  groupParticipants: [],
  isMuted: false,
  isCameraOn: false,

  setOutgoingCall: (call) =>
    set({
      status: "OUTGOING",
      activeCall: call,
      incomingCall: null,
      isMuted: false,
      isCameraOn: call.mediaType === "VIDEO",
    }),

  setIncomingCall: (call) =>
    set({
      status: "INCOMING",
      incomingCall: call,

      isMuted: false,
      isCameraOn: call.mediaType === "VIDEO",

      activeCall: {
        callId: call.callId,
        scope: call.scope,
        mediaType: call.mediaType,
        callerId: call.callerId,

        ...(call.scope === "DIRECT"
          ? {
              callerName: call.callerName,
              callerProfileImage: call.callerProfileImage,
              recipientId: undefined,
            }
          : {
              tripGroupId: call.tripGroupId,
              groupName: call.groupName,
              groupCoverUrl: call.groupCoverUrl,
            }),
      },
    }),

  clearIncomingCall: () =>
    set({
      incomingCall: null,
    }),

  setConnecting: () =>
    set({
      status: "CONNECTING",
    }),

  setActive: () =>
    set({
      status: "ACTIVE",
    }),

  setEnding: () =>
    set({
      status: "ENDING",
    }),

  setLocalStream: (stream) =>
    set({
      localStream: stream,
    }),

  setRemoteStream: (stream) =>
    set({
      remoteStream: stream,
    }),

  setMuted: (muted) =>
    set({
      isMuted: muted,
    }),

  setGroupRemoteStream: (userId, stream) =>
    set((state) => ({
      groupRemoteStreams: {
        ...state.groupRemoteStreams,
        [userId]: stream,
      },
    })),

  removeGroupRemoteStream: (userId) =>
    set((state) => {
      const streams = {
        ...state.groupRemoteStreams,
      };

      delete streams[userId];

      return {
        groupRemoteStreams: streams,
      };
    }),

  clearGroupRemoteStreams: () =>
    set({
      groupRemoteStreams: {},
    }),

  setCameraOn: (enabled) =>
    set({
      isCameraOn: enabled,
    }),
  setGroupParticipants: (participants) =>
    set({
      groupParticipants: participants,
    }),

  removeGroupParticipant: (userId) =>
    set((state) => ({
      groupParticipants: state.groupParticipants.filter((participant) => participant.userId !== userId),
    })),
  clearCall: () =>
    set((state) => {
      if (state.localStream) {
        state.localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (state.remoteStream) {
        state.remoteStream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      Object.values(state.groupRemoteStreams).forEach((stream) => {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      });

      return {
        status: "IDLE",
        activeCall: null,
        incomingCall: null,

        localStream: null,
        remoteStream: null,
        groupRemoteStreams: {},
        groupParticipantIds: [],

        isMuted: false,
        isCameraOn: false,
      };
    }),
}));
