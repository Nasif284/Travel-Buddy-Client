import AddTripButton from "@/src/features/user/trips/components/AddTripButton";
import PlansTabs from "@/src/features/user/trips/components/PlansTabs";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="ml-64 min-h-screen pb-32">
      <div className="mx-auto pt-24 px-20 sm:px-6">
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-[#181d1a] tracking-tight font-headline">My trips</h1>
              <p className="text-[#3f4944] mt-2 font-medium">Manage your wanderlust adventures</p>
            </div>
            <AddTripButton />
          </div>
          <PlansTabs />
        </div>
        {children}
      </div>
    </main>
  );
}
