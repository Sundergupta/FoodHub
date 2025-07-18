// src/components/Sidebar.jsx
import React from "react";
import "./style.css";

const Sidebar = ({ ordersCount, cartCount, onCartClick, onOrdersClick }) => {
    return (
        <aside className="sidebar">
            <div className="logo">🍽️ Lilies</div>
            <ul className="nav-links">
                <li className="active">🏠 Dashboard</li>
                <li>👤 Your Profile</li>
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
