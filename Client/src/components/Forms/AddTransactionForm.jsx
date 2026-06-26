import React, { useEffect, useState } from "react";
import { createTransaction, getAllaccount } from "../../services/authService"
import { toast } from "react-hot-toast"
function AddTransactionForm() {
  const getToday = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    type: "EXPENSE",
    amount: "",
    category: "",
    description: "",
    date: getToday(),
    isRecurring: false,
    recurringInterval: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoadingAccounts(true);
        const res = await getAllaccount();
        setAccounts(res.data.data);
      } catch (error) {
        toast.error("Failed to load accounts");
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await createTransaction({ ...form, accountId });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (accounts.length > 0) {
      const active = accounts.find((acc) => acc.isActive);
      if (active) {
        setAccountId(active._id);
      }
    }
  }, [accounts]);


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white bg p-5 dark:bg-black/80 rounded-xl shadow space-y-3"
    >
      <h2 className="text-xl font-bold dark:text-gray-50">Add Transaction</h2>

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border p-2 rounded 
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               bg-white text-gray-900
               dark:bg-gray-800 dark:text-gray-50
               dark:border-gray-600"
      >
        <option value="EXPENSE">Expense</option>
        <option value="INCOME">Income</option>
      </select>

      <select
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        className="w-full border p-2 rounded 
             focus:outline-none focus:ring-2 focus:ring-indigo-500
             bg-white text-gray-900
             dark:bg-gray-800 dark:text-gray-50
             dark:border-gray-600"
      >
        {loadingAccounts ? (
          <option disabled>Loading accounts...</option>
        ) : (
          accounts.map((acc) => (
            <option key={acc._id} value={acc._id}>
              {acc.name} {acc.isActive ? "(Default)" : ""}
            </option>
          ))
        )}
      </select>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full border p-2 rounded 
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               bg-white text-gray-900
               dark:bg-gray-800 dark:text-gray-50
               dark:border-gray-600"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2 rounded 
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               bg-white text-gray-900
               dark:bg-gray-800 dark:text-gray-50
               dark:border-gray-600"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded 
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               bg-white text-gray-900
               dark:bg-gray-800 dark:text-gray-50
               dark:border-gray-600"
      />

      <input
        type="date"
        name="date"
        value={form.date}
        max={getToday()}
        onChange={handleChange}
        className="w-full border p-2 rounded 
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               bg-white text-gray-900
               dark:bg-gray-800 dark:text-gray-50
               dark:border-gray-600"
      />

      <label className="flex items-center gap-2 dark:text-gray-100">
        <input
          type="checkbox"
          name="isRecurring"
          checked={form.isRecurring}
          onChange={handleChange}
        />
        Is Recurring
      </label>

      {form.isRecurring && (
        <select
          name="recurringInterval"
          value={form.recurringInterval}
          onChange={handleChange}
          className="w-full border p-2 rounded 
               focus:outline-none focus:ring-2 focus:ring-indigo-500
               bg-white text-gray-900
               dark:bg-gray-800 dark:text-gray-50
               dark:border-gray-600"
        >
          <option value="">Select Interval</option>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      )}

      <button
        type="submit"
        className="w-full bg-black dark:bg-white dark:text-black text-white p-2 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default AddTransactionForm;