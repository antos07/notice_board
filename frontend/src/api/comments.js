import client from "./client";

export async function listAll(noticeId) {
    const response = await client.get(`/api/notices/${noticeId}/comments/`)
    return response.data
}