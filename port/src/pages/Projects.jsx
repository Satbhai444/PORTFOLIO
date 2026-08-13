import React from 'react';
import { Share2, Star, Shield, Smartphone, Monitor, Info, ArrowRight, ExternalLink } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Projects.css';

const Projects = () => {
    return (
        <div className="ps-wrapper">
            <div className="ps-container">
                
                {/* ═══════ HEADER ═══════ */}
                <header className="ps-header">
                    <div className="ps-app-icon">
                        <img src="/playstore_icon.jpg" alt="WinDeck App Icon" />
                    </div>
                    <div className="ps-app-details">
                        <h1 className="ps-title">WinDeck - PC Control Suite</h1>
                        <p className="ps-developer">Darshan Satbhai</p>
                        <p className="ps-category">Contains ads · Productivity</p>
                    </div>
                </header>

                {/* ═══════ STATS ROW ═══════ */}
                <ScrollReveal delay={0.1}>
                <div className="ps-stats-row">
                    <div className="ps-stat">
                        <div className="ps-stat-value">Free</div>
                        <div className="ps-stat-label">Price</div>
                    </div>
                    <div className="ps-stat">
                        <div className="ps-stat-value">Utility</div>
                        <div className="ps-stat-label">Category</div>
                    </div>
                    <div className="ps-stat">
                        <div className="ps-stat-value">
                            <span style={{ border: '1px solid #9aa0a6', padding: '0 4px', borderRadius: '4px', fontSize: '0.8rem' }}>E</span>
                        </div>
                        <div className="ps-stat-label">Everyone</div>
                    </div>
                </div>
                </ScrollReveal>

                {/* ═══════ ACTION BAR ═══════ */}
                <ScrollReveal delay={0.2}>
                <div className="ps-action-bar">
                    <a href="https://website-fawn-nine-99.vercel.app/" target="_blank" rel="noopener noreferrer" className="ps-btn-install interactive">
                        Install
                    </a>
                    <button className="ps-btn-icon interactive" aria-label="Share">
                        <Share2 size={20} />
                    </button>
                </div>
                </ScrollReveal>

                {/* ═══════ SCREENSHOTS GALLERY ═══════ */}
                <ScrollReveal delay={0.3}>
                <div className="ps-gallery">
                    <img src="/windeck/1_connect_pc.png" alt="Connect PC" className="ps-gallery-img" />
                    <img src="/windeck/2_launch_apps.png" alt="Launch Apps" className="ps-gallery-img" />
                    <img src="/windeck/3_system_control.png" alt="System Control" className="ps-gallery-img" />
                    <img src="/windeck/4_website_access.png" alt="Website Access" className="ps-gallery-img" />
                    <img src="/windeck/5_app_specific_controls.png" alt="App specific controls" className="ps-gallery-img" />
                </div>
                </ScrollReveal>

                {/* ═══════ ABOUT THIS APP ═══════ */}
                <ScrollReveal delay={0.1}>
                <section className="ps-section">
                    <div className="ps-section-header">
                        <h2 className="ps-section-title">About this app</h2>
                        <ArrowRight size={20} className="ps-section-arrow" />
                    </div>
                    <div className="ps-body-text">
                        <strong>Turn your smartphone into a wireless PC control panel.</strong>
                        <br /><br />
                        WinDeck is a full-stack, open-ecosystem wireless control suite that turns any Android smartphone into an ultra-low-latency, encrypted, custom touch-screen control panel for Windows PCs over local Wi-Fi. 
                        <br /><br />
                        Instead of spending ₹15,000+ on hardware macro pads, use WinDeck to launch apps, control media, execute complex PowerShell macros, monitor system telemetry, and stream your phone camera seamlessly.
                    </div>
                </section>
                </ScrollReveal>

                {/* ═══════ DATA SAFETY / FEATURES ═══════ */}
                <ScrollReveal delay={0.2}>
                <section className="ps-section">
                    <div className="ps-section-header">
                        <h2 className="ps-section-title">App Features</h2>
                        <ArrowRight size={20} className="ps-section-arrow" />
                    </div>
                    <div className="ps-card">
                        <h3 className="ps-card-title">Key Capabilities</h3>
                        <p className="ps-card-desc">Here are the features that make WinDeck the ultimate wireless control suite for Windows.</p>
                        
                        <div className="ps-feature-item">
                            <Monitor className="ps-feature-icon" size={24} />
                            <div className="ps-feature-content">
                                <h4>Dynamic Context Auto-Switching</h4>
                                <p>Automatically detects the active foreground app on Windows and updates the layout with app-specific tiles.</p>
                            </div>
                        </div>

                        <div className="ps-feature-item">
                            <Smartphone className="ps-feature-icon" size={24} />
                            <div className="ps-feature-content">
                                <h4>Zero-Latency Gyro Air Mouse</h4>
                                <p>Uses native Win32 APIs to turn the phone's gyroscope into a high-precision wireless mouse with &lt;5ms latency.</p>
                            </div>
                        </div>

                        <div className="ps-feature-item">
                            <Shield className="ps-feature-icon" size={24} />
                            <div className="ps-feature-content">
                                <h4>AES-256 Encrypted Security</h4>
                                <p>End-to-end encrypted local Socket.IO communication with built-in Anti-Brute-Force security.</p>
                            </div>
                        </div>
                    </div>
                </section>
                </ScrollReveal>

                {/* ═══════ DEVELOPER INFO ═══════ */}
                <ScrollReveal delay={0.2}>
                <section className="ps-section">
                    <div className="ps-section-header">
                        <h2 className="ps-section-title">Developer Info</h2>
                        <ArrowRight size={20} className="ps-section-arrow" />
                    </div>
                    <div className="ps-feature-item">
                        <Info className="ps-feature-icon" size={24} />
                        <div className="ps-feature-content">
                            <h4>Tech Stack</h4>
                            <p><strong>Mobile:</strong> Flutter 3.x, Dart, Provider, Socket.IO<br/>
                               <strong>PC Server:</strong> Electron.js, Node.js, TailwindCSS, PowerShell IPC, C# Native</p>
                        </div>
                    </div>
                </section>
                </ScrollReveal>

                {/* ═══════ AI METRICS ═══════ */}
                <ScrollReveal delay={0.3}>
                <section className="ps-section">
                    <div className="ps-section-header">
                        <h2 className="ps-section-title" style={{ color: '#27c93f' }}>AI Architecture Metrics</h2>
                        <ArrowRight size={20} className="ps-section-arrow" />
                    </div>
                    <div className="ps-card" style={{ borderLeft: '4px solid #27c93f' }}>
                        <h3 className="ps-card-title">Prompt Engineering Data</h3>
                        <p className="ps-card-desc">Built 10x faster leveraging advanced LLM orchestration.</p>
                        
                        <div className="ps-stats-row" style={{ marginTop: '1rem', borderTop: 'none', padding: 0 }}>
                            <div className="ps-stat">
                                <div className="ps-stat-value" style={{ color: '#fff' }}>14</div>
                                <div className="ps-stat-label">Master Prompts</div>
                            </div>
                            <div className="ps-stat">
                                <div className="ps-stat-value" style={{ color: '#fff' }}>12.5K</div>
                                <div className="ps-stat-label">Lines Generated</div>
                            </div>
                            <div className="ps-stat">
                                <div className="ps-stat-value" style={{ color: '#fff' }}>3 Days</div>
                                <div className="ps-stat-label">Dev Time</div>
                            </div>
                        </div>
                    </div>
                </section>
                </ScrollReveal>
                
                {/* ═══════ UPCOMING PROJECTS ═══════ */}
                <ScrollReveal delay={0.4}>
                <section className="ps-section" style={{ marginTop: '4rem' }}>
                    <div className="ps-section-header">
                        <h2 className="ps-section-title">Upcoming Projects</h2>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                        {/* Dummy Project 1 */}
                        <div className="ps-card interactive" style={{ borderTop: '4px solid #ffbd2e', background: 'rgba(255, 255, 255, 0.03)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 className="ps-card-title" style={{ fontSize: '1.3rem' }}>AI Chatbot Assistant</h3>
                                <span style={{ fontSize: '0.7rem', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: '#ffbd2e' }}>Coming Soon</span>
                            </div>
                            <p className="ps-card-desc" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>An advanced LLM-powered virtual assistant with context-aware memory and RAG capabilities.</p>
                            <div className="ps-feature-content">
                                <p><strong>Stack:</strong> React, Node.js, OpenAI API</p>
                            </div>
                        </div>

                        {/* Dummy Project 2 */}
                        <div className="ps-card interactive" style={{ borderTop: '4px solid #ff5f56', background: 'rgba(255, 255, 255, 0.03)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 className="ps-card-title" style={{ fontSize: '1.3rem' }}>E-Commerce Suite</h3>
                                <span style={{ fontSize: '0.7rem', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', color: '#ff5f56' }}>In Progress</span>
                            </div>
                            <p className="ps-card-desc" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>A full-stack Flutter application with Firebase backend, real-time cart, and payment gateway integration.</p>
                            <div className="ps-feature-content">
                                <p><strong>Stack:</strong> Flutter, Firebase, Stripe</p>
                            </div>
                        </div>
                    </div>
                </section>
                </ScrollReveal>

            </div>
        </div>
    );
};

export default Projects;
