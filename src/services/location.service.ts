import { LocationData } from "../Interfaces/location.interface"
import { userApi as api } from "../lib/api-client"

export const locationServices = {
  updateLocation: async (data: LocationData) => {
    const res = await api.post("/location", data);
    return res.data;
  },
  getLocation: async () => {
    const res = await api.get("/location");
    return res.data;
  },
  reverseGeoCode: async (data:{latitude:number, longitude:number}) => {
    const res = await api.post("/location/reverse-geocode",data);
    return res.data;
  },
};