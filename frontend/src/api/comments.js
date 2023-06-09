import client from "./client";

export async function listAll(noticeId) {
    const response = await client.get(`/api/notices/${noticeId}/comments/`)
    return response.data
}


export async function create(noticeId, text) {
    const response = await client.post(`/api/notices/${noticeId}/comments/`, {text})
    return response.data
}


export async function remove(noticeId, commentId) {
    await client.delete(`/api/notices/${noticeId}/comments/${commentId}/`)
}


export async function edit(noticeId, commentId, text) {
    const response = await client.patch(`/api/notices/${noticeId}/comments/${commentId}/`,
        {text})
    return response.data
}
