export default function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300
            ${i === current ? "w-6 h-2 bg-[#0f6e56]" : i < current ? "w-2 h-2 bg-[#0f6e56]/40" : "w-2 h-2 bg-[#e0e3e0]"}`}
        />
      ))}
    </div>
  );
}