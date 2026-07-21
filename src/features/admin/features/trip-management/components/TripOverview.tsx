import { GroupData } from "../interfaces/interfaces";

const Icons = {
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  payments: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
};

function daysBetween(a: Date, b: Date): number {
  return Math.round(Math.abs(new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24));
}
function formatDateRange(from: Date, to: Date): string {
  return `${new Date(from).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(to).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

export function ConfigDetails({ trip }: { trip: GroupData }) {
  const duration = daysBetween(trip.dateFrom, trip.dateTo);

  const items = [
    {
      label: "Destination Profile",
      icon: <span className="text-[#005440]">{Icons.location}</span>,
      value: trip.destination,
    },
    {
      label: "Budget Style",
      icon: <span className="text-[#005440]">{Icons.payments}</span>,
      value: (
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="bg-[#c9eadb] text-[#4d6b5f] text-[11px] font-bold px-3 py-1.5 rounded-md capitalize">{trip.budgetStyle}</span>
        </div>
      ),
      noText: true,
    },
    {
      label: "Trip Duration",
      icon: <span className="text-[#005440]">{Icons.calendar}</span>,
      value: `${duration} Days`,
    },
    {
      label: "Travel Dates",
      icon: <span className="text-[#005440]">{Icons.calendar}</span>,
      value: formatDateRange(trip.dateFrom, trip.dateTo),
    },
  ];

  return (
    <section className="bg-white rounded-xl p-8 shadow-sm border border-[#bec9c3]/15">
      <h3 className="text-[#1c1c1a] font-bold text-xl tracking-tight mb-8">Configuration Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(({ label, icon, value, noText }) => (
          <div key={label}>
            <label className="block text-[10px] font-bold text-[#3f4944] uppercase tracking-widest mb-2.5">{label}</label>
            {noText ? (
              <div className="flex items-center gap-3">
                {icon}
                {value}
              </div>
            ) : (
              <div className="flex items-center gap-3 text-[#1c1c1a] font-semibold text-sm">
                {icon}
                <span>{value}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
