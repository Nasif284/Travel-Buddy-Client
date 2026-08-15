import { BotIcon } from "lucide-react";

export default function TypingIndicator() {
    return (
        <div className="flex gap-3 max-w-3xl">
            <div className="w-10 h-10 rounded-full bg-[#c9eadb] flex items-center justify-center flex-shrink-0">
                <BotIcon />
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-headline text-xs font-semibold text-[#3f4944]">Assistant</span>
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-[#bec9c3]/20 shadow-sm">
                    <div className="flex gap-1.5 items-center h-5">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-[#005440]/40 animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}