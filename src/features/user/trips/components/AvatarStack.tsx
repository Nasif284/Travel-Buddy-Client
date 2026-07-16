import { GroupMembers } from "../interfaces/interface";

export default function AvatarStack({ members }: { members: GroupMembers[] }) {
  const visibleMembers = members.slice(0, 4);
  const extra = Math.max(0, members.length - 4);

  return (
    <div className="flex">
      {visibleMembers.map((m, i) => (
        <div key={m.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden" style={{ marginLeft: i > 0 ? "-0.75rem" : 0 }}>
          <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover" />
        </div>
      ))}

      {extra > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0f6e56] flex items-center justify-center text-[10px] font-bold text-white" style={{ marginLeft: "-0.75rem" }}>
          +{extra}
        </div>
      )}
    </div>
  );
}
