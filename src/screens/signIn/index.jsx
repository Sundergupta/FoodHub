import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // make sure this path is correct
import "./style.css";
import kitchenImage from "../../assets/signIn/kitchen.svg";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError("");
            alert("Login successful!");
            // Optionally redirect to dashboard here
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-image-section">
                <img src={kitchenImage} alt="Cooking Together" className="signin-image" />
            </div>
            <div className="signin-form-section">
                <h2 className="signin-title">Welcome Back!</h2>
                <form className="signin-form" onSubmit={handleLogin}>
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
                    <button className="signin-button" type="submit">
                        LOGIN
                    </button>
                </form>
                <div className="signin-footer">
                    <a href="#">Create an account</a>
                    <a href="#">Forgot Password</a>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
