import React from 'react'

function BudgetCard() {
    return (
        <div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Budgets
                </h2>

                <div className="text-center py-16 text-gray-500">
                    No budgets created yet.
                </div>

            </div>
        </div>
    )
}

export default BudgetCard
