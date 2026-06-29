import React, { useEffect, useState } from "react";
import { SummaryTransaction } from "../../services/authService";
import { toast } from "react-hot-toast";

function ProgressBar({ activeAccount, refresh }) {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        if (!activeAccount?._id) return;

        const fetchSummary = async () => {
            try {
                const res = await SummaryTransaction(activeAccount._id);
                setSummary(res.data.data);
            } catch (error) {
                toast.error("Failed to load dashboard");
            }
        };

        fetchSummary();
    }, [activeAccount, refresh]);

    if (!summary) return null;

    const budget = (summary.initialBalance || 0) + (summary.totalIncome || 0);
    const spent = summary.totalExpense || 0;
    const remaining = budget - spent;
    const usedPercent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
    let progressColor = "bg-emerald-500"; 
    if (usedPercent >= 90) {
        progressColor = "bg-red-500";   
    } else if (usedPercent >= 70) {
        progressColor = "bg-amber-500";   
    }

    return (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm shadow-black dark:shadow-sm dark:shadow-white border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Budget Overview
                    </h2>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                        ₹{spent.toLocaleString()} <span className="text-gray-400 dark:text-gray-500 text-xs font-normal">spent of</span> ₹{budget.toLocaleString()}
                    </p>
                </div>
                
                <div className="text-right">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-0.5">
                        Remaining
                    </span>
                    <span className={`text-lg font-bold ${remaining < 0 ? 'text-red-500' : 'text-gray-800 dark:text-gray-100'}`}>
                        ₹{remaining.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Progress Bar Track */}
            <div className="mt-4 w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${progressColor}`}
                    style={{ width: `${usedPercent}%` }}
                />
            </div>

            {/* Footer Status */}
            <div className="flex justify-between items-center mt-3">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    {usedPercent === 0 ? "No spending yet" : ""}
                </span>
                <span className={`text-xs font-bold ${usedPercent >= 90 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                    {usedPercent.toFixed(1)}% used
                </span>
            </div>
        </div>
    );
}

export default ProgressBar;