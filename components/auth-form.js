"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useState } from "react";
import { auth } from "@/actions/auth-actions";

export default function AuthForm({ mode }) {
    const [formState, formAction] = useFormState(auth.bind(null, mode), {});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        try {
            await formAction(formData);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <div className="form-header">
                <div className="form-logo">
                    <div className="logo-icon-large">EF</div>
                    <h2 className="form-title">
                        {mode === "login"
                            ? "Welcome Back"
                            : "Join Our Community"}
                    </h2>
                    <p className="form-subtitle">
                        {mode === "login"
                            ? "Sign in to access your personalized training dashboard"
                            : "Create an account to start your fitness journey"}
                    </p>
                </div>
            </div>

            <form id="auth-form" action={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        <span className="label-icon">✉️</span>
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-input"
                        placeholder="you@example.com"
                        required
                    />
                    {formState.errors?.email && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {formState.errors.email}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <div className="password-header">
                        <label htmlFor="password" className="form-label">
                            <span className="label-icon">🔒</span>
                            Password
                        </label>
                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️‍🗨️ Hide" : "👁️ Show"}
                        </button>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="form-input"
                        placeholder="••••••••"
                        required
                    />
                    {formState.errors?.password && (
                        <div className="error-message">
                            <span className="error-icon">⚠️</span>
                            {formState.errors.password}
                        </div>
                    )}
                    {mode === "signup" && (
                        <div className="password-hint">
                            <span className="hint-icon">💡</span>
                            Must be at least 8 characters long
                        </div>
                    )}
                </div>

                {formState.errors?.general && (
                    <div className="general-error">
                        <span className="error-icon-large">⚠️</span>
                        {formState.errors.general}
                    </div>
                )}

                <div className="form-group">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Processing...
                            </>
                        ) : mode === "login" ? (
                            "Sign In"
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </div>

                <div className="form-divider">
                    <span className="divider-text">or continue with</span>
                </div>

                <div className="social-auth">
                    <button type="button" className="social-btn google">
                        <span className="social-icon">G</span>
                        Google
                    </button>
                    <button type="button" className="social-btn apple">
                        <span className="social-icon"></span>
                        Apple
                    </button>
                </div>
            </form>

            <div className="form-footer">
                <p className="switch-mode">
                    {mode === "login" ? (
                        <>
                            Don't have an account?{" "}
                            <Link href="/?mode=signup" className="switch-link">
                                Sign up now
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link href="/?mode=login" className="switch-link">
                                Sign in
                            </Link>
                        </>
                    )}
                </p>

                <div className="legal-links">
                    <Link href="/privacy" className="legal-link">
                        Privacy Policy
                    </Link>
                    <span className="separator">•</span>
                    <Link href="/terms" className="legal-link">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </div>
    );
}
