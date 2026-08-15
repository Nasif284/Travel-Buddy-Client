export default function TripStatusBadge({ dateFrom, dateTo }: { dateFrom: Date; dateTo: Date }) {
  const now = new Date();
  const from = new Date(dateFrom);
  const to = new Date(dateTo);

  let label: string;
  let cls: string;

  if (now < from) {
    label = "Upcoming";
    cls = "bg-blue-100 text-blue-700";
  } else if (now > to) {
    label = "Completed";
    cls = "bg-[#e5e2de] text-[#3f4944]";
  } else {
    label = "Active";
    cls = "bg-emerald-100 text-emerald-800";
  }

  return <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest ${cls}`}>{label}</span>;
}
