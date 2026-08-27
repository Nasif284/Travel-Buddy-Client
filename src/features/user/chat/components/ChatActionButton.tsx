export default function ChatActionButton({ children, label, muted = false,onClick }: { children: React.ReactNode; label: string; muted?: boolean ,onClick?:()=> void}) {
  return (
    <button onClick={onClick} type="button" aria-label={label} className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-surface-container-high ${muted ? "text-outline" : "text-primary"}`}>
      {children}
    </button>
  );
}