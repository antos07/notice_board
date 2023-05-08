import axios from "axios";
import {applyAuthTokenInterceptor} from "axios-jwt";

const BASE_URL = "http://localhost:8000"

const client = axios.create({
    baseURL: "http://localhost:8000"
})

applyAuthTokenInterceptor(client, {
    requestRefresh: async (refreshToken) => {
        const url = `${BASE_URL}/api/jwt/refresh`
        const response = await axios.post(url, {refresh: refreshToken})
        return response.data.refresh
    }
})

export default client