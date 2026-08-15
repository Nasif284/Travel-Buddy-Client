"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "../components/MessageBubble";
import TypingIndicator from "../components/TypingIndicator";
import { useChatWithAi, useGetAiChats } from "../hooks/hooks";


const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74Z" />
    </svg>
);
const AddIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
);


export default function ChatAssistant() {
    const { data, isLoading: aiLoading } = useGetAiChats()
    const { mutate: chatWithAi, isPending: chatLoading } = useChatWithAi()
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data, chatLoading]);

    const handleInput = () => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 128) + "px";
    };

    const send = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || chatLoading) return;
        chatWithAi({ message: text })
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send(input);
        }
    };
    if (aiLoading) {
        return <h1>Loading...</h1>
    }
    const chats = data?.data?.chats
    console.log(data)
    return (

        <section className="flex-1 mt-20 justify-center ml-64 flex flex-col relative h-full bg-[#f7faf6]">

            {/* Header */}
            <div className="px-8 py-5 flex items-center justify-between border-b border-[#bec9c3]/20 bg-white/80 backdrop-blur-md z-10 sticky top-0">
                <div>
                    <h1 className="font-headline text-xl font-bold text-[#005440] tracking-tight">AI Travel Assistant</h1>
                    <p className="text-sm text-[#3f4944] mt-0.5">Powered by Travel Buddy</p>
                </div>
            </div>

            {/* Chat scroll area */}
            <div
                className="flex-1 w-full items-center  overflow-y-auto p-8 flex flex-col gap-6 "
                style={{marginBottom: "120px", scrollbarWidth: "thin", scrollbarColor: "#bec9c3 transparent"}}
            >
                {aiLoading && (
                    <div className="flex items-center justify-center py-12 text-[#6f7a74] text-sm">
                        Loading conversation…
                    </div>
                )}
                <div className="flex flex-col items-end">
                    {!aiLoading && chats.length > 0 &&
                        chats.map((chat, i) => {
                            // Attach suggestions only to the last assistant message (in demo: index 2)
                            const isLastAssistant =
                                chat.role === "assistant" &&
                                !chats.slice(i + 1).some((c) => c.role === "assistant");

                            return (

                                <MessageBubble
                                    key={chat.id}
                                    chat={chat}
                                    userAvatar={""}
                                    onSuggestion={(s) => send(s)}
                                />


                            );
                        })}

                    {chatLoading && <TypingIndicator />}
                </div>
               
                <div ref={bottomRef} />
            </div>

            {/* Input bar — sticky at bottom */}
            <div style={{ left: "150px", bottom: 0 }} className="fixed w-full px-6 pb-6 pt-10 bg-gradient-to-t from-[#f7faf6] via-[#f7faf6]/90 to-transparent" >
                <div className="max-w-3xl mx-auto w-full items-center justify-center">
                    <div className="bg-[#e0e3e0] rounded-2xl p-2 flex items-end shadow-sm border border-[#bec9c3]/20 focus-within:bg-white focus-within:border-[#005440]/40 transition-all">
                        <button
                            type="button"
                            aria-label="Attach"
                            className="p-3 text-[#3f4944] hover:text-[#005440] transition-colors flex-shrink-0"
                        >
                            <AddIcon />
                        </button>

                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={input}
                            onChange={(e) => { setInput(e.target.value); handleInput(); }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about destinations, itineraries, or travel tips…"
                            className="w-full bg-transparent border-none focus:ring-0 outline-none resize-none max-h-32 py-3 px-2 text-sm text-[#181d1a] placeholder:text-[#6f7a74]/60"
                        />

                        <button
                            type="button"
                            onClick={() => send(input)}
                            disabled={!input.trim() || chatLoading}
                            aria-label="Send"
                            className="p-3 bg-[#005440] text-white rounded-xl hover:bg-[#0f6e56] transition-all flex-shrink-0 ml-2 mb-1 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
                        >
                            <SendIcon />
                        </button>
                    </div>

                    <p className="text-center text-[10px] text-[#6f7a74]/70 mt-2">
                        AI Assistant can make mistakes. Verify important travel details.
                    </p>
                </div>
            </div>
        </section>
    );
}