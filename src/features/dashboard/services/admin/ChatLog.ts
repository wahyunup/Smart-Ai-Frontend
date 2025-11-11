import api from "../../../../shared/lib/Axios"

const chatLog = async (page:number, limit:number) => {
    try {
        const res = await api.get(`/company/chatlogs?page=${page}&limit=${limit}`)
        return res.data
    } catch (error) {
        throw error
    }
} 

const downloadCsv = async () => {
    try {
        const res = api.get("/company/chatlogs/export?start_date=2025-01-01&end_date=2026-01-31", {
            responseType : "blob"
        })
        return (await res).data
    } catch (error) {
        throw error
    }
}

const chatLogDetail = async (conversation_id:string) => {
    try {
        const res = await api.get(`/company/chatlogs/${conversation_id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export {chatLog, downloadCsv, chatLogDetail}