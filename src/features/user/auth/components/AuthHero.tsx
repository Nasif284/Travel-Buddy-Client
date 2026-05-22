import React from 'react'

const AuthHero = () => {
  return (
    <section className="hidden fixed lg:flex lg:w-[55%]  h-screen flex-col justify-between p-12 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzuh82jjx1oM0IoAHdFO6FO116oiNqQ5DQqWV04cUZk-JzdhZSJLybmAo6lCBy8wmVbdQ_D2yvkNCRf9L7MH6og4_m5tiKPIiQwwTy3aODr8VvImy0DyQ_YWXoop29Jl4dBTJ6oh4QWkw0TRQLmSrT9nsKSVmomPl2GpjW5OrA0whgiNXwmEiUeAIc-agaQhrDPzggIR09d_sK7vGsK_F810-x6i7XBsl9vg19CMWFqLvyGAc348WrQekWcjK7KOp4FWQeiI6Mg3Q')`,
        }}
        aria-label="Stunning mountain lake landscape at dawn with turquoise water and misty peaks"
        role="img"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#005440]/80 to-transparent z-10" />

      <div className="relative z-20">
        <span className="text-2xl font-black text-white drop-shadow-md font-headline">Travel Buddy</span>
      </div>

      <div className="relative z-20 max-w-xl">
        <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight font-headline">Find your travel tribe.</h2>
        <p className="text-xl text-white/90 mb-10 leading-relaxed">Connect with like-minded travelers, plan trips, and explore the world together.</p>
        <ul className="space-y-6">
          {["Global Community", "Easy Trip Planning", "Real-time Chat"].map((feature) => (
            <li key={feature} className="flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4.5-4.5 1.41-1.41L10 13.67l7.09-7.09L18.5 8l-8.5 8.5z" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-wide text-white">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-20">
        <span className="text-white/60 text-sm uppercase tracking-widest">© 2026 Travel Buddy Ecosystem</span>
      </div>
    </section>
  );
}

export default AuthHero