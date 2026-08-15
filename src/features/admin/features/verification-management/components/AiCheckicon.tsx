import { VerificationAiCheckDTO } from "../interfaces/interfaces";
import { Icons } from "../utils/icons";

export default function AiCheckIcon({ status }: { status: VerificationAiCheckDTO["status"] }) {
  if (status === "PASSED") return <span className="w-6 h-6 rounded-full bg-[#c9eadb] text-[#005440] flex items-center justify-center flex-shrink-0">{Icons.check}</span>;
  if (status === "FAILED") return <span className="w-6 h-6 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center flex-shrink-0">{Icons.x}</span>;
  return <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">{Icons.warning}</span>;
}