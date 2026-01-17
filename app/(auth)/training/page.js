import { redirect } from "next/navigation";

import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";

export default async function TrainingPage() {
    const result = await verifyAuth();

    if (!result.user) {
        return redirect("/");
    }

    const trainingSessions = getTrainings();

    return (
        <main className="training-container">
            <div className="training-header">
                <h1 className="training-title">
                    Discover Your Perfect Activity
                </h1>
                <p className="training-subtitle">
                    Explore our curated collection of premium training
                    experiences tailored to elevate your fitness journey
                </p>
                <div className="user-welcome">
                    <span className="welcome-text">Welcome, user </span>
                    <span className="user-email">{result.user.email}</span>
                </div>
            </div>

            <div className="training-grid">
                {trainingSessions.map((training, index) => (
                    <div
                        key={training.id}
                        className="training-card"
                        style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="card-image-container">
                            <img
                                src={`/trainings/${training.image}`}
                                alt={training.title}
                                className="card-image"
                            />
                            <div className="card-overlay">
                                <span className="card-category">
                                    {training.category || "Fitness"}
                                </span>
                                <span className="card-duration">
                                    {training.duration || "60 min"}
                                </span>
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="card-header">
                                <h2 className="card-title">{training.title}</h2>
                                <div className="card-rating">
                                    <span className="stars">★★★★☆</span>
                                    <span className="rating-text">4.5</span>
                                </div>
                            </div>

                            <p className="card-description">
                                {training.description}
                            </p>

                            <div className="card-features">
                                <div className="feature">
                                    <span className="feature-icon">🔥</span>
                                    <span className="feature-text">
                                        {training.intensity ||
                                            "Medium Intensity"}
                                    </span>
                                </div>
                                <div className="feature">
                                    <span className="feature-icon">👥</span>
                                    <span className="feature-text">
                                        {training.groupSize || "Group Session"}
                                    </span>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button className="btn-book">
                                    Book Session
                                </button>
                                <button className="btn-learn">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="training-stats">
                <div className="stat-item">
                    <h3 className="stat-number">7+</h3>
                    <p className="stat-label">Training Types</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-number">50+</h3>
                    <p className="stat-label">Expert Trainers</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-number">1000+</h3>
                    <p className="stat-label">Happy Members</p>
                </div>
                <div className="stat-item">
                    <h3 className="stat-number">24/7</h3>
                    <p className="stat-label">Support</p>
                </div>
            </div>
        </main>
    );
}
