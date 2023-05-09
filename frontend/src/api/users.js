import client from "./client";

export const getMe = async () => (await client.get('/api/users/me/')).data

export const register = async (email, username, password) => (await client.post('/api/users/', {username, email, password})).data