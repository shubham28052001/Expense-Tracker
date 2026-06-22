import {
  LayoutDashboard,
  Receipt,
  Target,
  PieChart,
  Brain,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r dark:bg-gray-900 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold">
            ET
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">
              Expense Tracker
            </h2>
            <p className="text-xs text-gray-500">
              AI Powered Finance
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-100 ${isActive
              ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm dark:bg-indigo-900/30"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/expenses"
          className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-100 ${isActive
              ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm dark:bg-indigo-900/30"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          <Receipt size={20} />
          Expenses
        </NavLink>

        <NavLink
          to="/dashboard/budgets"
          className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-100 ${isActive
              ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm dark:bg-indigo-900/30"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          <Target size={20} />
          Budgets
        </NavLink>

        <NavLink
          to="/dashboard/analytics"
          className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-100 ${isActive
              ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm dark:bg-indigo-900/30"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          <PieChart size={20} />
          Analytics
        </NavLink>


        <NavLink
          to="/dashboard/ai-insights"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-100 ${isActive
              ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm dark:bg-indigo-900/30"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          <Brain size={20} />
          AI Insights
        </NavLink>


        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-100 ${isActive
              ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm dark:bg-indigo-900/30"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-100 ${isActive
              ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 shadow-sm dark:bg-indigo-900/30"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>

      <div className="absolute bottom-5 w-64 px-4">
        <button className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-red-600 hover:bg-red-50">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;