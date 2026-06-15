import { LocationData } from "@/src/Interfaces/location.interface";
import { locationServices } from "@/src/services/location.service";
import { ApiError } from "@/src/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useUpdateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LocationData) => locationServices.updateLocation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_location"],
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}

export function useGetLocation() {
  return useQuery({
    queryKey: ["user_location"],
    queryFn: () => locationServices.getLocation(),
  });
}


export function useReverseGeoCode() {
  return useMutation({
    mutationFn: (data: {latitude:number,longitude:number}) => locationServices.reverseGeoCode(data),
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error.response?.data?.error?.message || "Something went wrong");
    },
  });
}



