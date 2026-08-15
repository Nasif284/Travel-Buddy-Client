export default function Avatar({ avatar, name, online = false }: { avatar: string; name: string; online?: boolean }) {
  return (
    <div className="relative shrink-0">
      <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover" />
      {online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />}
    </div>
  );
}