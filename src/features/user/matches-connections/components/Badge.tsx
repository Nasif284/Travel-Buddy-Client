export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="
        px-4 py-2
        rounded-full
        bg-white
        border border-[#d9dfdb]
        text-sm font-semibold
      "
    >
      {children}
    </span>
  );
}