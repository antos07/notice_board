import axios from "axios";
import {applyAuthTokenInterceptor} from "axios-jwt";

const BASE_URL = "http://localhost:8000"

const client = axios.create({
    baseURL: "http://localhost:8000"
})

applyAuthTokenInterceptor(client, {
    requestRefresh: (refresh) => {
        const url = `${BASE_URL}/api/jwt/refresh/`
        // Some magic from the docs
        return axios.post(url, {refresh}).then(response => response.data.access)
    }
})

export default client