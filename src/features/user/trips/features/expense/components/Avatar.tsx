export default function Avatar({ url, name, size = 48, grayscale = false, isCurrentUser = false }: { url?: string | null; name: string; size?: number; grayscale?: boolean; isCurrentUser?: boolean }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div style={{ width: size, height: size }} className={`rounded-full overflow-hidden border-2 ${isCurrentUser ? "border-[#005440]" : "border-[#e5e9e5]"} ${grayscale ? "grayscale opacity-50" : ""}`}>
        {url ? <img src={url} alt={name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#0f6e56]/10 flex items-center justify-center text-[#005440] font-bold text-xs">{initials}</div>}
      </div>
      {isCurrentUser && <span className="absolute -top-1 -right-1 bg-[#005440] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase leading-tight">You</span>}
    </div>
  );
}
