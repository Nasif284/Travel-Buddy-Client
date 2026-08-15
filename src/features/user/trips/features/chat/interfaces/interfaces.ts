export type SenderProfile = {
  fullName: string;
  avatarUrl: string;
};
export interface ChatMessageDTO {
  id: string;
  conversationId: string;
  sender: {
    fullName: string;
    avatarUrl: string;
  };
  senderId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface MessagesResponseDTO {
  messages: ChatMessageDTO[];
}
