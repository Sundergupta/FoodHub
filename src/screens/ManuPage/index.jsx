import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "../../component/Sidebar";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

import food1 from "../../assets/signIn/kitchen.svg";
import profileImage from "../../assets/signIn/kitchen.svg";

const FoodDrawer = ({ item, onClose }) => {
    const [quantity, setQuantity] = useState(3);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="floating-panel-overlay" onClick={onClose}>
            <div className="floating-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>
                <img src={item.image} alt={item.title} className="detail-img" />
                <h3>{item.title}</h3>
                <p className="description">
                    Just have a single bite of this Black Forest pastry and it will all make a proper sense to you. The kick of cherry and rich chocolate of this super light, airy pastry will definitely make you feel "wow".
                </p>
                <div className="meta">
                    <span><strong>NGN 2000.00</strong></span>
                    <span>10-20 Mins</span>
                    <span>10 Pcs Avail</span>
                </div>
                <div className="quantity-controls">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <button className="add-cart-btn">Add to cart</button>
            </div>
        </div>
    );
};

const MenuPage = () => {
    const [user, setUser] = useState(null);
    const [ordersCount, setOrdersCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

    const menuItems = Array.from({ length: 6 }, (_, i) => ({
        image: food1,
        title: `Stir Fry Pasta ${i + 1}`,
        description: "The in-house pasta and chicken by chef Moose",
        price: "₦1,000.00",
    }));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userRef = doc(db, "users", currentUser.uid);
                const snap = await getDoc(userRef);

                if (!snap.exists()) {
                    await setDoc(userRef, {
                        ordersCount: 0,
                        cartCount: 0,
                    });
                    setOrdersCount(0);
                    setCartCount(0);
                } else {
                    const data = snap.data();
                    setOrdersCount(data.ordersCount || 0);
                    setCartCount(data.cartCount || 0);
                }
            } else {
                const guestCart = parseInt(localStorage.getItem("guestCartCount") || "0", 10);
                setCartCount(guestCart);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleAddToCart = (item) => {
        setSelectedItem(item);
    };

    const handleCloseDrawer = () => {
        setSelectedItem(null);
    };

    return (
        <div className="menu-container">
            <Sidebar ordersCount={ordersCount} cartCount={cartCount} />

            <main className="main-section">
                <header className="header">
                    <div>
                        <h2>Good morning, {user?.email || "Guest"}!</h2>
                        <p>What delicious meal are you craving today?</p>
                    </div>
                    <img src={profileImage} alt="User" className="profile-pic" />
                </header>

                <section className="menu-grid">
                    {menuItems.map((item, idx) => (
                        <div key={idx} className="menu-card">
                            <img
                                src={item.image}
                                alt="Food"
                                className="food-img"
                                onClick={() => handleAddToCart(item)}
                            />
                            <h3>{item.title}</h3>
                            <p className="description">{item.description}</p>
                            <div className="menu-footer">
                                <span className="price">{item.price}</span>
                                <button className="add-btn" onClick={() => handleAddToCart(item)}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {selectedItem && (
                    <FoodDrawer item={selectedItem} onClose={handleCloseDrawer} />
                )}
            </main>
        </div>
    );
};

export default MenuPage;
