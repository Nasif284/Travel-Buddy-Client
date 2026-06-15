"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";

interface TagInputProps {
  value: string[];
  placeholder: string;
  onChange: (value: string[]) => void;
}

export function TagInput({ value, placeholder, onChange }: TagInputProps) {
  const [inputVal, setInputVal] = useState("");

  const addTag = (tag: string) => {
    if (!tag.trim()) return;
    if (value.includes(tag.trim())) return;
    onChange([...value, tag.trim()]);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
      e.preventDefault();
      addTag(inputVal);
      setInputVal("");
    }

    if (e.key === "Backspace" && !inputVal && value.length) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="w-full min-h-[56px] bg-[#e0e3e0] rounded-xl p-2 flex flex-wrap gap-2 items-center">
      {value.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 bg-[#c9eadb] text-[#4d6b5f] px-3 py-1.5 rounded-full text-sm font-medium">
          {tag}
          <button type="button" onClick={() => removeTag(tag)}>
            ×
          </button>
        </span>
      ))}

      <input value={inputVal} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)} onKeyDown={handleKey} placeholder={placeholder} className="bg-transparent border-none focus:ring-0 outline-none text-sm py-1 placeholder:text-[#6f7a74]/60 flex-grow min-w-[140px] text-[#181d1a]" />
    </div>
  );
}
