import { ChatMessageDTO } from "../interfaces/interface";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export default function MessageBubble({ message, avatar, senderName, currentUserId }: { message: ChatMessageDTO; avatar: string; senderName: string; currentUserId :string}) {
  const sentByCurrentUser = message.senderId === currentUserId;

  if (sentByCurrentUser) {
    return (
      <div className="flex max-w-[80%] self-end flex-col items-end gap-1">
        <div className="rounded-2xl rounded-br-none bg-primary-container px-4 py-3 text-sm leading-relaxed text-white">{message.content}</div>
        <span className="mr-1 text-[10px] text-outline">{timeFormatter.format(new Date(message.createdAt))}</span>
      </div>
    );
  }

  return (
    <div className="flex max-w-[80%] gap-3">
      <img src={avatar} alt={senderName} className="mt-auto h-8 w-8 rounded-full object-cover" />
      <div className="flex flex-col gap-1">
        <div className="rounded-2xl rounded-bl-none bg-surface-container-highest px-4 py-3 text-sm leading-relaxed">{message.content}</div>
        <span className="ml-1 text-[10px] text-outline">{timeFormatter.format(new Date(message.createdAt))}</span>
      </div>
    </div>
  );
}