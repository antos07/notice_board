import client from './client'
import {clearAuthTokens, setAuthTokens} from "axios-jwt";

export async function login(username, password) {
    const response = await client.post('/api/jwt/create/', {username: username, password: password})

    setAuthTokens({accessToken: response.data.access, refreshToken: response.data.refresh})
}

export async function logout() {
    clearAuthTokens()
}