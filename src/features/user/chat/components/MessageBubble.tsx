"use client";

import { useEffect, useState } from "react";
import { ChatMessageDTO } from "../interfaces/interface";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

interface MessageBubbleProps {
  message: ChatMessageDTO;
  avatar: string;
  senderName: string;
  currentUserId: string;
}

export default function MessageBubble({ message, avatar, senderName, currentUserId }: MessageBubbleProps) {
  const sentByCurrentUser = message.senderId === currentUserId;

  const messageContent = message.type === "IMAGE" && message.attachment ? <ImageMessage message={message} /> : <div className="text-sm leading-relaxed">{message.content}</div>;

  if (sentByCurrentUser) {
    return (
      <div className="flex max-w-[80%] self-end flex-col items-end gap-1">
        <div className="rounded-2xl rounded-br-none bg-primary-container px-4 py-3 text-white">{messageContent}</div>

        <span className="mr-1 text-[10px] text-outline">{timeFormatter.format(new Date(message.createdAt))}</span>
      </div>
    );
  }

  return (
    <div className="flex max-w-[80%] gap-3">
      <img src={avatar} alt={senderName} className="mt-auto h-8 w-8 rounded-full object-cover" />

      <div className="flex flex-col gap-1">
        <div className="rounded-2xl rounded-bl-none bg-surface-container-highest px-4 py-3">{messageContent}</div>

        <span className="ml-1 text-[10px] text-outline">{timeFormatter.format(new Date(message.createdAt))}</span>
      </div>
    </div>
  );
}

function ImageMessage({ message }: { message: ChatMessageDTO }) {
  const [isOpen, setIsOpen] = useState(false);

  const attachment = message.attachment;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!attachment?.url) {
    return (
      <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-surface-container">
        <span className="text-xs text-outline">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {/* Image inside message */}
      <button type="button" onClick={() => setIsOpen(true)} className="block cursor-zoom-in overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" aria-label="View image">
        <img src={attachment.url} alt={attachment.fileName ?? "Shared image"} className="max-h-80 max-w-[280px] rounded-xl object-cover transition-transform duration-200 hover:scale-[1.02]" />
      </button>

      {/* Full-screen image modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm" onClick={() => setIsOpen(false)} role="dialog" aria-modal="true" aria-label="Image preview">
          {/* Close button */}
          <button type="button" onClick={() => setIsOpen(false)} className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20" aria-label="Close image">
            ×
          </button>

          {/* Image container */}
          <div className="relative flex max-h-[90vh] max-w-[90vw] items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img src={attachment.url} alt={attachment.fileName ?? "Shared image"} className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </>
  );
}
