import client from "./client";

export const listAll = async () => {
    const response = await client.get('/api/notices/')
    return response.data
}

export const getById = async (id) => {
    id = +id
    const response = await client.get(`/api/notices/${id}/`)
    return response.data
}
