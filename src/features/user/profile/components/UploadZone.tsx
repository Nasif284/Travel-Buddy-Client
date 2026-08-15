import { useRef, useState } from "react";
import { ACCEPTED_TYPES, MAX_SIZE_MB, UploadZoneProps } from "../interfaces/profile.interface";

export default function UploadZone({ side, file, onFile, onRemove }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function validate(f: File): string | null {
    if (!ACCEPTED_TYPES.includes(f.type)) return "Only JPG, PNG, WEBP or PDF files are accepted.";
    if (f.size > MAX_SIZE_MB * 1024 * 1024) return `File must be under ${MAX_SIZE_MB} MB.`;
    return null;
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const f = files[0];
    const err = validate(f);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onFile(f, side);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDrag(false);
    handleFiles(e.dataTransfer.files);
  }

  const label = side === "front" ? "Front side" : "Back side";

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">{label}</p>

      {file ? (
        /* ── Uploaded preview ── */
        <div className="relative rounded-xl overflow-hidden border-2 border-[#0f6e56]/30 bg-[#f1f4f1] aspect-[3/2] flex items-center justify-center">
          {file.file.type.startsWith("image/") ? (
            <img src={file.preview} alt={label} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#0f6e56]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-xs font-semibold text-[#3f4944] max-w-[140px] truncate">{file.file.name}</span>
            </div>
          )}

          {/* Overlay: check + remove */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button type="button" onClick={() => onRemove(side)} className="bg-white text-[#ba1a1a] p-2 rounded-full shadow-lg hover:bg-[#ffdad6] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>

          {/* Verified tick */}
          <div className="absolute top-2 right-2 bg-[#0f6e56] text-white w-6 h-6 rounded-full flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl aspect-[3/2] flex flex-col items-center justify-center gap-3 cursor-pointer transition-all
            ${drag ? "border-[#0f6e56] bg-[#c9eadb]/20" : "border-[#bec9c3]/60 hover:border-[#0f6e56]/50 hover:bg-[#f1f4f1]"}`}
        >
          <span className="text-[#bec9c3]">
            {" "}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 16 12 12 8 16" />
              <line x1="12" y1="12" x2="12" y2="21" />
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            </svg>
          </span>
          <div className="text-center px-4">
            <p className="text-sm font-semibold text-[#3f4944]">
              Drop file here or <span className="text-[#0f6e56] underline underline-offset-2">browse</span>
            </p>
            <p className="text-[10px] text-[#bec9c3] mt-1">JPG, PNG, WEBP or PDF · max {MAX_SIZE_MB} MB</p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-[#ba1a1a] flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>{" "}
          {error}
        </p>
      )}

      <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(",")} className="hidden" onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}