import React, { useState } from 'react'; 
import { Share2, Shield, Smartphone, Monitor, Info, ArrowRight, ExternalLink, Lock, Clock, Zap, Code, Terminal, Sparkles, FileText } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Projects.css';

const PROJECTS_DATA = {
    windeck: {
        id: 'windeck',
        title: 'WinDeck - PC Control Suite',
        developer: 'Darshan Satbhai',
        category: 'Productivity',
        price: 'Free',
        platform: 'Utility',
        age: 'E',
        iconUrl: '/playstore_icon.jpg',
        actionBtn: { text: 'Install', link: 'https://website-fawn-nine-99.vercel.app/' },
        githubLink: null,
        gallery: [
            '/windeck/1_connect_pc.png',
            '/windeck/2_launch_apps.png',
            '/windeck/3_system_control.png',
            '/windeck/4_website_access.png',
            '/windeck/5_app_specific_controls.png'
        ],
        aboutDesc: (
            <>
                <strong>Turn your smartphone into a wireless PC control panel.</strong><br /><br />
                WinDeck is a full-stack, open-ecosystem wireless control suite that turns any Android smartphone into an ultra-low-latency, encrypted, custom touch-screen control panel for Windows PCs over local Wi-Fi.<br /><br />
                Instead of spending ₹15,000+ on hardware macro pads, use WinDeck to launch apps, control media, execute complex PowerShell macros, monitor system telemetry, and stream your phone camera seamlessly.
            </>
        ),
        featuresTitle: 'App Features',
        featuresDesc: 'Here are the features that make WinDeck the ultimate wireless control suite for Windows.',
        features: [
            {
                icon: <Monitor size={24} />,
                title: 'Dynamic Context Auto-Switching',
                desc: 'Automatically detects the active foreground app on Windows and updates the layout with app-specific tiles.'
            },
            {
                icon: <Smartphone size={24} />,
                title: 'Zero-Latency Gyro Air Mouse',
                desc: 'Uses native Win32 APIs to turn the phone\'s gyroscope into a high-precision wireless mouse with <5ms latency.'
            },
            {
                icon: <Shield size={24} />,
                title: 'AES-256 Encrypted Security',
                desc: 'End-to-end encrypted local Socket.IO communication with built-in Anti-Brute-Force security.'
            }
        ],
        devStack: 'Mobile: Flutter 3.x, Dart, Provider, Socket.IO\nPC Server: Electron.js, Node.js, TailwindCSS, PowerShell IPC, C# Native'
    },
    spiddy: {
        id: 'spiddy',
        title: 'SpiddyWeb',
        developer: 'Darshan Satbhai',
        category: 'Secure & Anonymous File Sharing',
        price: 'Free',
        platform: 'Web App',
        age: 'E',
        iconUrl: '/spiddy/icon.jpg',
        actionBtn: { text: 'Open App', link: 'https://spiddy-web.vercel.app' },
        githubLink: 'https://github.com/Satbhai444/Spiddy-Web',
        gallery: [
            '/spiddy/1.png',
            '/spiddy/2.png',
            '/spiddy/3.png',
            '/spiddy/4.png',
            '/spiddy/5.png'
        ],
        aboutDesc: (
            <>
                <strong>Fast, anonymous, and secure temporary file-sharing.</strong><br /><br />
                SpiddyWeb allows users to easily drop files (up to 2GB) and share them anywhere using a unique, secret 6-digit PIN without any registration or tracking.
            </>
        ),
        featuresTitle: 'Key Features',
        featuresDesc: 'With great power comes great file sharing.',
        features: [
            {
                icon: <Lock size={24} />,
                title: '100% Anonymous & Secure',
                desc: 'No sign-ups or login required. Files are protected by a secret 6-digit PIN.'
            },
            {
                icon: <Clock size={24} />,
                title: 'Auto Self-Destruct',
                desc: 'Privacy-first approach where files automatically expire and delete after 24 hours.'
            },
            {
                icon: <Zap size={24} />,
                title: 'Lightning Fast & Serverless',
                desc: 'Built on Django and deployed on Vercel\'s edge network for zero-downtime, rapid uploads, and downloads.'
            }
        ],
        devStack: 'Frontend: HTML5, CSS3, Vanilla JavaScript\nBackend: Python, Django, Vercel Serverless Functions\nAssets/CDN: GitHub Raw CDN'
    },
    codedoctor: {
        id: 'codedoctor',
        title: 'CodeDoctor',
        developer: 'Darshan Satbhai',
        category: 'Developer Tools',
        price: 'Free',
        platform: 'VS Code Extension',
        age: 'Dev',
        iconUrl: '/codedoctor/icon.jpg',
        actionBtn: { text: 'Marketplace', link: 'https://marketplace.visualstudio.com/items?itemName=satbhai444.codedoctor' },
        githubLink: 'https://github.com/satbhai444/codedoctor',
        gallery: [],
        aboutDesc: (
            <>
                <strong>AI-powered error explainer and fixer right in your VS Code.</strong><br /><br />
                CodeDoctor is a smart VS Code extension that lives in your sidebar, monitors your active files, and uses AI to explain confusing errors and generate one-click fixes instantly.
            </>
        ),
        featuresTitle: 'Extension Features',
        featuresDesc: 'Boost your coding speed with AI-assisted debugging.',
        features: [
            {
                icon: <Code size={24} />,
                title: 'Active File Error Tracking',
                desc: 'Automatically lists all errors in your currently active file.'
            },
            {
                icon: <Sparkles size={24} />,
                title: 'AI Explain & Fix',
                desc: 'Get human-readable explanations of complex errors and instantly apply fixes.'
            }
        ],
        devStack: 'TypeScript, VS Code Extension API, Node.js\nLLM Integration'
    },
    lazyreadme: {
        id: 'lazyreadme',
        title: 'LazyReadme',
        developer: 'Darshan Satbhai',
        category: 'Productivity',
        price: 'Free',
        platform: 'VS Code Extension',
        age: 'Dev',
        iconUrl: '/lazyreadme/icon.jpg',
        actionBtn: { text: 'Marketplace', link: 'https://marketplace.visualstudio.com/items?itemName=satbhai444.lazyreadme' },
        githubLink: 'https://github.com/satbhai444/lazyreadme',
        gallery: [],
        aboutDesc: (
            <>
                <strong>Never write a README from scratch again.</strong><br /><br />
                LazyReadme uses Google's Gemini AI to scan your project folders directly from the VS Code Explorer and generate high-quality, comprehensive README.md files with a single right-click.
            </>
        ),
        featuresTitle: 'Extension Features',
        featuresDesc: 'Focus on coding, let AI write the documentation.',
        features: [
            {
                icon: <Terminal size={24} />,
                title: 'Explorer Context Menu',
                desc: 'Right-click any folder to instantly generate a README.'
            },
            {
                icon: <FileText size={24} />,
                title: 'Gemini AI Powered',
                desc: 'Deeply analyzes your project structure using the latest Google Gen AI models.'
            }
        ],
        devStack: 'TypeScript, VS Code Extension API, @google/genai'
    }
};

