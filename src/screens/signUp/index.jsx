// src/screens/signUp/index.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./style.css";
import kitchenImage from "../../assets/signIn/kitchen.svg";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);

            // ✅ Save email in Firestore
            await setDoc(doc(db, "users", userCred.user.uid), {
                email: email,
                createdAt: new Date()
            });

            setSuccess("Account created successfully!");
            setError("");
            setTimeout(() => {
                navigate("/"); // Redirect to menu page
            }, 1500);
        } catch (err) {
            setError(err.message);
            setSuccess("");
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-image-section">
                <img src={kitchenImage} alt="Cooking Together" className="signin-image" />
            </div>
            <div className="signin-form-section">
                <h2 className="signin-title">Create Your Account</h2>
                <form className="signin-form" onSubmit={handleSignUp}>
                    <input
                        type="email"
                        placeholder="Your Email address"
                        className="signin-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Your Password"
                            className="signin-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="show-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "hide" : "show"}
                        </span>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <button className="signin-button" type="submit">
                        SIGN UP
                    </button>
                </form>
                <div className="signin-footer">
                    <a href="/signIn">Already have an account? Login</a>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
