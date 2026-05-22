import AuthHero from "@/src/features/user/auth/components/AuthHero";
import AuthTabs from "@/src/features/user/auth/components/AuthTabs";
import GoogleAuth from "@/src/features/user/auth/components/GoogleAuth";
import AuthFooter from "@/src/features/user/auth/components/AuthFooter";

export default function AuthPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full min-h-screen">
      <AuthHero />
      <section className="w-full ml-[55%]  lg:w-[45%] bg-[#f7faf6] items-center flex flex-col p-8 md:p-12 lg:p-20 relative">
        <div className="w-full max-w-md">
          <AuthTabs />
          <GoogleAuth />
          {children}
          <AuthFooter />
        </div>
      </section>
    </main>
  );
}
