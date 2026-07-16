"use client";
import { useState, useEffect } from "react";
import { GroupInvite, INITIAL_INVITES, INITIAL_MEMBERS, Member, PendingInvite, TripMember } from "../interfaces/interfaces";
import StatusDot from "../components/StatusDot";
import MemberMenu from "../components/MembersMenu";
import InviteModal from "../../../components/InviteModal";
import ConfirmModal from "../components/ConfirmModal";
import AddConnectionsModal from "../components/AddConnectionsModal";
import ShareLinkModal from "../components/ShareLinkModal";
import { useChangeMemberRole, useGetInvites, useGetMembers, useInviteByEmail, useLeaveGroup, useRemoveMember } from "../hooks/hooks";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/src/store/auth.store";

const Icons = {
  calendar: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  group: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  dotsVertical: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  close: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

export default function MembersPage() {
  const { id } = useParams();
  const userId = useAuthStore((state) => state.user?.id);
  const [resendingEmail, setResendingEmail] = useState<string | null>(null);
  const { data, isLoading } = useGetMembers(id as string);
  const membersData = data?.data?.members;
  const { data: invitesData, isLoading: invitesLoading } = useGetInvites(id as string);
  const invites = invitesData?.data?.invites;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<null | {
    type: "remove" | "leave" | "delete";
    memberId?: string;
  }>(null);
  const [inviteModal, setInviteModal] = useState(false);
  const [connectionsModal, setConnectionsModal] = useState(false);
  const [selectedConnections, setSelectedConnections] = useState<string[]>([]);
  const [shareModal, setShareModal] = useState(false);
  const currentUserId = useAuthStore((state) => state.user?.id);
  const inviteByEmail = useInviteByEmail();
  const members = [...(membersData ?? [])].sort((a, b) => {
    if (a.id === currentUserId) return 1;
    if (b.id === currentUserId) return -1;
    return 0;
  });
  const currentMember = members.find((m) => m.userId === currentUserId);
  const isCurrentUserAdmin = currentMember?.role === "admin";
  useEffect(() => {
    document.body.style.overflow = confirmModal || inviteModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [confirmModal, inviteModal]);

  const remove = useRemoveMember();
  const changeRole = useChangeMemberRole();
  const leave = useLeaveGroup();

  function promoteMember(memberId: string) {
    changeRole.mutate({ groupId: id as string, memberId });
    setOpenMenuId(null);
  }

  function removeMember() {
    if (!confirmModal?.memberId) return;
    remove.mutate({ groupId: id as string, memberId: confirmModal.memberId });
    setConfirmModal(null);
  }
  function leaveGroup() {
    leave.mutate(id as string);
    setConfirmModal(null);
  }

  function resendInvite(email: string) {
    setResendingEmail(email);

    inviteByEmail.mutate(
      { id: id as string, email },
      {
        onSettled: () => {
          setResendingEmail(null);
        },
      },
    );
  }

  function handleInvite(email: string) {
    inviteByEmail.mutate(
      { id: id as string, email },
      {
        onSuccess: () => {
          setInviteModal(false);
        },
      },
    );
  }

  function confirmAction() {
    if (!confirmModal) return;
    if (confirmModal.type === "remove") {
      removeMember();
      return;
    }
    if (confirmModal.type === "leave") {
      leaveGroup()
      return;
    }
  }

  const confirmConfig = {
    remove: {
      title: "Remove member?",
      description: `${members?.find((m: Member) => m.id === confirmModal?.memberId)?.name ?? "This member"} will be removed from the trip and lose access to all shared content.`,
      confirmLabel: "Remove",
      confirmClass: "bg-[#ba1a1a] text-white hover:bg-red-700",
    },
    leave: {
      title: "Leave trip?",
      description: "You'll lose access to the trip dashboard, expenses, and shared content. This can't be undone.",
      confirmLabel: "Leave trip",
      confirmClass: "bg-[#ba1a1a] text-white hover:bg-red-700",
    },
    delete: {
      title: "Delete trip?",
      description: "This will permanently delete the Bali Squad Trip for all members. There's no going back.",
      confirmLabel: "Delete forever",
      confirmClass: "bg-[#ba1a1a] text-white hover:bg-red-700",
    },
  };
  if (isLoading) {
    return (
      <div className="max-w-[700px] mx-auto w-full space-y-10">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-[700px] mx-auto w-full space-y-10">
        {/* Header */}
        <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold font-headline tracking-tight text-[#181d1a]">Trip Members</h2>

            <p className="text-[#3f4944] font-medium mt-1">{members.length} travelers currently in this group</p>
          </div>
        </section>
        {/* Member list */}
        <section className="space-y-3">
          {members.map((member: Member) => (
            <div key={member.id} className="bg-white h-20 px-4 flex items-center justify-between rounded-2xl group transition-all hover:shadow-sm">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <img src={member.avatarUrl!} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                  {/* <StatusDot status={member.status} /> */}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#181d1a] text-sm">{member.userId == currentUserId ? member.name + " (You)" : member.name}</span>

                    {/* Admin star */}
                    {member.role === "admin" && <span className="text-[#005440]">{Icons.star}</span>}

                    {/* Role badge */}
                    {member.role === "admin" ? <span className="bg-[#0f6e56]/10 text-[#005440] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Admin</span> : <span className="bg-[#e5e9e5] text-[#3f4944] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Member</span>}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#3f4944] mt-0.5">
                    <span>
                      Joined{" "}
                      {new Date(member.joinedAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              {member.userId !== userId && (
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === member.id ? null : member.id);
                      }}
                      className="p-2 hover:bg-[#e5e9e5] rounded-full transition-colors text-[#3f4944]"
                    >
                      {Icons.dotsVertical}
                    </button>

                    {openMenuId === member.id && (
                      <MemberMenu
                        member={member}
                        isCurrentUserAdmin={isCurrentUserAdmin}
                        onPromote={() => promoteMember(member.userId)}
                        onRemove={() => {
                          setOpenMenuId(null);
                          setConfirmModal({ type: "remove", memberId: member.userId });
                        }}
                        onClose={() => setOpenMenuId(null)}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={() => setConnectionsModal(true)} className="h-11 px-5 rounded-xl bg-[#0f6e56] text-white font-semibold flex items-center gap-2">
            {Icons.group}
            Add Connection
          </button>

          <button onClick={() => setInviteModal(true)} className="h-11 px-5 rounded-xl border border-[#0f6e56] text-[#0f6e56] font-semibold flex items-center gap-2">
            {Icons.mail}
            Invite
          </button>

          <button onClick={() => setShareModal(true)} className="h-11 px-5 rounded-xl border border-[#bec9c3] text-[#181d1a] font-semibold">
            Share Link
          </button>
        </div>

        {invites?.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#3f4944]">Pending Invitations</h3>

              <span className="text-xs text-[#6f7a74]">{invites.length} pending</span>
            </div>
            <div className="bg-[#f1f4f1] rounded-2xl overflow-hidden divide-y divide-[#bec9c3]/10">
              {invites.map((invite: GroupInvite) => (
                <div key={invite.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e0e3e0] rounded-full flex items-center justify-center flex-shrink-0 text-[#6f7a74]">{Icons.mail}</div>
                    <div>
                      <p className="font-semibold text-[#181d1a] text-sm">{invite.invitedUserEmail}</p>
                      <p className="text-xs text-[#3f4944]">
                        Invited{" "}
                        {new Date(invite.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => resendInvite(invite.invitedUserEmail)} disabled={resendingEmail === invite.invitedUserEmail} className="text-xs font-bold text-[#005440] hover:underline transition-colors disabled:opacity-60">
                      {resendingEmail === invite.invitedUserEmail ? "Resending..." : "Resend"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="pt-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-[#bec9c3] opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ba1a1a]/60">Danger Zone</span>
            <div className="h-px flex-1 bg-[#bec9c3] opacity-20" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button onClick={() => setConfirmModal({ type: "leave" })} className="w-full sm:w-auto px-8 py-3 bg-[#ba1a1a] text-white font-bold rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-[#ba1a1a]/10">
              Leave trip
            </button>
            {/* <button onClick={() => setConfirmModal({ type: "delete" })} className="w-full sm:w-auto px-8 py-3 bg-[#ba1a1a] text-white font-bold rounded-xl hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-[#ba1a1a]/10">
              Delete trip
            </button> */}
          </div>
        </section>
      </div>

      {inviteModal && <InviteModal onClose={() => setInviteModal(false)} onInvite={handleInvite} isSending={inviteByEmail.isPending} />}
      {confirmModal && <ConfirmModal {...confirmConfig[confirmModal.type]} onConfirm={confirmAction} onCancel={() => setConfirmModal(null)} />}
      {connectionsModal && <AddConnectionsModal members={members} groupId={id as string} onClose={() => setConnectionsModal(false)} />}
      {shareModal && <ShareLinkModal onClose={() => setShareModal(false)} id={id as string} />}
    </>
  );
}
