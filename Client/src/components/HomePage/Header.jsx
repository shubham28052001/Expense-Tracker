import React, { useEffect, useState } from 'react';
import AddTransactionModal from "../Forms/AddTransactionModal";
import { SummaryTransaction } from "../../services/authService";
import ProgressBar from './ProgressBar';
import {toast} from 'react-hot-toast';
import StatsCards from './StatsCards';

function Header({ activeAccount, openForm, setOpenForm, refresh, handleRefresh }) {
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

    return (
        <div className="flex flex-col space-y-6 w-full">
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div>
                    <h1 className="text-3xl md:text-4xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text font-extrabold text-transparent tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Track your expenses and manage your finances.
                    </p>
                </div>

                <button
                    onClick={() => setOpenForm(true)}
                    className="group flex items-center gap-2 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                >
                    <svg
                        className="w-5 h-5 transition-transform group-hover:rotate-90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Transaction
                </button>
            </div>
            <StatsCards summary={summary} />
            <ProgressBar summary={summary} />
            <AddTransactionModal open={openForm} onClose={() => setOpenForm(false)} onSuccess={handleRefresh} />
        </div>
    );
}

export default Header;