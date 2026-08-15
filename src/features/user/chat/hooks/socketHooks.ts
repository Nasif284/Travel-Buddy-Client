import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChatMessageDTO } from "../interfaces/interface";
import { getSocket } from "@/src/socket/socket";
import { joinConversation, leaveConversation } from "@/src/socket/chat/chat.socket";

interface UseChatSocketProps {
  conversationId: string;
}

export function useChatSocket({ conversationId }: UseChatSocketProps) {
  const queryClient = useQueryClient();

  const handleMessage = useCallback(
    (message: ChatMessageDTO) => {
      console.log("[Chat] New message:", message);
      queryClient.setQueryData(
        ["messages", conversationId],
        (previous: {
          data: {
            messages: ChatMessageDTO[];
          };
        }) => {
          if (!previous) return previous;

          const messages = previous.data?.messages ?? [];

          if (messages.some((item: ChatMessageDTO) => item.id === message.id)) {
            return previous;
          }

          return {
            ...previous,
            data: {
              ...previous.data,
              messages: [...messages, message],
            },
          };
        },
      );
    },
    [conversationId, queryClient],
  );

  const handleError = useCallback((error: { message: string }) => {
    console.error("[Chat]", error.message);
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocket();

    joinConversation(conversationId);

    socket.on("chat:message", handleMessage);
    socket.on("chat:error", handleError);

    return () => {
      leaveConversation(conversationId);
      socket.off("chat:message", handleMessage);
      socket.off("chat:error", handleError);
    };
  }, [conversationId, handleMessage, handleError]);
}
