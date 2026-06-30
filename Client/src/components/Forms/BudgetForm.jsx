import { useState } from "react";

function BudgetForm({ accounts, onSubmit, budget }) {
    const [formData, setFormData] = useState({
        accountId: budget?.accountId || "",
        category: budget?.category || "",
        amount: budget?.amount || "",
        month: budget?.month || new Date().getMonth() + 1,
        year: budget?.year || new Date().getFullYear(),
        alertPercentage: budget?.alertPercentage || 80,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <h2 className="text-2xl font-bold text-center">
                {budget ? "Edit Budget" : "Create Budget"}
            </h2>

            {/* Account */}
            <div>
                <label className="block mb-2 font-medium">Account</label>
                <select
                    name="accountId"
                    value={formData.accountId}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    required
                >
                    <option value="">Select Account</option>

                    {accounts?.map((acc) => (
                        <option key={acc._id} value={acc._id}>
                            {acc.name}
                        </option>
                    ))}

                </select>
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Category
                </label>

                <select name="category">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>Bills</option>
                    <option>Others</option>
                </select>
            </div>

            {/* Amount */}
            <div>
                <label className="block mb-2 font-medium">
                    Budget Amount
                </label>

                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="5000"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <label className="block mb-2 font-medium">
                        Month
                    </label>

                    <input
                        type="number"
                        min="1"
                        max="12"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Year
                    </label>

                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />
                </div>

            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Alert Percentage
                </label>

                <input
                    type="number"
                    min="1"
                    max="100"
                    name="alertPercentage"
                    value={formData.alertPercentage}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />
            </div>

            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
                {budget ? "Update Budget" : "Create Budget"}
            </button>

        </form>
    );
}

export default BudgetForm;