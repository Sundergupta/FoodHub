// src/components/Sidebar.jsx
import React from "react";
import "./style.css";

const Sidebar = ({ ordersCount, cartCount }) => {
    return (
        <aside className="sidebar">
            <div className="logo">🍽️ Lilies</div>
            <ul className="nav-links">
                <li className="active">🏠 Dashboard</li>
                <li>👤 Your Profile</li>
                <li>
                    🧾 Orders{" "}
                    {ordersCount > 0 && (
                        <span className="badge green">{ordersCount}</span>
                    )}
                </li>
                <li>
                    🛒 Your Cart{" "}
                    {cartCount > 0 && (
                        <span className="badge orange">{cartCount}</span>
                    )}
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
