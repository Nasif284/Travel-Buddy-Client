import { ChangeUserStatus, GetAllUsersQuery } from "../interfaces/users.interfaces"
import { adminApi as api } from "../../../../../lib/admin-api"

export const UserManagementServices = {
    getAllUsers: async (params:GetAllUsersQuery) => {
        const res = await api.get("/users", { params })
        return res.data;
    },
    changeUserStatus: async (data: ChangeUserStatus) => {
        const res = await api.patch(`/users/status`,data)
        return  res.data
    }
}