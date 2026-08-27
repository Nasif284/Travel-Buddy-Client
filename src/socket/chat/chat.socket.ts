import { ChatImageAttachment } from "@/src/features/user/chat/interfaces/interface";
import { getSocket } from "../socket";

export function joinConversation(conversationId: string) {
  getSocket().emit("chat:join", conversationId);
}

export function leaveConversation(conversationId: string) {
  getSocket().emit("chat:leave", conversationId);
}

export function sendMessage(conversationId: string, content: string) {
  getSocket().emit("chat:send", {
    conversationId,
    type: "TEXT",
    content,
  });
}
export function sendImageMessage(conversationId: string, attachment: ChatImageAttachment) {
  getSocket().emit("chat:send", {
    conversationId,
    type: "IMAGE",
    attachment,
  });
}