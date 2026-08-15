export interface ChatMessageDTO {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface MessagesResponseDTO {
  messages: ChatMessageDTO[];
}

export interface ConversationUser {
  id: string;
  name: string;
  profileImage?: string;
}

export interface Conversation {
  conversationId: string;

  user: ConversationUser;

  lastMessage?: {
    content: string;
    createdAt: Date;
  };

  updatedAt: Date;
}
