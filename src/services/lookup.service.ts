import { userApi as api } from "../lib/api-client";
export const lookupsService = {
  getAllCountries: async () => {
    const res = await api.get("/lookup/countries");
    return res.data;
  },
};
