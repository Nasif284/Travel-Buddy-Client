import { lookupsService } from "@/src/services/lookup.service";
import {  useQuery } from "@tanstack/react-query";


export const useGetAllCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: () => lookupsService.getAllCountries(),
  });
};