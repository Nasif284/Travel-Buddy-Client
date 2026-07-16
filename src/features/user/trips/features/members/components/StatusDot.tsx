import { OnlineStatus } from "../interfaces/interfaces"; 

export default function StatusDot({ status }: { status: OnlineStatus }) {
  if (status === "online") return <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />;
  if (status === "traveling") return null; 
  return null;
}