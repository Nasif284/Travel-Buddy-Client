import Link from "next/link";

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function ExploreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
    </svg>
  );
}

export default function NotFound() {
  return (

      <main className="flex flex-grow items-center justify-center h-[100vh] w px-6">
        <div className="w-full max-w-xl text-center">
          {/* Illustration */}
          <div className="relative mx-auto mb-14 inline-block">
            <div className="relative z-10 flex h-62 w-62 items-center justify-center overflow-hidden rounded-full bg-[#f1f4f1] md:h-72 md:w-72">
              {/* Replace this Google image URL with your own asset later */}
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuARQ-PhSjU_PMR0d1N4MznwQMuPbQoaZAH1sMFY64wC97TQv0IwXPZ58c_1r8R2pws5vBntKhRGY2KtZ0vQ1RmSwBZWC7U0RV684Kk3kIW9tFIpT7Hvcwcja-I3sixbQUUtg9haOsgE8NH0uxSXa-ASiOh64JIs3C7N6cirKL6pkS0DTwPwIHW2XorI3F6NNXYZV5cgHY8H2Z_LcPlR3sO0N0oSJYEi0fDbkh6Mr4piXPP4QzuibSqNV4W57tVDFu85g6Rm0sjInY4" alt="Lost traveler holding a map" className="h-full w-full scale-110 object-cover mix-blend-multiply opacity-80" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="select-none font-['Manrope'] text-[120px] font-black text-[#005440]/10 md:text-[180px]">404</span>
              </div>
            </div>

            {/* Status card */}
            <div className="absolute -bottom-6 -right-4 z-20 flex items-center gap-3 rounded-xl border border-[#bec9c3]/15 bg-white/60 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl md:-right-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9eadb] text-[#005440]">
                <ExploreIcon />
              </div>

              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3f4944]">Status</p>

                <p className="text-sm font-semibold text-[#005440]">Signal Lost</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="mx-auto max-w-lg">
            <h1 className="font-['Manrope'] text-4xl font-extrabold leading-tight tracking-tight text-[#005440] md:text-4xl">Looks like you&apos;re off the map.</h1>

            <p className="mt-4 font-['Inter'] text-sm leading-relaxed text-[#3f4944]">The page you are looking for doesn&apos;t exist or has been moved to a new destination. Let&apos;s get you back on track.</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-center justify-center gap-4 pt-5 sm:flex-row">
            <Link href="/" className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0f6e56] px-8 font-bold text-white shadow-lg shadow-[#0f6e56]/20 transition hover:bg-[#005440] active:scale-95">
              <HomeIcon />
              Take me home
            </Link>
          </div>
        </div>
      </main>

  );
}
