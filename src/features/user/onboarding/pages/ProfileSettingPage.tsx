import ProfileSettingForm from "../components/ProfileSettingForm";

export default function ProfileSettingPage() {
    return (
      <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:py-16">
        <div className="max-w-[640px] w-full bg-white p-8 md:p-14 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-black font-headline text-[#181d1a] tracking-tight mb-3">Build your traveler profile</h1>
            <p className="text-[#3f4944] leading-relaxed">This helps others know who you are before connecting.</p>
          </div>
          <ProfileSettingForm />
        </div>
        <div className="mt-12 mb-8 text-center">
          <p className="text-[#3f4944] font-headline font-bold text-sm tracking-widest uppercase">Step 2 of 4</p>
        </div>
      </main>
    );
  }

