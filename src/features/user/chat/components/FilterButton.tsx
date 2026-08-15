export default function FilterButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${active ? "bg-primary-container text-white" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"}`}>
      {children}
    </button>
  );
}