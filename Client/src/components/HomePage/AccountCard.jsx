import React, { useState } from 'react'
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { TrendingUp, TrendingDown } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { deleteAccount } from '../../services/authService';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router"

function AccountCard({ account, handleToggle, fetchAccounts, setEditAccount }) {
      const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const response = await deleteAccount(id)
            await fetchAccounts();
            setOpenMenu(false);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        }
    }

    const accountInfo = (id) => {
        navigate(`/accountinfo/${id}`)
    }

    return (
        <div onClick={() => accountInfo(account._id)}
            className="bg-gray-100 dark:bg-gray-800 mt-3 rounded-xl max-w-4xs h-36 shadow-md p-5 hover:shadow-lg transition"
        >
            <div className="flex justify-between items-start">
                <div className="w-full">

                    <div className="flex items-center justify-between ">
                        <h3 className="text-[12px] dark:text-gray-50 capitalize">
                            {account.name}
                        </h3>
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    setOpenMenu(!openMenu) 
                                    e.stopPropagation();
                                }}
                                className="p-1 rounded dark:text-gray-50 "
                            >
                                <MoreVertical size={18} />
                            </button>

                            {openMenu && (
                                <div className="absolute right-0 mt-2 w-28 bg-gray-100 dark:bg-gray-600 rounded-lg shadow-lg border z-10">
                                    <button onClick={(e) => {
                                        setEditAccount(account);
                                        e.stopPropagation();
                                        setOpenMenu(false)
                                    }}
                                        className="w-full text-left px-3 py-2 dark:text-gray-50 cursor-pointer"
                                    >
                                        Edit
                                    </button>

                                    <button onClick={(e) => {
                                        handleDelete(account._id)
                                        e.stopPropagation();
                                    }}
                                        className="w-full text-left px-3 py-2 text-red-500 dark:text-red-400 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold dark:text-gray-50 mb-4 flex items-center gap-1">
                          <span className='text-[12px]'>Initial balance:</span> ₹{account.initialBalance}
                        </h1>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (account.isActive === false) {
                                    handleToggle(account._id);
                                }
                            }}
                            className="text-2xl "
                        >
                            {account.isActive ? (
                                <BsToggleOn className="text-black dark:text-white" />
                            ) : (
                                <BsToggleOff className="text-gray-400 dark:text-gray-200" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-[12px] text-gray-500 dark:text-gray-300">
                {account.type} Account
            </p>

            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <span className="text-green-700"><TrendingUp size={18} /></span>
                    <p className='dark:text-gray-50'>Income</p>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-red-700"><TrendingDown size={18} /></span>
                    <p className='dark:text-gray-50'>Expense</p>
                </div>
            </div>
        </div>
    )
}

export default AccountCard;
