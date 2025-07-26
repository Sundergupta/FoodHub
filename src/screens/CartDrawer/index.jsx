import React from "react";
import "./style.css";

const CartDrawer = ({ cartItems, onClose, onCheckout, onRemoveItem, onUpdateQuantity }) => {
    const parsePrice = (price) => {
        if (typeof price === "number") return price;
        return parseInt(price.replace(/[₦,]/g, ""), 10) || 0;
    };

    const total = cartItems.reduce((sum, item) => {
        const unitPrice = parsePrice(item.price);
        return sum + unitPrice * item.quantity;
    }, 0);

    const handleIncrease = (title) => {
        const item = cartItems.find(i => i.title === title);
        if (item) {
            onUpdateQuantity(title, item.quantity + 1);
        }
    };

    const handleDecrease = (title) => {
        const item = cartItems.find(i => i.title === title);
        if (item) {
            if (item.quantity <= 1) {
                onRemoveItem(title);
            } else {
                onUpdateQuantity(title, item.quantity - 1);
            }
        }
    };

    return (
        <div className="cart-drawer-overlay" onClick={onClose}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="empty-cart">🛒 Your cart is currently empty.</p>
                ) : (
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Sub-total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => {
                                const unitPrice = parsePrice(item.price);
                                const subTotal = unitPrice * item.quantity;

                                return (
                                    <tr key={index}>
                                        <td className="item-info">
                                            <img src={item.image} alt={item.title} className="cart-img" />
                                            <div>
                                                <strong>{item.title}</strong>
                                                <p>{item.description}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="qty-controls">
                                                <button onClick={() => handleDecrease(item.title)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleIncrease(item.title)}>+</button>
                                            </div>
                                        </td>
                                        <td>₦{unitPrice.toLocaleString()}</td>
                                        <td>₦{subTotal.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <h3>Total: ₦{total.toLocaleString()}</h3>
                        <button className="checkout-btn" onClick={onCheckout}>
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;
