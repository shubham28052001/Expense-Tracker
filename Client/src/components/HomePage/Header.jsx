import React from 'react'
import AddTransactionModal from "../Forms/AddTransactionModal"
import { useState } from 'react';
import ProgressBar from './ProgressBar';

function Header({ activeAccount }) {
    const [openForm, setOpenForm] = useState(false);
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className="text-3xl bg-gradient-to-r from-blue-500 via-indigo-800 to-pink-500 bg-clip-text font-bold text-transparent">
                    Dashboard
                </h1>
                <button
                    onClick={() => setOpenForm(true)}
                    className="mt-4 bg-black text-white px-4 py-2 rounded dark:bg-white dark:text-black font-medium"
                >
                    Add Transaction
                </button>
            </div>
            <ProgressBar activeAccount={activeAccount}/>
            <AddTransactionModal
                open={openForm}
                onClose={() => setOpenForm(false)}
            />
        </div>
    );
}

export default Header;
