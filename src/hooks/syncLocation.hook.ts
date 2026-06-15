import { useEffect } from "react";
import { useUpdateLocation } from "./api/location.hooks";

export function useSyncLocation() {
  const updateLocation = useUpdateLocation();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocation.mutate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }, []);
}
