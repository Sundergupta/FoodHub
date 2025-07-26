// FoodDrawer.jsx
import React, { useState } from "react";
import "./style.css"; // Make sure this contains the updated drawer CSS

const FoodDrawer = ({ item, onClose }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => setQuantity((q) => q + 1);
    const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <div className="floating-panel-overlay" onClick={onClose}>
            <div
                className="floating-panel"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <img src={item.image} alt={item.title} className="detail-img" />
                <h3>{item.title}</h3>
                <p className="description">{item.description}</p>
                <div className="meta">
                    <span>NGN 2000.00</span>
                    <span>10–20 Mins</span>
                </div>
                <div className="quantity-controls">
                    <button onClick={decreaseQty}>−</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQty}>+</button>
                </div>
                <button className="add-cart-btn">Add to cart</button>
            </div>
        </div>
    );
};

export default FoodDrawer;