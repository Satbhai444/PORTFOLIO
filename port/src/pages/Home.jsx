import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ScrollReveal from '../components/ScrollReveal';
import CipherReveal from '../components/CipherReveal';
import Tilt from 'react-parallax-tilt';
import ParallaxBackground from '../components/ParallaxBackground';
import { Marquee } from '../components/MarqueeTilt';
import "./Home.css";

const FadeUp = ({ children, delay = 0, className = "" }) => {
    return (
        <ScrollReveal delay={delay} className={className}>
            {children}
        </ScrollReveal>
    );
};

const ScrollRevealText = ({ text }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 50%"]
    });

    const words = text.split(" ");
    return (
        <div ref={ref} className="scroll-reveal-text">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
                return (
                    <motion.span key={i} style={{ opacity }} className="reveal-word">
                        {word}{" "}
                    </motion.span>
                );
            })}
        </div>
    );
};

const Home = () => {
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
    const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

    const projectRef = useRef(null);
    const { scrollYProgress: projectScroll } = useScroll({
        target: projectRef,
        offset: ["start end", "end start"]
    });
    const projectScale = useTransform(projectScroll, [0, 0.5], [0.8, 1]);

    return (
        <div className="home-v2">
            <ParallaxBackground text1="DEVELOP" text2="BUILD" text3="DEPLOY" />
            
            {/* ═══════ HERO SECTION ═══════ */}
            <section className="hero-v2" ref={heroRef}>
                <motion.div className="hero-v2-content" style={{ y: heroY, opacity: heroOpacity }}>
                    <motion.h1 
                        className="hero-v2-title"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <CipherReveal text="DARSHAN" className="hollow-text interactive premium-spotlight-text" /><br/>
                        <CipherReveal text="SATBHAI" className="interactive premium-spotlight-text" />
                    </motion.h1>
                    <motion.div 
                        className="hero-v2-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <p>Creative Developer • Prompt Engineer</p>
                        <ArrowDown className="scroll-indicator" style={{ marginTop: '2rem' }} />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═━═━═━═━═━═━═ MARQUEE ═━═━═━═━═━═━═ */}
            <div style={{ padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Marquee items={['React', 'Vite', 'Framer Motion', 'Node.js', 'Firebase', 'Flutter', 'Prompt Engineering', 'AI Orchestration']} />
            </div>

            {/* ═━═━═━═━═━═━═ SCROLL REVEAL STATEMENT ═━═━═━═━═━═━═ */}
            <section className="statement-section padding-global padding-section-large">
                <div className="container-large">
                    <ScrollRevealText text="I craft digital masterpieces through advanced AI and prompt engineering. From ultra-low-latency desktop clients to sleek web applications, I focus on architecting logic and generating products that feel alive at 10x speed." />
                </div>
            </section>

            {/* ═━═━═━═━═━═━═ MY PROCESS / WORKFLOW ═━═━═━═━═━═━═ */}
            <section className="process-section padding-global padding-section-large" style={{ backgroundColor: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container-large">
                    <FadeUp>
                        <div className="section-label">The 10x Workflow</div>
                    </FadeUp>
                    <div className="process-grid" style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '2rem', 
                        marginTop: '3rem' 
                    }}>
                        {[
                            { step: '01', title: 'AI Orchestration', desc: 'Translating complex ideas into precise prompts to rapidly scaffold robust, scalable architectures.' },
                            { step: '02', title: 'Component Engineering', desc: 'Refining generated code into modular, highly interactive React and Framer Motion components.' },
                            { step: '03', title: 'System Integration', desc: 'Connecting Firebase, Node.js, and APIs to ensure seamless, real-time data flow and security.' },
                            { step: '04', title: 'Premium Polish', desc: 'Adding micro-interactions, Liquid Glass physics, and custom shaders for that final "God-Tier" feel.' },
                        ].map((item, i) => (
                            <FadeUp key={i} delay={i * 0.1}>
                                <div className="process-card" style={{
                                    padding: '2rem',
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '16px'
                                }}>
                                    <h2 style={{ color: 'rgba(255,255,255,0.2)', fontSize: '3rem', marginBottom: '1rem', fontWeight: 900 }}>{item.step}</h2>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#fff' }}>{item.title}</h3>
                                    <p style={{ color: '#888', lineHeight: 1.6, fontSize: '0.9rem' }}>{item.desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═━═━═━═━═━═━═ FEATURED PROJECT (WINDECK) ═━═━═━═━═━═━═ */}
            <section className="featured-project-section" ref={projectRef} style={{ paddingTop: '8rem' }}>
                <div className="padding-global">
                    <FadeUp>
                        <div className="section-label">Featured Work</div>
                    </FadeUp>
                </div>
                
                <motion.div className="fp-showcase" style={{ scale: projectScale }}>
                    <div className="fp-image-container" style={{ background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <div style={{
                            fontSize: 'clamp(5rem, 20vw, 25rem)',
                            fontWeight: '900',
                            color: 'transparent',
                            WebkitTextStroke: '2px rgba(255,255,255,0.03)',
                            textTransform: 'uppercase',
                            lineHeight: 0.8,
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                            transform: 'rotate(-5deg) scale(1.2)'
                        }}>
                            WINDECK WINDECK WINDECK
                        </div>
                        <div className="fp-overlay"></div>
                    </div>
                    
                    <div className="fp-content padding-global">
                        <div className="fp-content-inner container-large">
                            <div>
                                <h2 className="fp-title">WinDeck</h2>
                                <p style={{ 
                                    maxWidth: '600px', 
                                    fontSize: '1rem', 
                                    color: '#9aa0a6', 
                                    lineHeight: '1.6', 
                                    marginTop: '16px' 
                                }}>
                                    It's like an Elgato Stream Deck, but in your Android phone! A full-stack, open-ecosystem wireless control suite that turns any smartphone into an ultra-low-latency, encrypted touch-screen control panel for Windows PCs over local Wi-Fi.
                                </p>
                            </div>
                            <Link to="/projects" className="interactive-btn interactive">
                                EXPLORE PROJECT <ArrowUpRight />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═━═━═━═━═━═━═ FEATURED PROJECT 2 (ECHO MUSIC) ═━═━═━═━═━═━═ */}
            <section className="featured-project-section" style={{ paddingBottom: '8rem', paddingTop: '2rem' }}>
                <motion.div className="fp-showcase" style={{ scale: projectScale, background: 'rgba(255,255,255,0.02)' }}>
                    <div className="fp-image-container" style={{ background: '#020202', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <div style={{
                            fontSize: 'clamp(5rem, 20vw, 25rem)',
                            fontWeight: '900',
                            color: 'transparent',
                            WebkitTextStroke: '2px rgba(255,255,255,0.03)',
                            textTransform: 'uppercase',
                            lineHeight: 0.8,
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                            transform: 'rotate(5deg) scale(1.2)'
                        }}>
                            ECHO ECHO ECHO
                        </div>
                        <div className="fp-overlay" style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 100%)' }}></div>
                    </div>
                    
                    <div className="fp-content padding-global">
                        <div className="fp-content-inner container-large" style={{ flexDirection: 'row-reverse' }}>
                            <div style={{ textAlign: 'right' }}>
                                <h2 className="fp-title">Echo Music</h2>
                                <p style={{ 
                                    maxWidth: '600px', 
                                    fontSize: '1rem', 
                                    color: '#9aa0a6', 
                                    lineHeight: '1.6', 
                                    marginTop: '16px',
                                    marginLeft: 'auto'
                                }}>
                                    An elegant, high-performance music streaming application built for absolute audio immersion. Featuring custom Liquid Glass mini-players, dynamic themes based on album art, and an ultra-smooth Flutter-based architecture.
                                </p>
                            </div>
                            <Link to="/projects" className="interactive-btn interactive">
                                EXPLORE APP <ArrowUpRight />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════ SERVICES & STATS BENTO ═══════ */}
            <section className="bento-section padding-global padding-section-large">
                <div className="container-large">
                    <FadeUp>
                        <div className="section-label">Capabilities</div>
                    </FadeUp>
                    <div className="bento-grid">
                        <ScrollReveal delay={0.1} className="bento-large interactive">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>Full Stack Development</h3>
                                <p>End-to-end architecture using React, Node.js, and Firebase. Building robust, scalable, and secure web applications.</p>
                            </Tilt>
                        </ScrollReveal>
                        <ScrollReveal delay={0.2} className="bento-small interactive">
                            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>7+</h3>
                                <p>Projects Shipped</p>
                            </Tilt>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3} className="bento-small interactive">
                            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>Mobile Apps</h3>
                                <p>Cross-platform Flutter</p>
                            </Tilt>
                        </ScrollReveal>
                        <ScrollReveal delay={0.4} className="bento-medium interactive">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>Interaction Design</h3>
                                <p>Crafting micro-interactions, custom cursors, and smooth page transitions with Framer Motion and Lenis.</p>
                            </Tilt>
                        </ScrollReveal>
                        <ScrollReveal delay={0.5} className="bento-medium interactive">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>AI Augmented</h3>
                                <p>10x development speed by leveraging cutting-edge AI workflows.</p>
                            </Tilt>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
