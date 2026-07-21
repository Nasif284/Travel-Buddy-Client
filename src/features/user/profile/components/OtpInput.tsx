import { useRef } from "react";
import { OtpInputProps } from "../interfaces/profile.interface";

export default function OtpInput({ value, onChange, error }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  function handleChange(index: number, char: string) {
    if (char && !/^\d$/.test(char)) return;

    const next = [...digits];
    next[index] = char;
    onChange(next.join(""));

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        onChange(next.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const next = [...digits];
        next[index - 1] = "";
        onChange(next.join(""));
      }
    }
    // Allow pasting
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) return;
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted.padEnd(6, "").slice(0, 6).replace(/\s/g, ""));
    // Focus last filled or next empty
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-2 px-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value.slice(-1))}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            className={`w-11 h-14 text-center text-xl font-black rounded-xl border-none outline-none transition-all
              ${d ? "bg-white shadow-sm ring-2 ring-[#0f6e56]" : "bg-[#e0e3e0]"}
              ${error ? "ring-2 ring-[#ba1a1a] bg-[#ffdad6]/30" : "focus:bg-white focus:ring-2 focus:ring-[#0f6e56]"}`}
          />
        ))}
      </div>
      {error && <p className="text-xs text-[#ba1a1a] text-center">{error}</p>}
    </div>
  );
}