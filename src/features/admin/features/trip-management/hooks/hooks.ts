import { useQuery } from "@tanstack/react-query";
import { tripManagementServices } from "../services/services";
import { GetGroupsRequestDTO } from "../interfaces/interfaces";

export function useGetAllTripGroups(query: GetGroupsRequestDTO) {
  return useQuery({
    queryKey: ["all_groups", query],
    queryFn: () => tripManagementServices.getAllTripGroups(query),
  });
}
export function useGetGroup(id:string) {
  return useQuery({
    queryKey: ["group_data", id],
    queryFn: () => tripManagementServices.getGroup(id),
  });
}