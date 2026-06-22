export default function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#f5f7f6] rounded-xl p-4">
      <p className="text-xs uppercase font-bold text-[#6f7a74]">{title}</p>

      <p className="mt-2 font-semibold text-[#181d1a]">{value}</p>
    </div>
  );
}
