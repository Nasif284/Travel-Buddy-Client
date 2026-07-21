import { ExpenseMemberReportDTO } from "../interface/interface";


function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function MemberAvatar({ member, size = 32 }: { member: ExpenseMemberReportDTO; size?: number }) {
  if (member.avatarUrl) {
    return <img src={member.avatarUrl} alt={member.fullName} width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />;
  }
  return (
    <div className="rounded-full bg-[#005440]/10 flex items-center justify-center text-[#005440] font-bold text-xs" style={{ width: size, height: size }}>
      {initials(member.fullName)}
    </div>
  );
}
