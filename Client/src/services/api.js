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
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/login") &&
            !originalRequest.url?.includes("/refresh-token")
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken =
                    localStorage.getItem("refreshToken");

                const res = await axios.post(
                    "http://localhost:5000/api/users/refresh-token",
                    { refreshToken }
                );

                const {
                    token,
                    refreshToken: newRefreshToken,
                } = res.data.data;

                localStorage.setItem("token", token);
                localStorage.setItem(
                    "refreshToken",
                    newRefreshToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${token}`;

                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;