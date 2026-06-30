import api from "./api"

//^ Auth Services

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

export const getProfile = () => {
    return api.get("/users/profile");
};


//#Accounts

export const createAccount = (data) => {
    return api.post("/account/create", data);
}

export const getAllaccount = () => {
    return api.get("/account/getAllaccount")
}

export const getAccount = (id) => {
    return api.get(`/account/getaccount/${id}`)
}

export const updateAccount = (id, data) => {
    return api.put(`/account/updateAccount/${id}`, data)
}

export const deleteAccount = (id) => {
    return api.delete(`/account/deleteAccount/${id}`)
}

export const switchActiveAccount = (id) => {
    return api.patch(`/account/toggle/${id}`);
}

//#Trancsactions

export const createTransaction = (data) => {
    return api.post("/transaction/create", data)
}

export const transactions = () => {
    return api.get("/transaction/transactions")
}

export const getSingleTransaction = (id) => {
    return api.get(`/transaction/transaction/${id}`)
}

export const updateTransaction = (id, data) => {
    return api.put(`/transaction/update/${id}`, data);
};

export const deleteTransaction = (id) => {
    return api.delete(`/transaction/delete/${id}`)
}

export const SummaryTransaction = (id) => {
    return api.get(`/transaction/summary/${id}`)
}

export const getRecent = (id) => {
    return api.get(`/transaction/getRecent/${id}`)
}


//^Budgets


export const createBudget = (data) => {
    return api.post("/budget/create", data);
};

export const getAllBudgets = () => {
    return api.get("/budget/getAllBudgets");
};

export const getBudget = (id) => {
    return api.get(`/budget/getBudget/${id}`);
};

export const updateBudget = (id, data) => {
    return api.put(`/budget/updateBudget/${id}`, data);
};

export const deleteBudget = (id) => {
    return api.delete(`/budget/deleteBudget/${id}`);
};

export const getBudgetUsage = (id) => {
    return api.get(`/budget/getBudgetUsage/${id}`);
};

export const getExpenseByCategory = (accountId) => {
    return api.get(`/budget/expense-by-category/${accountId}`);
};

export const getMonthlyOverview = (accountId) => {
    return api.get(`/budget/monthlyoverview/${accountId}`);
};




