import client from "./client";

export const listAll = async () =>  {
    const response = await client.get('/api/notices/')
    return response.data
}