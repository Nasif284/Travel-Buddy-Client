export default function ComingSoonTab({ label }: { label: string }) {
  return (
    <div className="py-20 flex flex-col items-center text-[#3f4944]">
      <div className="w-16 h-16 bg-[#f6f3ef] rounded-full flex items-center justify-center mb-4 opacity-40">
        {" "}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      </div>
      <p className="font-bold text-lg opacity-40 capitalize">{label}</p>
      <p className="text-sm opacity-30 mt-1">This section is coming soon.</p>
    </div>
  );
}