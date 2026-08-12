import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import AIGenerateReveal from '../components/AIGenerateReveal';
import CipherReveal from '../components/CipherReveal';
import Tilt from 'react-parallax-tilt';
import ParallaxBackground from '../components/ParallaxBackground';
import "./Home.css";

const FadeUp = ({ children, delay = 0, className = "" }) => {
    return (
        <AIGenerateReveal delay={delay} className={className}>
            {children}
        </AIGenerateReveal>
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
                        <CipherReveal text="DARSHAN" className="hollow-text interactive" /><br/>
                        <CipherReveal text="SATBHAI" className="interactive" />
                    </motion.h1>
                    <motion.div 
                        className="hero-v2-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <p>Creative Developer • Prompt Engineer</p>
                        <ArrowDown className="scroll-indicator" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════ SCROLL REVEAL STATEMENT ═══════ */}
            <section className="statement-section padding-global padding-section-large">
                <div className="container-large">
                    <ScrollRevealText text="I craft digital masterpieces through advanced AI and prompt engineering. From ultra-low-latency desktop clients to sleek web applications, I focus on architecting logic and generating products that feel alive at 10x speed." />
                </div>
            </section>

            {/* ═══════ FEATURED PROJECT (WINDECK) ═══════ */}
            <section className="featured-project-section" ref={projectRef}>
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
                                    It's like an Elgato Stream Deck, but in your Android phone! A full-stack, open-ecosystem wireless control suite that turns any smartphone into an ultra-low-latency, encrypted touch-screen control panel for Windows PCs over local Wi-Fi. Launch apps, execute macros, and monitor system telemetry seamlessly.
                                </p>
                            </div>
                            <Link to="/projects" className="interactive-btn interactive">
                                EXPLORE PROJECT <ArrowUpRight />
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
                        <AIGenerateReveal delay={0.1} className="bento-large interactive">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>Full Stack Development</h3>
                                <p>End-to-end architecture using React, Node.js, and Firebase. Building robust, scalable, and secure web applications.</p>
                            </Tilt>
                        </AIGenerateReveal>
                        <AIGenerateReveal delay={0.2} className="bento-small interactive">
                            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>7+</h3>
                                <p>Projects Shipped</p>
                            </Tilt>
                        </AIGenerateReveal>
                        <AIGenerateReveal delay={0.3} className="bento-small interactive">
                            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>Mobile Apps</h3>
                                <p>Cross-platform Flutter</p>
                            </Tilt>
                        </AIGenerateReveal>
                        <AIGenerateReveal delay={0.4} className="bento-medium interactive">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>Interaction Design</h3>
                                <p>Crafting micro-interactions, custom cursors, and smooth page transitions with Framer Motion and Lenis.</p>
                            </Tilt>
                        </AIGenerateReveal>
                        <AIGenerateReveal delay={0.5} className="bento-medium interactive">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="bento-item" style={{ height: '100%' }}>
                                <h3>AI Augmented</h3>
                                <p>10x development speed by leveraging cutting-edge AI workflows.</p>
                            </Tilt>
                        </AIGenerateReveal>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
