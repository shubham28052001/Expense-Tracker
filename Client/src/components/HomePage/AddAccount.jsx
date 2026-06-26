import React from 'react'

function AddAccount({setOpenModal}) {
    return (
        <div
            onClick={() => setOpenModal(true)}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl max-w-4xs shadow-md flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition h-36"
        >
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-300 flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-blue-600">+</span>
            </div>

            <h3 className="text-lg font-semibold dark:text-gray-50 text-gray-700">
                Add Account
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-300 text-center mt-2">
                Create a new account to manage your finances
            </p>
        </div>
    )
}

export default AddAccount
