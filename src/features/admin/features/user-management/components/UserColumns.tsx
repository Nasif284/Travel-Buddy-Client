
import type { Column } from "../../../../../components/table/DataTable";
import type { ActionMenuItem } from "../../../../../components/table/TableActionMenu";
import { TableActionMenu } from "../../../../../components/table/TableActionMenu";
import { UserStatusBadge } from "./UserStatusBadge";
import type { UserAction } from "./UsersActionModal";
import { User, UserStatus } from "../interfaces/users.interfaces";
import { VerifiedIcon } from "@/src/assets/icons";

export function getUserActions(user: User, onAction: (userId: string, action: UserAction) => void): ActionMenuItem[] {
  const items: ActionMenuItem[] = [];
  const s = user.accountStatusCode as UserStatus;

  if (s === "active") {
    items.push({
      label: "Suspend user",
      onClick: () => onAction(user.id, "suspend"),
      className: "hover:bg-orange-50 text-orange-700",
    });
  }

  if (s === "suspended") {
    items.push({
      label: "Activate user",
      onClick: () => onAction(user.id, "activate"),
      className: "hover:bg-green-50 text-green-700",
    });
  }

  if (s === "active" || s === "suspended") {
    items.push({
      label: "Ban user",
      onClick: () => onAction(user.id, "ban"),
      className: "hover:bg-red-50 text-red-700",
    });
  }

  if (s === "banned") {
    items.push({
      label: "Activate user",
      onClick: () => onAction(user.id, "activate"),
      className: "hover:bg-green-50 text-green-700",
    });
  }

  return items;
}


export function buildUserColumns(openMenuId: string | null, onToggleMenu: (id: string | null) => void, onAction: (userId: string, action: UserAction) => void): Column<User>[] {
  return [
    {
      key: "user",
      header: "User profile",
      render: (user) => (
        <div>
          <p className="font-bold text-[#1c1c1a]">{user.fullName}</p>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact details",
      render: (user) => <p className="text-[#1c1c1a] font-medium">{user.email}</p>,
    },
    {
      key: "joined",
      header: "Joined",
      align: "center",
      render: (user) => <span className="text-[#3f4944]">{new Date(user.createdAt).toLocaleDateString()}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (user) => <UserStatusBadge status={user.accountStatusCode as UserStatus} />,
    },
    {
      key: "verified",
      header: "Verified",
      align: "center",
      render: (user) => <VerifiedIcon filled={user.isEmailVerified} />,
    },
    {
      key: "action",
      header: "Action",
      width: "60px",
      render: (user) => <TableActionMenu rowId={user.id} openId={openMenuId} onToggle={onToggleMenu} items={getUserActions(user, onAction)} />,
    },
  ];
}