const Projects = () => {
    const [activeId, setActiveId] = useState('windeck');
    
    const handleSwitch = (id) => {
        setActiveId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const project = PROJECTS_DATA[activeId];
    const otherProjects = Object.values(PROJECTS_DATA).filter(p => p.id !== activeId);

    return (
        <div className="ps-wrapper">
            <div className="ps-container">
                
                {/* ═══════ HEADER ═══════ */}
                <header className="ps-header">
                    <div className="ps-app-icon">
                        <img src={project.iconUrl} alt={`${project.title} Icon`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                    <div className="ps-app-details">
                        <h1 className="ps-title">{project.title}</h1>
                        <p className="ps-developer">{project.developer}</p>
                        <p className="ps-category">{project.category}</p>
                    </div>
                </header>

                {/* ═══════ STATS ROW ═══════ */}
                <ScrollReveal delay={0.1}>
                <div className="ps-stats-row">
                    <div className="ps-stat">
                        <div className="ps-stat-value">{project.price}</div>
                        <div className="ps-stat-label">Price</div>
                    </div>
                    <div className="ps-stat">
                        <div className="ps-stat-value">{project.platform}</div>
                        <div className="ps-stat-label">Category</div>
                    </div>
                    <div className="ps-stat">
                        <div className="ps-stat-value">
                            <span style={{ border: '1px solid #9aa0a6', padding: '0 4px', borderRadius: '4px', fontSize: '0.8rem' }}>{project.age}</span>
                        </div>
                        <div className="ps-stat-label">Everyone</div>
                    </div>
                </div>
                </ScrollReveal>

                {/* ═══════ ACTION BAR ═══════ */}
                <ScrollReveal delay={0.2}>
                <div className="ps-action-bar">
                    <a href={project.actionBtn.link} target="_blank" rel="noopener noreferrer" className="ps-btn-install interactive">
                        {project.actionBtn.text}
                    </a>
                    {project.githubLink ? (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="ps-btn-icon interactive" aria-label="GitHub">
                            <ExternalLink size={20} />
                        </a>
                    ) : (
                        <button className="ps-btn-icon interactive" aria-label="Share">
                            <Share2 size={20} />
                        </button>
                    )}
                </div>
                </ScrollReveal>

                {/* ═══════ SCREENSHOTS GALLERY ═══════ */}
                <ScrollReveal delay={0.3}>
                <div className="ps-gallery">
                    {project.gallery.map((imgSrc, idx) => (
                        <img key={idx} src={imgSrc} alt={`${project.title} Screenshot ${idx + 1}`} className="ps-gallery-img" />
                    ))}
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
                        {project.aboutDesc}
                    </div>
                </section>
                </ScrollReveal>

                {/* ═══════ FEATURES ═══════ */}
                <ScrollReveal delay={0.2}>
                <section className="ps-section">
                    <div className="ps-section-header">
                        <h2 className="ps-section-title">{project.featuresTitle}</h2>
                        <ArrowRight size={20} className="ps-section-arrow" />
                    </div>
                    <div className="ps-card">
                        <h3 className="ps-card-title">Capabilities</h3>
                        <p className="ps-card-desc">{project.featuresDesc}</p>
                        
                        {project.features.map((feat, idx) => (
                            <div key={idx} className="ps-feature-item">
                                <div className="ps-feature-icon">
                                    {feat.icon}
                                </div>
                                <div className="ps-feature-content">
                                    <h4>{feat.title}</h4>
                                    <p>{feat.desc}</p>
                                </div>
                            </div>
                        ))}
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
                            <p style={{ whiteSpace: 'pre-line' }}>{project.devStack}</p>
                        </div>
                    </div>
                </section>
                </ScrollReveal>

                {/* ═══════ AI METRICS (Only for WinDeck) ═══════ */}
                {project.id === 'windeck' && (
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
                )}
                
                {/* ═══════ MORE BY DEVELOPER (Suggestion Cards) ═══════ */}
                <ScrollReveal delay={0.4}>
                <section className="ps-section" style={{ marginTop: '4rem', paddingBottom: '4rem' }}>
                    <div className="ps-section-header">
                        <h2 className="ps-section-title">More by Developer</h2>
                    </div>
                    
                    <div className="ps-suggestions-grid">
                        {otherProjects.map(p => (
                            <div key={p.id} className="ps-suggestion-card interactive" onClick={() => handleSwitch(p.id)}>
                                <div className="ps-suggestion-icon">
                                    <img src={p.iconUrl} alt={p.title} />
                                </div>
                                <div className="ps-suggestion-details">
                                    <h3>{p.title}</h3>
                                    <p>{p.category.split('·')[0].trim()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Projects;
