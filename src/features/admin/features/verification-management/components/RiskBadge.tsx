export default function RiskBadge({ level }: { level: "LOW" | "MEDIUM" | "HIGH" | null }) {
  if (!level) return null;
  const map = {
    LOW: "bg-[#c9eadb] text-[#005440]",
    MEDIUM: "bg-amber-100 text-amber-700",
    HIGH: "bg-[#ffdad6] text-[#ba1a1a]",
  };
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${map[level]}`}>{level} Risk</span>;
}