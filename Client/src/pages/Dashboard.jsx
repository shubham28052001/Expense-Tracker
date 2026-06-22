import { useContext } from "react";
import { AuthContexts } from "../context/AuthProvider";
import Sidebar from "../components/Dashbaordlayout/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
    const { user } = useContext(AuthContexts);

    return (
        <div className="flex min-h-screen dark:bg-gray-900 transition-colors">
            <Sidebar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default Dashboard;