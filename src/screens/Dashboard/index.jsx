// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [ordersCount, setOrdersCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // TODO: Fetch real data from Firestore/DB
                setOrdersCount(6); // only show if > 0
                setCartCount(6);   // only show if > 0
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <Sidebar ordersCount={ordersCount} cartCount={cartCount} />
            <div style={{ flex: 1, padding: "2rem" }}>
                <h1>Welcome, {user?.email}</h1>
                {/* Dashboard content here */}
            </div>
        </div>
    );
};

export default Dashboard;
