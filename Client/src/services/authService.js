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

export const resetPassword = (password, token)=>{
    return api.post(`users/reset-password?token=${token}`,
        {
            newPassword: password
        }
    )
};

