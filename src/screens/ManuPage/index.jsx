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

import food1 from "../../assets/maggi.webp";
import food2 from "../../assets/cheesy-maggie.png";
import food3 from "../../assets/masala-maggi.png";
import food4 from "../../assets/weight-sauce-pasta.webp";
import food5 from "../../assets/red-sauce-pasta.webp";
import food6 from "../../assets/cheese-paneer-grill-sandwich.png";
import food7 from "../../assets/cheese-veg-grill-sandwich.png";
import food8 from "../../assets/afghani-momos.webp";
import food9 from "../../assets/tandoori-momos.jpg";
import food10 from "../../assets/momos.jpg";
import food11 from "../../assets/wai-wai-chaat.jpg";
import food12 from "../../assets/wai-wai-noodles.jpg";



import profileImage from "../../assets/profile-image.jpg";



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
const Manupage = () => {
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
        { image: food1, title: "Classic Maggi", description: "Hot and tasty Maggi noodles.", price: "₹50.00" },
        { image: food2, title: "Cheesy Maggi", description: "Maggi loaded with cheese.", price: "₹70.00" },
        { image: food3, title: "Masala Maggi", description: "Spicy and flavorful masala maggi.", price: "₹60.00" },
        { image: food4, title: "White Sauce Pasta", description: "Creamy pasta in white sauce.", price: "₹120.00" },
        { image: food5, title: "Red Sauce Pasta", description: "Tangy red sauce pasta delight.", price: "₹120.00" },
        { image: food6, title: "Cheese Paneer Grill Sandwich", description: "Grilled sandwich with cheese and paneer.", price: "₹90.00" },
        { image: food7, title: "Cheese vegetables Grill Sandwich", description: "Grilled veggie sandwich with cheese.", price: "₹80.00" },
        { image: food8, title: "Afghani Momos", description: "Creamy and spicy Afghani momos.", price: "₹110.00" },
        { image: food9, title: "Tandoori Momos", description: "Smoky tandoori-style momos.", price: "₹120.00" },
        { image: food10, title: "Steamed Momos", description: "Classic steamed momos.", price: "₹100.00" },
        { image: food11, title: "Wai Wai Chaat", description: "Crunchy spicy wai wai chaat.", price: "₹70.00" },
        { image: food12, title: "Wai Wai Noodles", description: "Tasty and spicy wai wai noodles.", price: "₹60.00" }
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

export default Manupage;
