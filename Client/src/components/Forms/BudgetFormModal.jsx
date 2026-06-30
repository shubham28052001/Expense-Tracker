import React from "react";
import ReactDOM from "react-dom";
import BudgetForm from "./BudgetForm";

function BudgetFormModal({ open, onClose, onSuccess, budget }) {
    if (!open) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

            <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-lg p-6 relative shadow-xl">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-2xl font-bold text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
                >
                    ✕
                </button>

                <BudgetForm
                    onClose={onClose}
                    onSuccess={onSuccess}
                />

            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default BudgetFormModal;