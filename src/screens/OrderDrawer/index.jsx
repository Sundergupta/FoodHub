// src/components/OrderDrawer.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./style.css";

const OrderDrawer = ({ onClose }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const user = auth.currentUser;
            if (!user) return;
            try {
                const orderRef = collection(db, "users", user.uid, "orders");
                const snapshot = await getDocs(orderRef);
                const items = snapshot.docs.map((doc) => doc.data());
                setOrders(items);
            } catch (err) {
                console.error("Failed to load orders:", err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="order-drawer-overlay" onClick={onClose}>
            <div className="order-drawer" onClick={(e) => e.stopPropagation()}>
                <h2>Your Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders yet.</p>
                ) : (
                    <ul className="order-list">
                        {orders.map((order, index) => (
                            <li key={index} className="order-item">
                                <img src={order.image} alt={order.title} className="order-img" />
                                <div>
                                    <strong>{order.title}</strong>
                                    <p>Qty: {order.quantity}</p>
                                    <p>Price: {order.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default OrderDrawer;
