export default function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="w-full h-2 bg-[#e5e9e5] rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
    </div>
  );
}
