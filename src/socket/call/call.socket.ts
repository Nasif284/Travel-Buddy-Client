import { getSocket } from "../socket";

export type CallMediaType = "AUDIO" | "VIDEO";
export type CallScope = "DIRECT" | "TRIP_GROUP";

export interface IncomingCall {
  callId: string;
  callerId: string;
  callerName: string;
  callerProfileImage: string | null;
  mediaType: CallMediaType;
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
}

export interface CallParticipantJoined {
  callId: string;
  userId: string;
  name: string;
  profileImage: string | null;
}

export interface CallParticipantLeft {
  callId: string;
  userId: string;
}

export interface CallDeclined {
  callId: string;
  userId: string;
}

export interface CallCancelled {
  callId: string;
  callerId: string;
}

export interface CallEnded {
  callId: string;
}

export interface CallRoomJoined {
  callId: string;
}

export interface CallError {
  message: string;
}

export interface CallOffer {
  callId: string;
  senderUserId: string;
  offer: RTCSessionDescriptionInit;
}

export interface CallAnswer {
  callId: string;
  senderUserId: string;
  answer: RTCSessionDescriptionInit;
}

export interface CallIceCandidate {
  callId: string;
  senderUserId: string;
  candidate: RTCIceCandidateInit;
}

export function onIncomingCall(callback: (call: IncomingCall) => void) {
  const socket = getSocket();
  socket.on("call:incoming", callback);
  return () => {
    socket.off("call:incoming", callback);
  };
}

export function onGroupCallIncoming(callback: (call: GroupCallIncoming) => void) {
  const socket = getSocket();
  socket.on("call:group-incoming", callback);
  return () => {
    socket.off("call:group-incoming", callback);
  };
}

export function onCallParticipantJoined(callback: (data: CallParticipantJoined) => void) {
  const socket = getSocket();
  socket.on("call:participant-joined", callback);

  return () => {
    socket.off("call:participant-joined", callback);
  };
}

export function onCallParticipantLeft(callback: (data: CallParticipantLeft) => void) {
  const socket = getSocket();
  socket.on("call:participant-left", callback);
  return () => {
    socket.off("call:participant-left", callback);
  };
}

export function onCallDeclined(callback: (data: CallDeclined) => void) {
  const socket = getSocket();
  socket.on("call:declined", callback);
  return () => {
    socket.off("call:declined", callback);
  };
}

export function onCallCancelled(callback: (data: CallCancelled) => void) {
  const socket = getSocket();
  socket.on("call:cancelled", callback);
  return () => {
    socket.off("call:cancelled", callback);
  };
}

export function onCallEnded(callback: (data: CallEnded) => void) {
  const socket = getSocket();
  socket.on("call:ended", callback);
  return () => {
    socket.off("call:ended", callback);
  };
}

export function onCallRoomJoined(callback: (data: CallRoomJoined) => void) {
  const socket = getSocket();
  socket.on("call:room-joined", callback);
  return () => {
    socket.off("call:room-joined", callback);
  };
}

export function onCallError(callback: (data: CallError) => void) {
  const socket = getSocket();
  socket.on("call:error", callback);
  return () => {
    socket.off("call:error", callback);
  };
}

export function joinCallRoom(callId: string) {
  const socket = getSocket();
  socket.emit("call:join-room", callId);
}

export function leaveCallRoom(callId: string) {
  const socket = getSocket();
  socket.emit("call:leave-room", callId);
}

export function onCallOffer(callback: (data: CallOffer) => void) {
  const socket = getSocket();
  socket.on("call:offer", callback);
  return () => {
    socket.off("call:offer", callback);
  };
}

export function onCallAnswer(callback: (data: CallAnswer) => void) {
  const socket = getSocket();
  socket.on("call:answer", callback);
  return () => {
    socket.off("call:answer", callback);
  };
}

export function onCallIceCandidate(callback: (data: CallIceCandidate) => void) {
  const socket = getSocket();
  socket.on("call:ice-candidate", callback);
  return () => {
    socket.off("call:ice-candidate", callback);
  };
}

export function sendCallOffer(callId: string, targetUserId: string, offer: RTCSessionDescriptionInit) {
  getSocket().emit("call:offer", {
    callId,
    targetUserId,
    offer,
  });
}

export function sendCallAnswer(callId: string, targetUserId: string, answer: RTCSessionDescriptionInit) {
  getSocket().emit("call:answer", {
    callId,
    targetUserId,
    answer,
  });
}

export function sendCallIceCandidate(callId: string, targetUserId: string, candidate: RTCIceCandidateInit) {
  getSocket().emit("call:ice-candidate", {
    callId,
    targetUserId,
    candidate,
  });
}