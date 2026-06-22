import { AddCircleIcon, CloseTagIcon } from "@/src/assets/icons";
import { KeyboardEvent, useRef, useState } from "react";

export default function TagGroup({ label, tags, onRemove, onAdd }: { label: string; tags: string[]; onRemove: (tag: string) => void; onAdd: (tag: string) => void }) {
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (value.trim()) onAdd(value.trim());
    setValue("");
    setAdding(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    if (e.key === "Escape") {
      setValue("");
      setAdding(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]/60">{label}</p>
        <button
          onClick={() => {
            setAdding(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="text-[#005440] hover:bg-[#005440]/5 p-1 rounded transition-colors"
          aria-label={`Add ${label}`}
        >
          <AddCircleIcon />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className={`px-3 bg-[#c9eadb] py-1.5 rounded-lg bg text-xs font-bold flex items-center gap-2`}>
            {tag}
            <button onClick={() => onRemove(tag)} aria-label={`Remove ${tag}`} className="opacity-60 hover:opacity-100">
              <CloseTagIcon />
            </button>
          </span>
        ))}
        {adding && <input ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKey} onBlur={submit} placeholder="Add..." className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#f1f4f1] border border-[#bec9c3]/30 outline-none w-24" />}
      </div>
    </div>
  );
}
