import type { UserStatus } from "../interfaces/users.interfaces";

const styles: Record<UserStatus, string> = {
  active: "bg-green-100 text-green-700 border border-green-200",
  suspended: "bg-orange-100 text-orange-700 border border-orange-200",
  banned: "bg-red-100 text-red-700 border border-red-200",
};

export function UserStatusBadge({ status }: { status: UserStatus }) {
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${styles[status]}`}>{status}</span>;
}
