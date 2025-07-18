// src/pages/PaymentDrawer.jsx
import React, { useEffect, useState } from "react";
import "./style.css";
import { auth, db } from "../../firebase";
import {
    collection,
    getDocs,
    deleteDoc,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    setDoc,
} from "firebase/firestore";

import qrImage from "../../assets/QR-code/QR-code.jpeg";

const PaymentDrawer = ({ onClose }) => {
    const [seconds, setSeconds] = useState(5); // Auto-close after 5 sec

    useEffect(() => {
        const countdown = setInterval(() => {
            setSeconds((s) => s - 1);
        }, 1000);

        if (seconds <= 0) {
            clearInterval(countdown);
            moveCartToOrdersAndClose();
        }

        return () => clearInterval(countdown);
    }, [seconds]);

    const moveCartToOrdersAndClose = async () => {
        const user = auth.currentUser;

        if (user) {
            try {
                const cartRef = collection(db, "users", user.uid, "cart");
                const ordersRef = collection(db, "users", user.uid, "orders");
                const cartSnapshot = await getDocs(cartRef);

                let totalOrders = 0;
                const userDocRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDocRef);
                if (userSnap.exists()) {
                    totalOrders = userSnap.data().ordersCount || 0;
                }

                for (const docSnap of cartSnapshot.docs) {
                    const item = docSnap.data();

                    // Add item to "orders"
                    await addDoc(ordersRef, {
                        ...item,
                        orderedAt: new Date().toISOString(),
                    });

                    // Remove item from cart
                    await deleteDoc(docSnap.ref);
                }

                // Update order count
                await updateDoc(userDocRef, {
                    ordersCount: totalOrders + cartSnapshot.docs.length,
                    cartCount: 0,
                });
            } catch (err) {
                console.error("Error processing order:", err);
            }
        } else {
            localStorage.removeItem("guestCartCount");
        }

        onClose(); // Close drawer
    };

    return (
        <div className="payment-drawer-overlay" onClick={onClose}>
            <div className="payment-drawer" onClick={(e) => e.stopPropagation()}>
                <h2>Scan to Pay</h2>
                <img src={qrImage} alt="QR Code" className="qr-image" />
                <p className="timer">Auto closing in {seconds} sec</p>
            </div>
        </div>
    );
};

export default PaymentDrawer;
