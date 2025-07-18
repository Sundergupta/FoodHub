import React, { useEffect, useState } from "react";
import "./style.css";
import Sidebar from "../../component/Sidebar";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    doc,
    getDoc,
    updateDoc,
    setDoc,
    collection,
    getDocs,
    deleteDoc,
    addDoc
} from "firebase/firestore";
import CartDrawer from "../CartDrawer";
import PaymentDrawer from "../PaymentDrawer";
import OrderDrawer from "../OrderDrawer";
import emailjs from "@emailjs/browser";

import food1 from "../../assets/signIn/kitchen.svg";
import food2 from "../../assets/signIn/kitchen.svg";
import food3 from "../../assets/signIn/kitchen.svg";
import food4 from "../../assets/signIn/kitchen.svg";
import food5 from "../../assets/signIn/kitchen.svg";
import food6 from "../../assets/signIn/kitchen.svg";
import profileImage from "../../assets/signIn/kitchen.svg";

// ✅ Email sending function
const sendOrderEmail = async (orderItems, userEmail) => {
    const orderDetails = orderItems
        .map(item => `${item.title} (x${item.quantity}) - ${item.price}`)
        .join("\n");

    try {
        await emailjs.send(
            "service_i0satp1",         // Your service ID
            "template_jzz407w",        // Your template ID
            {
                to_email: "drivesunder606@gmail.com", // Receiver
                user_email: userEmail,                // Sender
                message: orderDetails                 // Order content
            },
            "ze_bbmF7-LTYyeXn5"         // ✅ Public key
        );
        console.log("✅ Order email sent!");
    } catch (err) {
        console.error("❌ Failed to send order email:", err);
    }
};

// ✅ FoodDrawer Component
const FoodDrawer = ({ item, onAddToCart }) => {
    const [quantity, setQuantity] = useState(0);
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <div className="floating-panel-overlay" onClick={() => onAddToCart(null, 0)}>
            <div className="floating-panel" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={() => onAddToCart(null, 0)}>×</button>
                <img src={item.image} alt={item.title} className="detail-img" />
                <h3>{item.title}</h3>
                <p className="description">
                    Just have a single bite of this Black Forest pastry and it will all make a proper sense to you...
                </p>
                <div className="meta">
                    <span><strong>{item.price}</strong></span>
                    <span>10-20 Mins</span>
                    <span>10 Pcs Avail</span>
                </div>
                <div className="quantity-controls">
                    <button onClick={decreaseQuantity}>-</button>
                    <span style={{ color: '#003f3f' }}>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <button className="add-cart-btn" onClick={() => onAddToCart(item, quantity)}>
                    Add to cart
                </button>
            </div>
        </div>
    );
};

