import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Star, PlayCircle, Grid, Search, Wrench, Globe, ListFilter, Activity, LayoutGrid } from 'lucide-react';
import '../styles/index.scss';

const Index = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <h2>Luminous AI</h2>
                </div>
                <div className="navbar-links">
                    <a href="#platform">Platform</a>
                    <a href="#solutions">Solutions</a>
                    <a href="#resources">Resources</a>
                    <a href="#pricing">Pricing</a>
                </div>
                <div className="navbar-actions">
                    <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
                    <button className="btn-primary" onClick={() => navigate('/register')}>Sign Up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-badge">
                    <Star size={14} className="badge-icon" />
                    <span>PRECISION EVALUATION ENGINE</span>
                </div>
                
                <h1 className="hero-title">
                    Precision Interviewing
                    <span className="text-highlight">Powered by AI.</span>
                </h1>
                
                <p className="hero-subtitle">
                    Empowering candidates to master their pitch and helping recruiters identify elite talent through deep behavioral and technical analysis.
                </p>

                <div className="hero-actions">
                    <button className="btn-primary-large" onClick={() => navigate('/register')}>
                        Start Your Interview
                    </button>
                    <button className="btn-secondary-large">
                        <PlayCircle size={20} />
                        Watch Platform Demo
                    </button>
                </div>
            </header>

            {/* Dashboard Mockup */}
            <section className="dashboard-preview-container">
                <div className="dashboard-mockup">
                    <div className="mockup-header">
                        <div className="tab active">AI Interview Analysis</div>
                        <div className="actions">
                            <button><ListFilter size={14} /> Sort</button>
                        </div>
                    </div>
                    <div className="mockup-grid">
                        <div className="mockup-card">
                            <div className="card-top">
                                <span>Performance Score</span>
                                <Activity size={14} />
                            </div>
                            <div className="chart-placeholder pink-line-chart"></div>
                            <div className="card-bottom">
                                <div className="stat">
                                    <span className="label">Overall Score</span>
                                    <div className="bar"><div className="fill large"></div></div>
                                </div>
                            </div>
                        </div>
                        <div className="mockup-card">
                            <div className="card-top">
                                <span>Emotional Dynamics</span>
                                <LayoutGrid size={14} />
                            </div>
                            <div className="chart-placeholder bar-chart">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="bar-col" style={{height: `${Math.random() * 80 + 20}%`}}></div>
                                ))}
                            </div>
                        </div>
                        <div className="mockup-card">
                            <div className="card-top">
                                <span>Pacing & Fluency</span>
                                <Activity size={14} />
                            </div>
                            <div className="chart-placeholder bar-chart dense">
                                {[...Array(30)].map((_, i) => (
                                    <div key={i} className="bar-col" style={{height: `${Math.random() * 100}%`}}></div>
                                ))}
                            </div>
                        </div>
                        <div className="mockup-card">
                            <div className="card-top">
                                <span>Technical Accuracy</span>
                                <Grid size={14} />
                            </div>
                            <div className="chart-placeholder bar-chart dense mix">
                                {[...Array(30)].map((_, i) => (
                                    <div key={i} className="bar-col" style={{height: `${Math.random() * 100}%`}}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-heading">Redefining Insight.</h2>
                
                <div className="features-grid">
                    <div className="feature-card large">
                        <div className="icon-wrapper">
                            <Grid size={20} />
                        </div>
                        <h3>Deep Analysis</h3>
                        <p>Our neural networks dissect every nuance of an interview, from semantic meaning to micro-expressions, providing a 360-degree view of candidate potential.</p>
                        <div className="tags">
                            <span>Semantic_NLP</span>
                            <span>Expression_Sync</span>
                            <span>Behavioral_AI</span>
                        </div>
                    </div>
                    
                    <div className="feature-card">
                        <div className="icon-wrapper">
                            <Search size={20} />
                        </div>
                        <h3>Skill Gap Identification</h3>
                        <p>Precisely pinpoint technical and soft skill deficiencies before they become a bottleneck for your team.</p>
                        <div className="progress-bars">
                            <div className="p-bar"><div className="fill" style={{width: '85%'}}></div></div>
                            <div className="p-bar"><div className="fill" style={{width: '60%'}}></div></div>
                        </div>
                    </div>

                    <div className="feature-card">
                        <div className="icon-wrapper">
                            <Wrench size={20} />
                        </div>
                        <h3>Personalized Prep</h3>
                        <p>Tailored roadmaps generated for every candidate, ensuring they can grow and meet the specific needs of your role.</p>
                    </div>

                    <div className="feature-card flex-row">
                        <div className="content-left">
                            <h3>Scalable Interviewing</h3>
                            <p>Deploy automated screening globally. Luminous AI supports 50+ languages with culturally aware evaluation models.</p>
                        </div>
                        <div className="content-right">
                            <div className="globe-icon">
                                <Globe size={40} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="testimonial-section">
                <div className="testimonial-content">
                    <div className="image-container">
                        <div className="avatar-placeholder"></div>
                    </div>
                    <div className="quote-container">
                        <span className="tag">SUCCESS STORIES</span>
                        <blockquote>
                            "Luminous AI didn't just help us hire faster; it helped us hire <span className="highlight-text">smarter.</span> The depth of the match score is unprecedented."
                        </blockquote>
                        <div className="author">
                            <strong>Sarah Jenkins</strong>
                            <span>VP OF TALENT, TECHSTREAM</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-brand">
                    <h2>Luminous AI</h2>
                    <p>© 2024 LUMINOUS AI, INC. | ALL RIGHTS RESERVED. PRECISION EVAL ENGINE™</p>
                </div>
                <div className="footer-links">
                    <a href="#privacy">PRIVACY POLICY</a>
                    <a href="#terms">TERMS OF SERVICE</a>
                    <a href="#cookie">COOKIE SETTINGS</a>
                    <a href="#support" className="support">CONTACT SUPPORT</a>
                </div>
            </footer>
        </div>
    );
};

export default Index;
