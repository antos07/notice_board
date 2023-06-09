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

export async function listMy() {
    const response = await client.get('/api/notices/my/')
    return response.data
}

export async function create(title, text) {
    const response = await client.post('/api/notices/', {title, text})
    return response.data
}

export async function remove(id) {
    await client.delete(`/api/notices/${id}/`)
}

export async function edit(id, title, text) {
    const response = await client.patch(`/api/notices/${id}/`, {text, title})
    return response.data
}
