// src/components/CartDrawer.jsx
import React from "react";
import "./style.css";

const CartDrawer = ({ cartItems, onClose, onCheckout, onRemoveItem }) => {
    const total = cartItems.reduce(
        (sum, item) => sum + (item.quantity * parseInt(item.price.replace(/[₦,]/g, ''))),
        0
    );

    return (
        <div className="cart-drawer-overlay" onClick={onClose}>
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Sub-total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="item-info">
                                        <img src={item.image} alt={item.title} className="cart-img" />
                                        <div>
                                            <strong>{item.title}</strong>
                                            <p>{item.description || "Summary"}</p>
                                        </div>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>₦{(item.quantity * parseInt(item.price.replace(/[₦,]/g, ''))).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="remove-btn"
                                            onClick={() => onRemoveItem(item.title)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="cart-footer">
                    <h3>Total: ₦{total.toLocaleString()}</h3>
                    {cartItems.length > 0 && (
                        <button className="checkout-btn" onClick={onCheckout}>
                            Proceed to Payment
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
