"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AddCircleIcon, CallIcon, EditSquareIcon, InfoIcon, SearchIcon, SendIcon, SmileIcon, VideoIcon } from "../utils/icons";

import FilterButton from "../components/FilterButton";
import Avatar from "../components/Avatar";
import ChatActionButton from "../components/ChatActionButton";
import MessageBubble from "../components/MessageBubble";

import { ChatMessageDTO, Conversation } from "../interfaces/interface";

import { useChatSocket } from "../hooks/socketHooks";
import { sendImageMessage, sendMessage } from "@/src/socket/chat/chat.socket";

import { useGetConversations, useGetMessages, useUploadImage } from "../hooks/hooks";

import { useAuthStore } from "@/src/store/auth.store";
import EmptyConversations from "../components/EmptyMessages";
import CallSections from "../components/CallSections";

export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL is the source of truth
  const activeConversationId = searchParams.get("conversationId") ?? "";
  const currentUserId = useAuthStore((state) => state.user?.id);

  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messageText, setMessageText] = useState("");

  const { data: conversationsData, isLoading: convsLoading } = useGetConversations();
  const conversations = conversationsData?.data?.conversations ?? [];

  const { data, isLoading: messagesLoading } = useGetMessages(activeConversationId);
  const messages = data?.data?.messages ?? [];

  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  useChatSocket({
    conversationId: activeConversationId,
  });

  if (messagesLoading || convsLoading) {
    return <h2>Loading...</h2>;
  }

  if (conversations.length === 0) {
    return (
      <main className="ml-64 flex h-screen pt-20">
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="flex w-80 shrink-0 flex-col border-r border-outline-variant/30 bg-surface">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Messages</h1>

                <button type="button" aria-label="Start a new conversation" className="rounded-full bg-surface-container p-2 text-primary transition-colors hover:bg-surface-container-high">
                  <EditSquareIcon />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <EmptyConversations />
            </div>
          </aside>

          <section className="flex flex-1 items-center justify-center bg-surface-container-low">
            <div className="max-w-md px-8 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-secondary-container text-primary">
                <SendIcon />
              </div>

              <h2 className="text-xl font-bold">Your messages will appear here</h2>

              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Choose a traveler from your connections to start a private conversation.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const handleSend = () => {
    const content = messageText.trim();
    if (!content) return;
    sendMessage(activeConversationId, content);
    setMessageText("");
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("image", file);
      formData.append("conversationId", activeConversationId);

      const response = await uploadImage(formData);

      const attachment = response.data;

      sendImageMessage(activeConversationId, {
        storageKey: attachment.storageKey,
        fileName: attachment.fileName,
        mimeType: attachment.mimeType,
        fileSize: attachment.fileSize,
      });
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      event.target.value = "";
    }
  };

  const activeConversation = conversations.find((conversation: Conversation) => conversation.conversationId === activeConversationId) as Conversation;
  const visibleConversations = conversations;
  //   const visibleConversations = useMemo(() => {
  //     const normalizedSearch = search.trim().toLowerCase();

  //     return conversations.filter((conversation: Conversation) => {
  //       const matchesFilter = filter === "all" || conversation.unread;
  //       const matchesSearch = !normalizedSearch || conversation.name.toLowerCase().includes(normalizedSearch) || conversation.preview.toLowerCase().includes(normalizedSearch);

  //       return matchesFilter && matchesSearch;
  //     });
  //   }, [filter, search]);

  const activeMessages = messages.filter((message: ChatMessageDTO) => message.conversationId === activeConversationId);

  //   function sendMessage() {
  //     const content = messageText.trim();

  //     if (!content) return;

  //     setMessages((currentMessages) => [
  //       ...currentMessages,
  //       {
  //         id: crypto.randomUUID(),
  //         conversationId: activeConversationId,
  //         senderId: currentUserId,
  //         content,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       },
  //     ]);
  //     setMessageText("");
  //   }
  return (
    <main className="ml-64 flex h-screen pt-20">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="flex w-80 shrink-0 flex-col border-r border-outline-variant/30 bg-surface">
          <div className="p-6 pb-4">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
              <button type="button" aria-label="Start a new conversation" className="rounded-full bg-surface-container p-2 text-primary transition-colors hover:bg-surface-container-high active:scale-90">
                <EditSquareIcon />
              </button>
            </div>

            {/* <div className="relative mb-6">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-xl border-0 bg-surface-container-highest py-2.5 pl-10 pr-4 text-sm outline-none ring-primary/20 transition-shadow focus:ring-2" placeholder="Search conversations" />
            </div> */}

            {/* <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
              <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
                All
              </FilterButton>
              <FilterButton active={filter === "unread"} onClick={() => setFilter("unread")}>
                Unread
              </FilterButton>
            </div> */}
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto">
            {visibleConversations.map((conversation: Conversation) => (
              <button key={conversation.conversationId} type="button" onClick={() => router.push(`/messages?conversationId=${conversation.conversationId}`)} className={`flex h-[72px] w-full items-center gap-3 border-l-4 px-6 text-left transition-colors ${conversation.conversationId === activeConversationId ? "border-primary bg-secondary-container/30" : "border-transparent hover:bg-surface-container-low"}`}>
                <Avatar avatar={conversation.user.profileImage!} name={conversation.user.name} online={true} />

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="truncate text-sm font-bold">{conversation.user.name}</h2>
                    {/* <span className="shrink-0 text-[10px] font-medium text-outline">{conversation.lastMessage?.content}</span> */}
                  </div>
                  {/* <p className="truncate text-xs text-on-surface-variant">{conversation.preview}</p> */}
                </div>

                {/* {conversation.pinned && (
                  <span className="text-primary" aria-label="Pinned conversation">
                    <PinIcon />
                  </span>
                )} */}
              </button>
            ))}
          </div>
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-surface-container-low">
          {!activeConversation ? (
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="max-w-sm text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-secondary-container text-primary">
                  <SendIcon />
                </div>

                <h2 className="font-headline text-xl font-bold text-on-surface">Select a conversation</h2>

                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Choose a conversation from the list to view messages and continue planning your next adventure.</p>
              </div>
            </div>
          ) : (
            <>
              <header className="z-10 flex items-center justify-between bg-surface/80 px-8 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Avatar avatar={activeConversation.user.profileImage ?? ""} name={activeConversation.user.name} online />

                  <div>
                    <h2 className="text-base font-bold">{activeConversation.user.name}</h2>
                    {/* <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Online</span> */}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CallSections userId={activeConversation.user.id} userName={activeConversation.user.name} userProfileImage={activeConversation.user.profileImage!} />
                  {/* <ChatActionButton label="Conversation information" muted>
                    <InfoIcon />
                  </ChatActionButton> */}
                </div>
              </header>

              <div className="custom-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto px-8 py-6">
                <div className="self-center rounded-full bg-surface px-4 py-2 text-[11px] font-semibold text-on-surface-variant">You&apos;re connected with {activeConversation.user.name} · Bali trip</div>

                {activeMessages.map((message: ChatMessageDTO) => (
                  <MessageBubble key={message.id} currentUserId={currentUserId!} message={message} avatar={activeConversation.user.profileImage ?? ""} senderName={activeConversation.user.name} />
                ))}
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageSelect} />
              <footer className="bg-surface px-8 py-6">
                <div className="flex items-end gap-3 rounded-2xl border border-transparent bg-surface-container-highest p-2 pr-4 shadow-sm transition-colors focus-within:border-primary/20">
                  {/* <button type="button" aria-label="Add emoji" className="p-2 text-outline hover:text-primary">
                    <SmileIcon />
                  </button> */}

                  <button type="button" aria-label="Add attachment" disabled={isUploading} onClick={() => fileInputRef.current?.click()} className="p-2 text-outline hover:text-primary disabled:opacity-50">
                    <AddCircleIcon />
                  </button>

                  <textarea
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        handleSend();
                      }
                    }}
                    rows={1}
                    placeholder="Type a message..."
                    className="custom-scrollbar max-h-32 flex-1 resize-none border-0 bg-transparent py-2.5 text-sm outline-none focus:ring-0"
                  />

                  <button type="button" onClick={handleSend} disabled={!messageText.trim()} aria-label="Send message" className="rounded-xl bg-primary-container p-2.5 text-white transition-transform active:scale-95 disabled:opacity-50">
                    <SendIcon />
                  </button>
                </div>
              </footer>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
