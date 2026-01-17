import "../globals.css";
import { logout } from "@/actions/auth-actions";
import { verifyAuth } from "@/lib/auth";

export const metadata = {
    title: "Elevate Fitness | Premium Training Platform",
    description: "Next-generation fitness and wellness platform",
};

export default async function AuthRootLayout({ children }) {
    const result = await verifyAuth();

    return (
        <div className="auth-layout">
            <header className="auth-header">
                <div className="header-container">
                    <div className="header-logo">
                        <div className="logo-icon">EF</div>
                        <div className="logo-text">
                            <h1 className="logo-title">Elevate Fitness</h1>
                            <p className="logo-subtitle">
                                Premium Training Platform
                            </p>
                        </div>
                    </div>

                    <div className="header-user">
                        {result.user && result.user.email && (
                            <div className="user-info">
                                <div className="user-avatar">
                                    {result.user.email.charAt(0).toUpperCase()}
                                </div>
                                <div className="user-details">
                                    <p className="user-greeting">
                                        Welcome back
                                    </p>
                                    <p className="user-email">
                                        {result.user.email}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="header-actions">
                            <form action={logout} className="logout-form">
                                <button className="logout-btn">
                                    <span className="logout-icon">↪</span>
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <nav className="header-nav">
                    <a href="/training" className="nav-link active">
                        <span className="nav-icon">🏋️</span>
                        Training
                    </a>
                    <a href="/profile" className="nav-link">
                        <span className="nav-icon">👤</span>
                        Profile
                    </a>
                    <a href="/schedule" className="nav-link">
                        <span className="nav-icon">📅</span>
                        Schedule
                    </a>
                    <a href="/progress" className="nav-link">
                        <span className="nav-icon">📊</span>
                        Progress
                    </a>
                </nav>
            </header>

            <div className="auth-content">{children}</div>

            <footer className="auth-footer">
                <div className="footer-content">
                    <p className="footer-text">
                        © {new Date().getFullYear()} Elevate Fitness. All rights
                        reserved.
                    </p>
                    <div className="footer-links">
                        <a href="/privacy" className="footer-link">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="footer-link">
                            Terms of Service
                        </a>
                        <a href="/contact" className="footer-link">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
