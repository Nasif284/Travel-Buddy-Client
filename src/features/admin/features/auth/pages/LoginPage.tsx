import LoginForm from "../components/LoginForm";

export default function AdminLoginPage() {
  return (
    <div
      className="font-body flex items-center justify-center min-h-screen p-4 relative"
      style={{
        backgroundColor: "#0F0F0E",
        backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      <main className="w-full max-w-[440px] bg-white rounded-xl shadow-[0px_12px_32px_rgba(0,0,0,0.5)] p-12 flex flex-col gap-8 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold text-[#1c1c1a] tracking-tighter">Travel Buddy</span>
            <span className="px-2 py-0.5 bg-[#c9eadb] text-[#4d6b5f] text-[10px] font-bold uppercase tracking-widest rounded-full">Admin</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#1c1c1a]">Sign in to admin panel</h1>
            <p className="text-[#3f4944] text-sm font-medium">Restricted access. Authorized personnel only.</p>
          </div>
        </div>

        <LoginForm />
      </main>

      <div className="fixed bottom-0 right-0 w-1/3 h-1/3 opacity-10 pointer-events-none">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuALD3AKgfWILlM08BfNqBYtFl3i2N4wTF2BKkVp5XAFeKFzYx_W_918j6KvNKyh9E7DL1wXUs4CoVyx9t1pshn2IZFo8R5tsvh6OLYpEtlH8GqNiEQlATUojp_uQ3UGaZOpEONCjtrsn4c-JE_Erlk__pHZJ070gkIFwe341F4s7girIFFBVd9jIi698fIUkmPQrO96mvE8QHAjoPWbItMBQ9YgZnrppprB9Oxjd8BiW5I4mX28M-C5ap6XDTxGbO_IWGbmqgcfLNM" alt="" className="w-full h-full object-cover mix-blend-screen" />
      </div>
    </div>
  );
}
