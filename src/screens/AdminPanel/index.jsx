import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
    collection,
    getDocs,
    doc,
    getDoc,
} from 'firebase/firestore';
import './style.css'; // Optional: for styling

const AdminPanel = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
            const allOrders = [];

            for (const userDoc of usersSnapshot.docs) {
                const userId = userDoc.id;
                const userData = userDoc.data();
                const userEmail = userData.email || "No email in user doc";

                const ordersRef = collection(db, 'users', userId, 'orders');
                const ordersSnapshot = await getDocs(ordersRef);

                ordersSnapshot.forEach((orderDoc) => {
                    const order = orderDoc.data();
                    allOrders.push({
                        userEmail,
                        userId,
                        ...order,
                    });
                });
            }

            setOrders(allOrders);
        };

        fetchAllOrders();
    }, []);

    return (
        <div className="admin-panel">
            <h2>📦 All Orders (Admin View)</h2>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="5">Loading or no orders found...</td>
                        </tr>
                    ) : (
                        orders.map((order, idx) => (
                            <tr key={idx}>
                                <td>{order.userEmail}</td>
                                <td>{order.title}</td>
                                <td>{order.quantity}</td>
                                <td>{order.price}</td>
                                <td>{order.userId}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
