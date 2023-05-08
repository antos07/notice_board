import client from "./client";

export const getMe = async () => await client.get('/users/me/')