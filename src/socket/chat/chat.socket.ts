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
    content,
  });
}
