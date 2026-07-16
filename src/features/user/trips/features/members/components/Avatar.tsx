export default function Avatar({ src, alt, size = 40, ring = false }: { src: string; alt: string; size?: number; ring?: boolean }) {
  return (
    <div className={`rounded-full overflow-hidden flex-shrink-0 ${ring ? "ring-2 ring-[#0f6e56]" : ""}`} style={{ width: size, height: size }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}