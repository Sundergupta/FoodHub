// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Sidebar = ({ ordersCount, cartCount, onCartClick, onOrdersClick }) => {
    const navigate = useNavigate(); // 👈 for programmatic navigation

    return (
        <aside className="sidebar">
            <div className="logo">🍽️ FoodHub</div>
            <ul className="nav-links">
                <li className="active" onClick={() => navigate("/")}>🏠 Dashboard</li>
                <li onClick={() => navigate("/profile")}>👤 Your Profile</li> {/* 👈 profile navigation */}
                <li onClick={onOrdersClick} className="orders-link">
                    🧾 Orders{" "}
                    {ordersCount > 0 && (
                        <span className="badge green">{ordersCount}</span>
                    )}
                </li>
                <li onClick={onCartClick} className="cart-link">
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
