import React, { useEffect, useState } from "react";
import { getRecent } from "../../services/authService";
import { toast } from "react-hot-toast";
import { Trash2, Pencil } from "lucide-react";

function RecentTransactions({ activeAccount, refresh, accounts, onAccountChange }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (!activeAccount?._id) return;

        const fetchTransactions = async () => {
            try {
                const res = await getRecent(activeAccount._id);
                setTransactions(res.data.data);
            } catch (error) {
                toast.error("Failed to load transactions");
            }
        };

        fetchTransactions();
    }, [activeAccount, refresh]);

    return (
        <div className="w-2/5 mt-4 p-4 rounded-xl flex flex-col bg-gray-200 dark:bg-gray-600">
            
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800 mb-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    Recent Transactions
                </h2>

                <select
                    value={activeAccount?._id || ""}
                    onChange={(e) => onAccountChange(e.target.value)}
                    className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 dark:text-gray-200 cursor-pointer transition-shadow"
                >
                    {accounts.map((account) => (
                        <option key={account._id} value={account._id}>
                            {account.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Transactions List */}
            {transactions.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                        No recent transactions found.
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {transactions.map((item) => (
                        <div
                            key={item._id}
                            className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                        >
                            {/* Left Side: Icon & Details */}
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center text-lg shadow-sm 
                                        ${item.type === "INCOME"
                                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                                            : "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                                    }`}
                                >
                                    {item.type === "INCOME" ? "💰" : "💸"}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 capitalize">
                                        {item.category}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                                        <span className="truncate max-w-30 sm:max-w-50">
                                            {item.description || "No description"}
                                        </span>
                                        <span className="text-gray-300 dark:text-gray-600">•</span>
                                        <span>
                                            {new Date(item.createdAt).toLocaleString("en-IN", {
                                                timeZone: "Asia/Kolkata",
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Amount & Actions */}
                            <div className="flex items-center gap-3">
                                <span
                                    className={`font-bold text-base sm:text-lg whitespace-nowrap ${
                                        item.type === "INCOME"
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-rose-600 dark:text-rose-400"
                                    }`}
                                >
                                    {item.type === "INCOME" ? "+" : "-"}₹{item.amount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecentTransactions;