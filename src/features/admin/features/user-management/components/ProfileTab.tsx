import { GetUserProfileResponseDTO } from "../interfaces/users.interfaces";
const Icons = {
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  badge: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  mail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  account: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  globe: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  ),
  trips: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
};

function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
function getLocation(profile: GetUserProfileResponseDTO): string {
  return [profile.city, profile.state, profile.country].filter(Boolean).join(", ") || "—";
}

export default function ProfileTab({ profile }: Readonly<{ profile: GetUserProfileResponseDTO }>) {
  const accountRows: { label: string; value: React.ReactNode }[] = [
    { label: "Phone", value: profile.phone ?? "—" },
    { label: "Location", value: getLocation(profile) },
    { label: "Gender", value: profile.gender ?? "—" },
    { label: "Age", value: profile.age != null ? `${profile.age} years` : "—" },
    { label: "Joined", value: formatDate(profile.createdAt) },
    {
      label: "Last Active",
      value: (
        <span className="flex items-center gap-2">
          Today, 14:42
          <span className="w-1.5 h-1.5 bg-[#005440] rounded-full" />
        </span>
      ),
    },
    { label: "Onboarding", value: profile.onboardingCompleted ? "Completed" : `Step ${profile.onboardingStep}` },
    { label: "Match With", value: profile.matchWith ?? "—" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ── Left col ── */}
      <div className="lg:col-span-2 space-y-8">
        {/* Account info */}
        <div className="bg-white rounded-xl overflow-hidden border border-[#bec9c3]/15 shadow-sm">
          <div className="bg-[#ebe8e4] px-6 py-4 flex items-center gap-2">
            <span className="text-[#005440]">{Icons.account}</span>
            <h3 className="text-sm font-bold text-[#1c1c1a]">Account Information</h3>
          </div>
          <table className="w-full text-sm">
            <tbody>
              {accountRows.map(({ label, value }, i) => (
                <tr key={label} className={`${i < accountRows.length - 1 ? "border-b border-[#f6f3ef]" : ""} hover:bg-[#f6f3ef] transition-colors`}>
                  <th className="px-6 py-4 font-semibold text-[#3f4944] w-1/3 text-left">{label}</th>
                  <td className="px-6 py-4 text-[#1c1c1a] font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Travel profile */}
        <div className="bg-white rounded-xl p-8 border border-[#bec9c3]/15 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[#005440]">{Icons.globe}</span>
            <h3 className="text-sm font-bold text-[#1c1c1a]">Travel Profile</h3>
          </div>

          {profile.bio && (
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]">Bio</p>
              <p className="text-[#1c1c1a] leading-relaxed italic">&ldquo;{profile.bio}&rdquo;</p>
            </div>
          )}

          <div className="flex flex-wrap gap-8">
            {profile.travelType && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]">Travel Type</p>
                <span className="px-3 py-1 bg-[#c9eadb] text-[#4d6b5f] text-xs font-semibold rounded-full capitalize">{profile.travelType}</span>
              </div>
            )}

            {profile.travelPersonality && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]">Personality</p>
                <span className="px-3 py-1 bg-[#c9eadb] text-[#4d6b5f] text-xs font-semibold rounded-full capitalize">{profile.travelPersonality}</span>
              </div>
            )}

            {profile.interests.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((i) => (
                    <span key={i} className="px-3 py-1 bg-[#c9eadb] text-[#4d6b5f] text-xs font-semibold rounded-full capitalize">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.languages.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((l) => (
                    <span key={l} className="px-3 py-1 border border-[#bec9c3] text-[#3f4944] text-xs font-semibold rounded-full">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile.skills.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((s) => (
                    <span key={s} className="px-3 py-1 border border-[#bec9c3] text-[#3f4944] text-xs font-semibold rounded-full capitalize">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Right col ── */}
      <div className="space-y-8">
        {/* Verification */}
        <div className="bg-white rounded-xl p-6 border border-[#bec9c3]/15 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#1c1c1a] flex items-center gap-2">
            <span className="text-[#005440]">{Icons.check}</span>
            Verification Status
          </h3>
          <div className="space-y-3">
            {/* Phone */}
            <div className={`flex items-center justify-between p-3 bg-[#f6f3ef] rounded-lg ${!profile.isPhoneVerified ? "opacity-60" : ""}`}>
              <div className="flex items-center gap-3 text-[#3f4944]">
                {Icons.phone}
                <span className="text-sm font-medium">Phone</span>
                {profile.phone && <span className="text-xs text-[#6f7a74]">{profile.phone}</span>}
              </div>
              {profile.isPhoneVerified ? <span className="text-[#005440]">{Icons.check}</span> : <span className="text-[10px] font-bold uppercase text-[#3f4944]">Not verified</span>}
            </div>

            {/* Email */}
            <div className={`flex items-center justify-between p-3 bg-[#f6f3ef] rounded-lg ${!profile.isEmailVerified ? "opacity-60" : ""}`}>
              <div className="flex items-center gap-3 text-[#3f4944]">
                {Icons.mail}
                <span className="text-sm font-medium">Email</span>
              </div>
              {profile.isEmailVerified ? <span className="text-[#005440]">{Icons.check}</span> : <span className="text-[10px] font-bold uppercase text-[#3f4944]">Not verified</span>}
            </div>

            {/* ID */}
            <div className="flex items-center justify-between p-3 bg-[#f6f3ef] rounded-lg opacity-60">
              <div className="flex items-center gap-3 text-[#3f4944]">
                {Icons.badge}
                <span className="text-sm font-medium">Identity Document</span>
              </div>
              <span className="text-[10px] font-bold uppercase text-[#3f4944]">Not submitted</span>
            </div>
          </div>
        </div>

        {/* Traveling status */}
        <div className="bg-white rounded-xl p-6 border border-[#bec9c3]/15 shadow-sm">
          <h3 className="text-sm font-bold text-[#1c1c1a] mb-4 flex items-center gap-2">
            {Icons.trips}
            Travel Status
          </h3>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${profile.isTraveling ? "bg-emerald-50" : "bg-[#f6f3ef]"}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${profile.isTraveling ? "bg-emerald-500 animate-pulse" : "bg-[#bec9c3]"}`} />
            <span className="text-sm font-semibold text-[#1c1c1a]">{profile.isTraveling ? "Currently traveling" : "Not traveling"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
