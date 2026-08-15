
export interface ChatRequestDTO {
    message: string;
}

export interface AssistantChat {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
}

export interface GetChatsResponseDTO {
    chats: AssistantChat[];
}
export interface Props {
    onSendMessage: (dto: ChatRequestDTO) => Promise<AssistantChat>;
    fetchHistory?: () => Promise<GetChatsResponseDTO>;
    userAvatar?: string;
}
