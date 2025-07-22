import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import "./style.css";
import profileImage from "../../assets/profile-image.jpg";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const orderRef = collection(db, "users", currentUser.uid, "orders");
                const snapshot = await getDocs(orderRef);
                const orderData = snapshot.docs.map((doc) => doc.data());
                setOrders(orderData);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src={profileImage} alt="Profile" className="profile-picture" />
                <h2>{user?.email || "Guest"}</h2>

                <h3>Your Orders</h3>
                <div className="orders-list">
                    {orders.length === 0 ? (
                        <p>No orders yet.</p>
                    ) : (
                        orders.map((order, index) => (
                            <div key={index} className="order-item">
                                <img src={order.image} alt={order.title} className="order-image" />
                                <div className="order-details">
                                    <h4>{order.title}</h4>
                                    <p>Qty: {order.quantity}</p>
                                    <p>Price: {order.price}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
