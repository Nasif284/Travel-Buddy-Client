"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { AttachmentIcon, CallIcon, GroupIcon, SearchIcon, SendIcon, SmileIcon, VideoIcon } from "../utils/icons";
import HeaderAction from "../components/HeaderAction";
import { ChatMessage } from "../components/ChatMessage";
import { useGetConversationId } from "../hooks/hooks";
import { useGetMessages } from "@/src/features/user/chat/hooks/hooks";
import { useChatSocket } from "@/src/features/user/chat/hooks/socketHooks";
import { sendMessage } from "@/src/socket/chat/chat.socket";
import { useAuthStore } from "@/src/store/auth.store";
import { ChatMessageDTO } from "../interfaces/interfaces";
import GroupCallSections from "../components/GroupCallSections";

export default function GroupChatPage() {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const { id: groupId } = useParams<{ id: string }>();
  const { data, isLoading } = useGetConversationId(groupId);
  const conversationId = data?.data?.conversationId;

  const { data: messagesData, isLoading: messagesLoading } = useGetMessages(conversationId);
  const messages = messagesData?.data?.messages;

  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages?.length]);

  useChatSocket({ conversationId });

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;
    sendMessage(conversationId, content);
    setContent("");
  }
  if (isLoading || messagesLoading) {
    return <h2>Loading...</h2>;
  }
  console.log(messages);
  return (
    <section className="flex h-130 min-h-[360px] flex-col overflow-hidden rounded-xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm">
      {" "}
      <header className="shrink-0 flex items-center justify-between border-b border-outline-variant/10 bg-white/80 p-4 backdrop-blur-md">
        {" "}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-primary">
            <GroupIcon />
          </div>

          <div>
            <h1 className="font-headline text-base font-bold text-on-surface">Group chat</h1>
            <p className="text-xs text-outline">Alex, Sarah, Mark + 3 others</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <GroupCallSections groupId={groupId} groupName={"Trip Group"} />
          <HeaderAction label="Search chat">
            <SearchIcon />
          </HeaderAction>
        </div>
      </header>
      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          {messages.map((message: ChatMessageDTO) => (
            <ChatMessage key={message.id} message={message} profile={message.sender} currentUserId={currentUserId!} />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSend} className="shrink-0 border-t border-outline-variant/10 bg-surface-container-low/30 p-6">
        {" "}
        <div className="flex items-center gap-4">
          {/* <img src={senderProfiles[currentUserId].profileImage} alt="Your profile" className="h-10 w-10 shrink-0 rounded-full object-cover" /> */}

          <div className="relative flex-1">
            <input value={content} onChange={(event) => setContent(event.target.value)} className="h-12 w-full rounded-md border-0 bg-surface-container-highest px-4 pr-12 text-sm outline-none ring-primary-container transition-shadow focus:ring-2" placeholder="Type a message..." />
          </div>

          <div className="flex gap-2">
            <button type="button" aria-label="Add emoji" className="p-2 text-outline transition-colors hover:text-primary">
              <SmileIcon />
            </button>

            <button type="button" aria-label="Attach file" className="p-2 text-outline transition-colors hover:text-primary">
              <AttachmentIcon />
            </button>

            <button type="submit" disabled={!content.trim()} aria-label="Send message" className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-container text-white shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
              <SendIcon />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
