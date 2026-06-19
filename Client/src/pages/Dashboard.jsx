import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setUser(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>{user?.fullName}</h1>
            <p>{user?.email}</p>
        </div>
    );
}

export default Dashboard;