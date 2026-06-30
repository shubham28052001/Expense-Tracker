import React from 'react'

function BudgetStats() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
                    <h3 className="text-gray-500">Total Budgets</h3>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
                    <h3 className="text-gray-500">Total Budget Amount</h3>
                    <p className="text-3xl font-bold mt-2">₹0</p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-5">
                    <h3 className="text-gray-500">Budget Used</h3>
                    <p className="text-3xl font-bold mt-2">0%</p>
                </div>

            </div>
        </div>
    )
}

export default BudgetStats
