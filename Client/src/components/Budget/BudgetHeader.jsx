import React from 'react'
import BudgetStats from './BudgetStats';
import BudgetCard from './BudgetCard';

function BudgetHeader() {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Budget Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Create and manage your monthly budgets.
                    </p>
                </div>

                <button className="group flex items-center gap-2 bg-black hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
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
                    Create Budget
                </button>
            </div>

             <BudgetStats/>
             <BudgetCard />

        </div>
    )
}

export default BudgetHeader;