// ✅ Main Component
const MenuPage = () => {
    const [user, setUser] = useState(null);
    const [ordersCount, setOrdersCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showPaymentDrawer, setShowPaymentDrawer] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
    const [orderItems, setOrderItems] = useState([]);

    const menuItems = [
        { image: food1, title: "Stir Fry Pasta", description: "Delicious stir-fried pasta.", price: "₦1,000.00" },
        { image: food2, title: "Grilled Chicken", description: "Juicy grilled chicken.", price: "₦1,500.00" },
        { image: food3, title: "Veggie Delight Pizza", description: "Fresh veggies and cheese.", price: "₦2,200.00" },
        { image: food4, title: "Beef Burger", description: "Grilled beef patty.", price: "₦1,800.00" },
        { image: food5, title: "Chicken Biryani", description: "Spicy rice with chicken.", price: "₦1,600.00" },
        { image: food6, title: "Chocolate Cake", description: "Rich chocolate dessert.", price: "₦1,200.00" },
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userRef = doc(db, "users", currentUser.uid);
                const snap = await getDoc(userRef);
                if (!snap.exists()) {
                    await setDoc(userRef, { ordersCount: 0, cartCount: 0 });
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

    const handleAddToCart = async (item, quantity) => {
        if (!item) {
            setSelectedItem(null);
            return;
        }

        if (!user) {
            alert("Please log in to add items to your cart.");
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            const cartItemRef = doc(db, "users", user.uid, "cart", item.title);
            const cartItemSnap = await getDoc(cartItemRef);

            if (cartItemSnap.exists()) {
                await updateDoc(cartItemRef, {
                    quantity: cartItemSnap.data().quantity + quantity,
                });
            } else {
                await setDoc(cartItemRef, {
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    quantity: quantity,
                    description: item.description,
                });
            }

            setCartCount((prev) => prev + quantity);
            setSelectedItem(null);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleCartOpen = async () => {
        if (!user) return;
        const cartRef = collection(db, "users", user.uid, "cart");
        const snapshot = await getDocs(cartRef);
        const items = snapshot.docs.map(doc => doc.data());
        setCartItems(items);
        setIsCartOpen(true);
    };

    const handleRemoveCartItem = async (itemTitle) => {
        if (!user) return;
        try {
            const itemRef = doc(db, "users", user.uid, "cart", itemTitle);
            await deleteDoc(itemRef);

            const cartRef = collection(db, "users", user.uid, "cart");
            const snapshot = await getDocs(cartRef);
            const updatedItems = snapshot.docs.map(doc => doc.data());
            setCartItems(updatedItems);
            setCartCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0));
        } catch (err) {
            console.error("Error removing cart item:", err);
        }
    };

    const handleCheckout = async () => {
        setIsCartOpen(false);
        setShowPaymentDrawer(true);

        setTimeout(async () => {
            setShowPaymentDrawer(false);

            if (user) {
                const cartRef = collection(db, "users", user.uid, "cart");
                const snapshot = await getDocs(cartRef);

                const orderData = [];
                for (const docSnap of snapshot.docs) {
                    const orderItem = docSnap.data();
                    orderData.push(orderItem);
                    await addDoc(collection(db, "users", user.uid, "orders"), orderItem);
                    await deleteDoc(docSnap.ref);
                }

                // ✅ This is the correct place:
                await sendOrderEmail(orderData, user.email);

                setCartCount(0);
            } else {
                localStorage.removeItem("guestCartCount");
                setCartCount(0);
            }

            setCartItems([]);
        }, 5000);
    };

    const handleOrderOpen = async () => {
        if (!user) return;
        const orderRef = collection(db, "users", user.uid, "orders");
        const snapshot = await getDocs(orderRef);
        const orders = snapshot.docs.map(doc => doc.data());
        setOrderItems(orders);
        setIsOrderDrawerOpen(true);
    };

    return (
        <div className="menu-container">
            <Sidebar
                ordersCount={ordersCount}
                cartCount={cartCount}
                onCartClick={handleCartOpen}
                onOrdersClick={handleOrderOpen}
            />
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
                                onClick={() => setSelectedItem(item)}
                            />
                            <h3>{item.title}</h3>
                            <p className="description">{item.description}</p>
                            <div className="menu-footer">
                                <span className="price">{item.price}</span>
                                <button className="add-btn" onClick={() => setSelectedItem(item)}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {selectedItem && <FoodDrawer item={selectedItem} onAddToCart={handleAddToCart} />}
                {isCartOpen && (
                    <CartDrawer
                        cartItems={cartItems}
                        onClose={() => setIsCartOpen(false)}
                        onCheckout={handleCheckout}
                        onRemoveItem={handleRemoveCartItem}
                    />
                )}
                {isOrderDrawerOpen && (
                    <OrderDrawer
                        orderItems={orderItems}
                        onClose={() => setIsOrderDrawerOpen(false)}
                    />
                )}
                {showPaymentDrawer && (
                    <PaymentDrawer onClose={() => setShowPaymentDrawer(false)} />
                )}
            </main>
        </div>
    );
};

export default MenuPage;
