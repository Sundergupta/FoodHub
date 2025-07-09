import React from "react";
import "./style.css";
import kitchenImage from "../../assets/signIn/kitchen.svg"; // Adjust based on actual image

const SignInPage = () => {
    return (
        <div className="signin-container">
            <div className="signin-image-section">
                <img src={kitchenImage} alt="Cooking Together" className="signin-image" />
            </div>
            <div className="signin-form-section">
                <h2 className="signin-title">Welcome Back!</h2>
                <form className="signin-form">
                    <input type="email" placeholder="Your Email address" className="signin-input" />
                    <div className="password-wrapper">
                        <input type="password" placeholder="Your Password" className="signin-input" />
                        <span className="show-password">show</span>
                    </div>
                    <button className="signin-button">LOGIN</button>
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