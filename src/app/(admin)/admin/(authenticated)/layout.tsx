import AdminSidebar from "@/src/features/admin/components/AdminSideBar";
import AdminTopBar from "@/src/features/admin/components/AdminTopBar";
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-[#fcf9f5] text-[#1c1c1a] flex min-h-screen overflow-hidden antialiased">
      <AdminSidebar />
      <div className="flex flex flex-col min-w-0 ml-60">
        <AdminTopBar />
          </div>
          {children}
    </div>
  );
};

export default layout;
