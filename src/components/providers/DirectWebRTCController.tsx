"use client";
import { useDirectWebRTC } from "@/src/features/user/call/hooks/useDirectWebRTC";

export default function DirectWebRTCController() {
  useDirectWebRTC();
  return null;
}
