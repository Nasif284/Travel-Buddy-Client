"use client"

import { useLogout } from "../features/user/auth/hooks/auth.hooks";

export default function HomePage() {
  const logout = useLogout()
  const handleLogout = () => {
    logout.mutate()
  }
  return (
    <div className="bg-[#f7faf6] text-[#181d1a] min-h-screen">
      {/* Left Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-[#f1f4f1] flex flex-col py-8 px-6 z-50">
        <div className="text-2xl font-black text-[#0F6E56] mb-8">Travel Buddy</div>

        <div className="mb-2">
          <p className="font-bold text-sm text-[#0F6E56] opacity-60 uppercase tracking-widest mb-4">Main Menu</p>

          <nav className="space-y-1">
            <a className="flex items-center gap-3 py-3 px-4 rounded-lg text-[#0F6E56] font-bold border-r-4 border-[#0F6E56] bg-white/50" href="#">
              <span>🏠</span>
              <span>Home</span>
            </a>

            <a className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#e0e3e0]" href="#">
              <span>❤️</span>
              <span>Matches</span>
            </a>

            <a className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#e0e3e0]" href="#">
              <span>🌍</span>
              <span>Trips</span>
            </a>

            <a className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#e0e3e0]" href="#">
              <span>💬</span>
              <span>Messages</span>
            </a>
          </nav>
        </div>

        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full bg-[#0F6E56] text-white py-3 px-4 rounded-md font-bold text-sm">Logout</button>
        </div>
      </aside>

      {/* Top Bar */}
      <header className="fixed top-0 right-0 left-64 h-20 bg-white/80 backdrop-blur-xl z-40 px-12 flex justify-between items-center border-b border-[#bec9c3]/15">
        <div className="flex items-center gap-4 bg-[#e0e3e0] rounded-full px-4 py-2 w-96">
          <input className="bg-transparent outline-none text-sm w-full" placeholder="Search destinations or travelers..." type="text" />
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-[#f1f4f1] transition">🔔</button>

          <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
            Logout
          </button>

          <div className="h-10 w-10 rounded-full bg-[#0F6E56] flex items-center justify-center text-white font-bold">JD</div>
        </div>
      </header>

      {/* Right Sidebar */}
      <aside className="h-screen w-80 fixed right-0 top-0 bg-[#f1f4f1] flex flex-col p-8 space-y-12 z-50 overflow-y-auto">
        <section>
          <h3 className="font-bold text-lg mb-4">Trust Score</h3>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">Your Trust Score</span>

              <span className="text-[#0F6E56] font-bold">4.8/5</span>
            </div>

            <p className="text-xs text-gray-500">Based on 12 verified reviews</p>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-lg mb-4">Active Travel Plan</h3>

          <div className="bg-white p-6 rounded-md shadow-sm">
            <div>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Destination</span>

              <p className="font-bold text-lg text-[#0F6E56]">Kyoto, Japan</p>
            </div>

            <div className="mt-4">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Dates</span>

              <p className="text-sm font-medium">Oct 12 — Oct 28, 2024</p>
            </div>
          </div>
        </section>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mr-80 pt-24 pb-12 px-12 min-h-screen">
        <section className="mb-16">
          <header className="mb-10">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Find who is near you</h1>

            <p className="text-gray-500 text-lg">Discover your perfect companion near you</p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-sm">
              <div className="h-[200px] relative">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" alt="travel" />

                <div className="absolute top-4 right-4 bg-[#0F6E56] text-white text-xs font-bold px-3 py-1.5 rounded-full">87% match</div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h2 className="text-xl font-bold">Elena Rodriguez, 28</h2>

                  <p className="text-xs text-gray-500">Barcelona, Spain</p>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[#c9eadb] rounded-full text-xs font-bold mb-2">1.2 km away</span>

                  <p className="text-xs text-gray-500 font-medium">Oct 15 - Oct 30 • $2,500 Budget</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] uppercase font-bold py-1 px-2 bg-[#f1f4f1] rounded-lg">Photography</span>

                  <span className="text-[10px] uppercase font-bold py-1 px-2 bg-[#f1f4f1] rounded-lg">Hiking</span>
                </div>

                <div className="mt-auto flex gap-3">
                  <button className="flex-1 py-3 text-sm font-bold text-[#0F6E56] hover:bg-[#f1f4f1] rounded-md">View Profile</button>

                  <button className="flex-1 py-3 text-sm font-bold bg-[#0F6E56] text-white rounded-md">Send Request</button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-md overflow-hidden flex flex-col shadow-sm">
              <div className="h-[200px] relative">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1527631746610-bca00a040d60" alt="travel" />

                <div className="absolute top-4 right-4 bg-[#0F6E56] text-white text-xs font-bold px-3 py-1.5 rounded-full">94% match</div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h2 className="text-xl font-bold">Liam Foster, 32</h2>

                  <p className="text-xs text-gray-500">Seattle, USA</p>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-[#c9eadb] rounded-full text-xs font-bold mb-2">4.8 km away</span>

                  <p className="text-xs text-gray-500 font-medium">Nov 05 - Nov 20 • $1,800 Budget</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] uppercase font-bold py-1 px-2 bg-[#f1f4f1] rounded-lg">Backpacking</span>

                  <span className="text-[10px] uppercase font-bold py-1 px-2 bg-[#f1f4f1] rounded-lg">Surfing</span>
                </div>

                <div className="mt-auto flex gap-3">
                  <button className="flex-1 py-3 text-sm font-bold text-[#0F6E56] hover:bg-[#f1f4f1] rounded-md">View Profile</button>

                  <button className="flex-1 py-3 text-sm font-bold bg-[#0F6E56] text-white rounded-md">Send Request</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

