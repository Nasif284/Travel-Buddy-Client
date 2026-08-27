import { AssistantChat } from "../interfaces/interfaces";
import FormattedMessage from "./FormattedMessage";
export const BotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#005440]">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);
export default function MessageBubble({ chat, userAvatar, suggestions, onSuggestion }: { chat: AssistantChat; userAvatar?: string; suggestions?: string[]; onSuggestion?: (s: string) => void }) {
  const isUser = chat.role === "user";

  if (isUser) {
    return (
      <div className="w-full flex justify-end">
        <div className="flex gap-3 max-w-3xl self-end flex-row-reverse">
          <div className="flex flex-col gap-1 items-end">
            <span className="font-headline text-xs font-semibold text-[#3f4944]">You</span>
            <div className="bg-[#005440] text-white p-4 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-sm">{chat.content}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start">
      <div className="flex self-start gap-3 max-w-3xl">
        <div className="w-10 h-10 rounded-full bg-[#c9eadb] flex items-center justify-center flex-shrink-0">
          <BotIcon />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-headline text-xs font-semibold text-[#3f4944]">Assistant</span>
          <div className="bg-white p-5 rounded-2xl rounded-tl-sm border border-[#bec9c3]/20 text-[#181d1a] shadow-sm">
            <FormattedMessage content={chat.content} />
          </div>
          {suggestions && suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => onSuggestion?.(s)} className={`px-4 py-2 rounded-full text-xs font-semibold font-headline transition-colors ${i < 2 ? "bg-[#c9eadb] text-[#4d6b5f] hover:bg-[#adcebf]" : "bg-[#e5e9e5] text-[#3f4944] hover:bg-[#e0e3e0] border border-[#bec9c3]/30"}`}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
