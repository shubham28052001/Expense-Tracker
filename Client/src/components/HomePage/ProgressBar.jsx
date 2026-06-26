import React from 'react'

function ProgressBar({ activeAccount }) {
    return (
        <div className="bg-white rounded-xl shadow p-5 m-4">
            {activeAccount && (
                <div className="mt-3">
                    <p className="text-gray-500 text-sm">
                        Active Account
                    </p>

                    <h2 className="text-lg font-semibold capitalize">
                        {activeAccount.name}
                    </h2>

                    <p className="text-green-600 font-medium">
                        ₹{activeAccount.initialBalance}
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProgressBar
