import api from "./api"

export const registerUser = (data) => {
    return api.post("users/register", data);
};

export const loginUser = (data) => {
    return api.post("users/login", data);
};

export const forgotPassword = (email) => {
    return api.post("users/forgot-password", {
        email: email
    })
}

export const resetPassword = (password, token) => {
    return api.post(`users/reset-password?token=${token}`,
        {
            newPassword: password
        }
    )
};

export const verifyEmail = (token) => {
    return api.get(`/users/verify-email?token=${token}`);
}

export const resendEmail = (email) => {
    return api.post("/users/resend-verification", { email });
};

export const googleLogin = (token) => {
    return api.post("/users/google-login", { token });
}

export const refreshAccessToken = (refreshToken) => {
    return api.post("/users/refresh-token", {
        refreshToken,
    });
};