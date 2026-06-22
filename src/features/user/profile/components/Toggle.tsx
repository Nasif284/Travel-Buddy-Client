export default function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0
        ${enabled ? "bg-[#0f6e56]" : "bg-[#bec9c3]"}`}
      aria-checked={enabled}
      role="switch"
    >
      <span
        className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
          ${enabled ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
}
    