export default function HeaderAction({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button type="button" aria-label={label} className="rounded-full p-2 text-outline transition-colors hover:bg-surface-container hover:text-primary">
      {children}
    </button>
  );
}
