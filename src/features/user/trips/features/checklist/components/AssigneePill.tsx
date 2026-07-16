export default function AssigneePill({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="flex items-center gap-2 bg-[#c9eadb]/30 pr-3 pl-1 py-1 rounded-full flex-shrink-0">
      {avatar && <img src={avatar} alt={name} className="w-6 h-6 rounded-full object-cover" />}
      <span className="text-[10px] font-bold text-[#4d6b5f] uppercase">{name}</span>
    </div>
  );
}