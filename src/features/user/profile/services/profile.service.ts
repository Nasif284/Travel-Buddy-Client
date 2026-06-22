import { SettingsData, UpdateProfileData } from "../interfaces/profile.interface";
import { userApi as api } from "../../../../lib/api-client";

export const ProfileServices = {
  updateProfile: async (data: UpdateProfileData) => {
    const res = await api.patch("/profile", data);
    return res.data;
  },
  updateCover: async (formData: FormData) => {
    const res = await api.patch("/profile/cover", formData);
    return res.data;
  },
  updateAvatar: async (formData: FormData) => {
    const res = await api.patch("/profile/avatar", formData);
    return res.data;
  },
  getSettings: async () => {
    const res = await api.get("/profile/settings");
    return res.data;
  },
  updateSettings: async (data: SettingsData) => {
    const res = await api.patch("/profile/settings", data);
    return res.data;
  },
};
