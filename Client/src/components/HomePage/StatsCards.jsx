import React from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

function StatsCards({ summary }) {
  if (!summary) return null;

  const cards = [
    {
      title: "Current Balance",
      value: summary.currentBalance,
      icon: <Wallet size={22} />,
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600",
    },
    {
      title: "Total Income",
      value: summary.budget ,
      icon: <TrendingUp size={22} />,
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600",
    },
    {
      title: "Total Expense",
      value: summary.totalExpense,
      icon: <TrendingDown size={22} />,
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600",
    },
    {
      title: "Initial Balance",
      value: summary.initialBalance,
      icon: <PiggyBank size={22} />,
      bg: "bg-purple-100 dark:bg-purple-900/30",
      text: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {card.title}
              </p>

              <h2 className={`mt-2 text-3xl font-bold ${card.text}`}>
                ₹{card.value.toLocaleString()}
              </h2>
            </div>

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.text}`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;