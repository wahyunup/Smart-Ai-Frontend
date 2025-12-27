import api from "../../../../shared/lib/Axios"

const allAdminApi = async (page:number, limit:number) => {
    try {
        const res = await api.get(`/admin/companies/admins?page=${page}&limit=${limit}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export {allAdminApi}