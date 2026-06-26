import React, { useEffect } from "react";
import { createAccount, updateAccount } from "../../services/authService"
import { useState } from "react";
import { toast } from "react-hot-toast"
import { validateAccountForm } from "../../utils/validation";

function CreateAccount({ account, setOpenModal, setEditAccount, fetchAccounts }) {
    const [formData, setFormData] = useState({
        name: account?.name || "",
        type: account?.type || "",
        initialBalance: account?.initialBalance || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    useEffect(() => {
        if (account) {
            setFormData({
                name: account.name,
                type: account.type,
                initialBalance: account.initialBalance,
            });
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "initialBalance" ? Number(value) : value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateAccountForm(formData, !!account);
        console.log("formData", formData);
        console.log("errors", errors);


        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        setLoading(true);

        try {
            let response;
            if (account) {
                response = await updateAccount(
                    account._id,
                    formData
                );
            } else {
                response = await createAccount(
                    formData
                );
            }
            toast.success(response.data.message);
            await fetchAccounts();
            if (account) {
                setEditAccount(null);
            } else {
                setOpenModal(false);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        if (account) {
            setEditAccount(null);
        } else {
            setOpenModal(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
            onClick={handleClose}
        >
            {loading && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}
            <div
                className="bg-white dark:bg-gray-600 w-full rounded-t-2xl p-6 animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">
                    {account ? "Update Account" : "Create Account"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label htmlFor="AccountName" className="dark:text-gray-50">Account Name</label>
                    {error.name && (
                        <p className="text-red-500 font-medium  dark:text-red-400">{error.name}</p>
                    )}
                    <input
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="e.g. Main Checking"
                        className="border p-2 rounded dark:placeholder:text-gray-50 dark:text-gray-50 dark:border-gray-50 dark:focus:text-gray-50"
                    />
                    <label htmlFor="AccountType"className="dark:text-gray-50">Account Type</label>
                    {error.type && (
                        <p className="text-red-500 text-sm">{error.type}</p>
                    )}
                    <select className="border p-2 rounded dark:placeholder:text-gray-50 dark:text-gray-50 dark:border-gray-50 dark:focus:text-gray-50" name="type" value={formData.type} onChange={handleChange}>
                       <option value="">Select Type</option>
                        <option className="dark:text-gray-900" value="SAVING">SAVING</option>
                        <option className="dark:text-gray-900" value="CURRENT">CURRENT</option>
                    </select>

                    {!account && (
                        <>
                            <label htmlFor="initialBalance" className="dark:text-gray-50">Initial Balance</label>
                            {error.initialBalance && (
                                <p className="text-red-500 text-sm">
                                    {error.initialBalance}
                                </p>
                            )}
                            <input
                                type="number"
                                name="initialBalance"
                                value={formData.initialBalance}
                                onChange={handleChange}
                                min={0}
                                placeholder="0.0"
                                className="border p-2 rounded dark:placeholder:text-gray-50 dark:text-gray-50 dark:border-gray-50 dark:focus:text-gray-50"
                            />
                        </>
                    )}

                    <div className="flex justify-center gap-2 mt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {account ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default CreateAccount;
