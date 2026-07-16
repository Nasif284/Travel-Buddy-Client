import ProgressBar from "../components/ProgressBar";
import { Activity, Message } from "../interfaces/interface";

const Icons = {
  arrowForward: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  chevronRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  clock: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  pin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  trendingDown: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  ),
  trendingUp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  chat: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

const ACTIVITIES: Activity[] = [
  { month: "Jun", day: 14, title: "Sunrise Trek: Mount Batur", time: "04:00 AM", location: "Kintamani Village", highlight: true },
  { month: "Jun", day: 15, title: "Uluwatu Temple Visit", time: "05:30 PM", location: "South Kuta" },
  { month: "Jun", day: 16, title: "Surfing Lesson @ Canggu", time: "09:00 AM", location: "Echo Beach" },
];

const MESSAGES: Message[] = [
  { name: "Priya", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm5XpzuxL59onNGPfRYDrkk_nVeMYNv2Ds6vs4EPQYcjnajP7oPDnLrw4SUj2PMb3-P0NXTZriJju7UdLkwxGeuauhFKbNtwVjj7b2SP7KPBK0865aPGPYghK_XyK3qVVYksUzqd9DFhQoXMjAWX1RwJ6xVPjLm41FTAlxtbN6aAUU3yGUUDmRGBjEzW7lPszq4lfYmjv2uKX60zmKgHogK5j8CgwuNrwrViLXFy9FmZ9FX63V-o0TV5OsZ8j7p_PbpWHJDyEwVUI", time: "2m ago", text: "I've added the hotel booking details to the expenses!" },
  { name: "Raj", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6LM_U_zTkRTMNcu9REJ74pL-ANo9a4JuvWQnpYpI9X02r-p-OARbUjhbvsRsUxdTAZuTGXHl_Q_3YYJyiUR80OQBjMPF0xpMKr_zclVoy4OthkbLjuXTQ3OulrcC-M5d7GOI2SWf6Ifjpksrmy-RljtA2nJlylJ5Z8NO_ASWxgtmyFHJgEydPSnDzdFtXf72CyNpyzPJk_6LH2kmz8_RgtalzbkX1ty1id8kVNZ2Qiogko82gz0h_R4qR2S1lkkpDjaJLplzjUB8", time: "45m ago", text: "Is everyone okay with the 4 AM start for the trek?" },
  { name: "Sam", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdQHbU0_vmBtxXF6AUiDbUsAorH9fufu6CO4Z3WN7nEIo9iKxWTWGhYtlAmaX7apc_bFIAGjV8eTAlEhim2tk4NYreyPKt9bBN38Eq_qlmvkrusQilK4RscYEQZOVXzep74ZyMnPDS8X3MGYA7csHl9sbZTpma9dXP3p4Fb2qHi9YVjBO19f7bzaqtc58mNu8hhOexJmbkw1H3fUfqGFBZiQdUslHbcbZvzSZOYIjRiVatUGcI1j8OeZvP5DY5JqKc7cqdNDCPvqw", time: "1h ago", text: "Just finished packing. Can't wait! 🌴" },
];

const GLANCE_STATS = [
  { label: "Duration", value: "16 days" },
  { label: "Group", value: "4 members" },
  { label: "Total Budget", value: "₹42,500" },
  { label: "Activities", value: "8 items" },
];

export default function TripOverviewPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
      <div className="lg:col-span-6 space-y-10">
        <section>
          <h2 className="text-xl font-bold tracking-tight text-[#181d1a] mb-5 font-headline">Trip at a glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GLANCE_STATS.map(({ label, value }) => (
              <div key={label} className="bg-[#f1f4f1] p-4 rounded-xl">
                <span className="text-[#3f4944] text-xs uppercase tracking-widest font-bold">{label}</span>
                <p className="text-xl font-bold text-[#0f6e56] mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold tracking-tight text-[#181d1a] font-headline">Upcoming activities</h2>
            <a href="#" className="text-[#005440] text-sm font-semibold flex items-center gap-1 hover:underline">
              View all {Icons.arrowForward}
            </a>
          </div>
          <div className="space-y-3">
            {ACTIVITIES.map((act) => (
              <div key={act.day} className="flex items-center gap-5 p-4 bg-white hover:bg-[#ebefeb] transition-all group cursor-pointer rounded-xl">
                <div
                  className={`flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-xl
                  ${act.highlight ? "bg-[#c9eadb] text-[#4d6b5f]" : "bg-[#ebefeb] text-[#3f4944]"}`}
                >
                  <span className="text-xs font-bold uppercase">{act.month}</span>
                  <span className="text-xl font-black">{act.day}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-[#181d1a] group-hover:text-[#005440] transition-colors">{act.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#3f4944] mt-1">
                    <span className="flex items-center gap-1">
                      {Icons.clock} {act.time}
                    </span>
                    <span className="flex items-center gap-1">
                      {Icons.pin} {act.location}
                    </span>
                  </div>
                </div>
                <span className="text-[#bec9c3] group-hover:text-[#005440] transition-colors">{Icons.chevronRight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent messages */}
      </div>

      {/* ── Right column ─────────────────────────────────────────────── */}
      <div className="lg:col-span-4 space-y-8">
        <section>
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold tracking-tight text-[#181d1a] font-headline">Recent messages</h2>
            <a href="#" className="text-[#005440] text-sm font-semibold flex items-center gap-1 hover:underline">
              Open Chat {Icons.chat}
            </a>
          </div>
          <div className="bg-[#f1f4f1] rounded-xl overflow-hidden">
            {MESSAGES.map((msg, i) => (
              <div
                key={msg.name}
                className={`p-4 flex items-center gap-4 hover:bg-[#e5e9e5] transition-colors cursor-pointer
                  ${i < MESSAGES.length - 1 ? "border-b border-[#bec9c3]/10" : ""}`}
              >
                <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full flex-shrink-0 object-cover" />
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm">{msg.name}</span>
                    <span className="text-[10px] text-[#3f4944] flex-shrink-0 ml-2">{msg.time}</span>
                  </div>
                  <p className="text-xs text-[#3f4944] truncate">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Expenses summary */}
        <div className="bg-[#f1f4f1] p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4 font-headline">Expenses summary</h3>
          <div className="mb-6">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-[#3f4944]">Used Budget</span>
              <span>₹24,200 / ₹42,500</span>
            </div>
            <ProgressBar pct={57} color="bg-[#0f6e56]" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#ffdad6]/20 rounded-xl">
              <div className="flex items-center gap-2 text-[#ba1a1a]">
                {Icons.trendingDown}
                <span className="text-xs font-medium text-[#181d1a]">You owe Priya</span>
              </div>
              <span className="text-sm font-bold text-[#ba1a1a]">₹1,200</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#c9eadb]/30 rounded-xl">
              <div className="flex items-center gap-2 text-[#005440]">
                {Icons.trendingUp}
                <span className="text-xs font-medium text-[#181d1a]">Raj owes you</span>
              </div>
              <span className="text-sm font-bold text-[#005440]">₹800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
