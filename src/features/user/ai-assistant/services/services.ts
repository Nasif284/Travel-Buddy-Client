import { userApi  as api} from "@/src/lib/api-client"

export const aiAssistantServices = {
    chat: async (data: { message: string }) => {
        const res = await api.post("/ai/assistant/chat", data)
        return res.data
    },
    getChats: async () => {
        const res = await api.get("/ai/assistant/chats")
        return res.data
    }
}