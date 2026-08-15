export function formatDayLabel(d: Date): string {
  return new Date(d).toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
}

export function formatDayNum(d: Date): number {
  return new Date(d).getDate();
}

export function formatMonthShort(d: Date): string {
  return new Date(d).toLocaleDateString("en-US", { month: "short" }).toUpperCase();
}

export function formatFullDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export function formatDuration(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Generate all calendar dates between trip start and end (inclusive) */
export function generateTripDays(start: Date, end: Date): Date[] {
  const days: Date[] = [];
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  const endD = new Date(end);
  endD.setHours(0, 0, 0, 0);
  while (cur <= endD) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

export function isSameDay(a: Date, b: Date): boolean {
  const ad = new Date(a),
    bd = new Date(b);
  return ad.getFullYear() === bd.getFullYear() && ad.getMonth() === bd.getMonth() && ad.getDate() === bd.getDate();
}

export function formatDateOnly(date: Date): string {
 
  return [new Date(date).getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}