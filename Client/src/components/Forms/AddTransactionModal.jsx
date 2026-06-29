import React from "react";
import ReactDOM from "react-dom";
import AddTransactionForm from "./AddTransactionForm";

function AddTransactionModal({ open, onClose,onSuccess  }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/90 dark:bg-black/90 bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white dark:bg-black/40 p-5 rounded-xl w-[400px] relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold dark:text-gray-200 text-black"
        >
          ✕
        </button>

        <AddTransactionForm onClose={onClose} onSuccess={onSuccess}/>
      </div>

    </div>,
    document.getElementById("modal-root")
  );
}

export default AddTransactionModal;