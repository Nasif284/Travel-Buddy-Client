import { useQuery } from "@tanstack/react-query";
import { checklistServices } from "../services/checklist.service";

export function useGetChecklist(id: string) {
  return useQuery({
    queryKey: ["checklist", id],
    queryFn: () => checklistServices.getChecklist(id),
  });
}
