import React from 'react';
import './style.css';
import foodBanner from '../../assets/home/foodBanner.svg';
import foodBanner1 from '../../assets/home/foodBanner1.svg';

const NavBar = () => {
    return (
        <div className="landing-page">
            {/* Navbar */}
            <header className="navbar">
                <div className="logo">Lilies</div>
                <nav className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Login</a>
                    <button className="signup-btn">Sign up</button>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>
                        Order <span>food</span> anytime, anywhere
                    </h1>
                    <p>
                        Browse from our list of specials to place your order and have food delivered to you in no time. Affordable, tasty and fast!
                    </p>
                    <div className="app-buttons">
                        <img src="/googleplay.svg" alt="Google Play" />
                        <img src="/appstore.svg" alt="App Store" />
                    </div>
                </div>
                <div className="hero-image">
                    <img src={foodBanner} alt="Food Banner" />
                </div>
            </section>

            {/* Specials Section */}
            <section className="specials-section">
                <h2>Special Meals of the day!</h2>
                <p>
                    Check our specials of the day and get discounts on all our meals and swift delivery to what ever location within Ilorin.
                </p>
                <div className="specials">
                    {[
                        <img src={foodBanner} alt="Food Banner" />,
                        <img src={foodBanner1} alt="Food Banner" />,
                        <img src={foodBanner1} alt="Food Banner" />,
                    ].map((meal, index) => (
                        <div key={index} className="meal">
                            <img src={meal.img} alt={meal.name} />
                            <h3>{meal.name}</h3>
                            <p>Stir fry pasta yada yada yada because of Season</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section">
                <h2>Get notified when we update!</h2>
                <p>
                    Get notified when we add new items to our specials menu, update our price list or have promos!
                </p>
                <form className="newsletter-form">
                    <input
                        type="email"
                        placeholder="example@email.com"
                    />
                    <button type="submit">Get notified</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div>
                    <h4>Company</h4>
                    <ul>
                        <li>About</li>
                        <li>Careers</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div>
                    <h4>Support</h4>
                    <ul>
                        <li>Help Center</li>
                        <li>Safety Center</li>
                    </ul>
                </div>
                <div>
                    <h4>Legal</h4>
                    <ul>
                        <li>Cookie Policy</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                        <li>Dispute resolution</li>
                    </ul>
                </div>
                <div>
                    <h4>Install App</h4>
                    <img src="/googleplay.svg" alt="Google Play" />
                    <img src="/appstore.svg" alt="App Store" />
                </div>
            </footer>
        </div>
    );
};

export default NavBar;
