import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./style.css";
import kitchenImage from "../../assets/signIn/kitchen.svg";
import { useNavigate } from "react-router-dom"; // ✅ import navigation

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // ✅ initialize

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError("");
            localStorage.setItem("user", JSON.stringify(email)); // ✅ save login
            alert("Login successful!");
            navigate("/menu"); // ✅ redirect after login
        } catch (err) {
            setError("Invalid email or password.");
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
                    <span
                        className="signin-link"
                        onClick={() => navigate("/signUp")}
                        style={{ cursor: "pointer", color: "#007bff" }}
                    >
                        Create an account
                    </span>
                    <span
                        className="signin-link"
                        style={{ cursor: "not-allowed", opacity: 0.6 }}
                    >
                        Forgot Password
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
