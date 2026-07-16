import { userApi as api } from "@/src/lib/api-client"

export const checklistServices = {
    getChecklist : async (id:string) => {
        const res = await api.get(`/trip/group/${id}/checklist/`);
        return res.data
    }
}