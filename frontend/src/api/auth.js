import client from './client'

export async function login(username, password) {
    const response = await client.post('/api/jwt/create/', {username: username, password: password})
    const {accessToken, refreshToken} = response.data;

    localStorage.setItem('access', accessToken)
    localStorage.setItem('refresh', refreshToken)
    setAuthHeader(accessToken)
}

export async function logout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}

export async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh')

    const response = await client.post('/api/jwt/refresh/', {refresh: refreshToken})
    const {accessToken} = response.data;

    localStorage.setItem('access', accessToken)
    setAuthHeader(accessToken)
}

function setAuthHeader(accessToken) {
    client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}