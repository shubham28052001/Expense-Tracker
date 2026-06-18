import axios from "axios"

// Axios Instance (IMPORTANT - central setup)
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
})

// 🔥 3. Request Interceptor (Token attach karega)

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (!token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url;

        if (url?.includes("/login")) {
            return Promise.reject(error);
        }

        if (status === 401) {
            console.log("Unauthorized, logging out...");

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;