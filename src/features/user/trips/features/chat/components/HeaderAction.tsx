export default function HeaderAction({ children, label, onClick }: { children: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} type="button" aria-label={label} className="rounded-full p-2 text-outline transition-colors hover:bg-surface-container hover:text-primary">
      {children}
    </button>
  );
}
