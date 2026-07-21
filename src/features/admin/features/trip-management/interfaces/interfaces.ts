export interface GroupMember {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface GroupData {
  id: string;
  name: string;
  dateTo: Date;
  dateFrom: Date;
  coverUrl: string;
  destination: string;
  budgetStyle: string;
  members: GroupMember[];
}

export interface GetGroupsRequestDTO {
  search: string;
  budgetStyle: string;
  tripStatus: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  limit: number;
}

export interface GroupMember {
  id: string;
  name: string;
  avatarUrl?: string;
  role?: "admin" | "member";
  joinedAt?: Date;
  tripCount?: number;
  reportCount?: number;
}

export interface GroupData {
  id: string;
  name: string;
  dateTo: Date;
  dateFrom: Date;
  coverUrl: string;
  destination: string;
  budgetStyle: string;
  members: GroupMember[];
}
