import { ChatMessageDTO, SenderProfile } from "../interfaces/interfaces";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});
export function ChatMessage({ message, profile, currentUserId }: { message: ChatMessageDTO; profile: SenderProfile; currentUserId: string }) {
  const isCurrentUser = message.senderId === currentUserId;

  if (isCurrentUser) {
    return (
      <div className="ml-auto flex max-w-[80%] flex-row-reverse gap-3">
        <div className="space-y-1 text-right">
          <span className="mr-1 text-[10px] font-bold text-outline">You · {timeFormatter.format(new Date(message.createdAt))}</span>
          <div className="rounded-2xl rounded-br-none bg-secondary-container px-4 py-3 text-sm leading-relaxed text-primary">{message.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-w-[80%] gap-3">
      <img src={profile.avatarUrl} alt={profile.fullName} className="mt-auto h-8 w-8 rounded-full object-cover" />

      <div className="space-y-1">
        <span className="ml-1 text-[10px] font-bold text-outline">
          {profile.fullName} · {timeFormatter.format(new Date(message.createdAt))}
        </span>
        <div className="rounded-2xl rounded-bl-none bg-surface-container-low px-4 py-3 text-sm leading-relaxed text-on-surface">{message.content}</div>
      </div>
    </div>
  );
}
