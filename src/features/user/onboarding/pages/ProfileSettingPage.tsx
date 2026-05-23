"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const NATIONALITY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "in", label: "India" },
];

const GENDER_OPTIONS = ["Male", "Female", "Non-binary"];

function TagInput({ tags, placeholder, onAdd, onRemove }: { tags: string[]; placeholder: string; onAdd: (val: string) => void; onRemove: (val: string) => void }) {
  const [inputVal, setInputVal] = useState("");

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
      e.preventDefault();
      onAdd(inputVal.trim());
      setInputVal("");
    } else if (e.key === "Backspace" && !inputVal && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  return (
    <div className="w-full min-h-[56px] bg-[#e0e3e0] rounded-xl p-2 flex flex-wrap gap-2 items-center">
      {tags.map((tag) => (
        <span key={tag} className="inline-flex items-center gap-1 bg-[#c9eadb] text-[#4d6b5f] px-3 py-1.5 rounded-full text-sm font-medium">
          {tag}
          <button type="button" onClick={() => onRemove(tag)} aria-label={`Remove ${tag}`} className="hover:text-[#005440] transition-colors leading-none">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </span>
      ))}
      <input type="text" value={inputVal} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVal(e.target.value)} onKeyDown={handleKey} placeholder={placeholder} className="bg-transparent border-none focus:ring-0 outline-none text-sm py-1 placeholder:text-[#6f7a74]/60 flex-grow min-w-[140px] text-[#181d1a]" />
    </div>
  );
}

export default function ProfileSettingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("Female");
  const [skills, setSkills] = useState(["Photography", "Navigation"]);
  const [languages, setLanguages] = useState(["English", "Spanish"]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handleContinue = () => {
    console.log({ photoPreview, bio, dob, nationality, gender, skills, languages });
    router.push("/onboarding/travel-style");
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:py-16">
      <div className="max-w-[640px] w-full bg-white p-8 md:p-14 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black font-headline text-[#181d1a] tracking-tight mb-3">Build your traveler profile</h1>
          <p className="text-[#3f4944] leading-relaxed">This helps others know who you are before connecting.</p>
        </div>

        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col items-center space-y-4">
            <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Upload profile photo" className="relative group w-[120px] h-[120px] rounded-full bg-[#e5e9e5] flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-[#bec9c3] hover:border-[#0f6e56] transition-colors">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-9 h-9 text-[#3f4944] fill-current mb-1" viewBox="0 0 24 24">
                    <path d="M12 15.2A3.2 3.2 0 0 1 8.8 12 3.2 3.2 0 0 1 12 8.8 3.2 3.2 0 0 1 15.2 12 3.2 3.2 0 0 1 12 15.2M12 7a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5m-7 2H3V7H1v2H3v2h2v-2zm8-6 2.04 3H20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-9h2v9h16V8h-6.96L13 5h-2z" />
                  </svg>
                </>
              )}
              <div className="absolute inset-0 rounded-full bg-[#005440]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[#005440] font-bold text-xs">EDIT</span>
              </div>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[#0f6e56] font-bold text-sm hover:underline">
              Upload photo
            </button>
          </div>

          {/* 2. Bio */}
          <div className="space-y-3">
            <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">About you</label>
            <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="I'm a budget backpacker who loves mountains, street food, and spontaneous plans..." className="w-full bg-[#e0e3e0] border-none rounded-xl p-4 text-[#181d1a] placeholder:text-[#6f7a74]/60 focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all text-base outline-none resize-none" />
          </div>

          {/* 3. DOB + Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Date of Birth</label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Nationality</label>
              <select value={nationality} onChange={(e) => setNationality(e.target.value)} className="w-full bg-[#e0e3e0] border-none rounded-xl px-4 py-3 text-[#181d1a] focus:ring-2 focus:ring-[#0f6e56]/20 focus:bg-white transition-all outline-none appearance-none">
                <option value="">Select nationality</option>
                {NATIONALITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Gender */}
          <div className="space-y-3">
            <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Gender</label>
            <div className="flex flex-wrap gap-3">
              {GENDER_OPTIONS.map((g) => (
                <button key={g} type="button" onClick={() => setGender(g)} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${gender === g ? "bg-[#0f6e56] text-white shadow-sm" : "border border-[#bec9c3]/30 text-[#3f4944] hover:bg-[#e5e9e5]"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Travel Skills */}
          <div className="space-y-3">
            <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Travel Skills</label>
            <TagInput tags={skills} placeholder="Add skill (e.g. Driving, Cooking)…" onAdd={(v) => setSkills((prev) => (prev.includes(v) ? prev : [...prev, v]))} onRemove={(v) => setSkills((prev) => prev.filter((s) => s !== v))} />
            <p className="text-xs text-[#6f7a74]">Press Enter or comma to add a skill.</p>
          </div>

          {/* 6. Languages */}
          <div className="space-y-3">
            <label className="block text-sm font-bold font-headline text-[#181d1a] tracking-wide">Languages</label>
            <TagInput tags={languages} placeholder="Add language…" onAdd={(v) => setLanguages((prev) => (prev.includes(v) ? prev : [...prev, v]))} onRemove={(v) => setLanguages((prev) => prev.filter((l) => l !== v))} />
            <p className="text-xs text-[#6f7a74]">Press Enter or comma to add a language.</p>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-[#bec9c3]/10">
            <button type="button" onClick={() => router.back()} className="text-[#005440] font-bold text-sm hover:-translate-x-1 transition-transform flex items-center gap-1">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back
            </button>
            <button type="button" onClick={handleContinue} className="w-40 h-12 bg-[#0f6e56] text-white font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md">
              Continue
            </button>
          </div>
        </form>
      </div>

      {/* Step indicator */}
      <div className="mt-12 mb-8 text-center">
        <p className="text-[#3f4944] font-headline font-bold text-sm tracking-widest uppercase">Step 2 of 4</p>
      </div>
    </main>
  );
}
