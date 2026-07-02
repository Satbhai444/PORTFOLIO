import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, Plus, Download } from "lucide-react";
import "./Home.css";

/* ─── DATA ─── */
const projects = [
    { title: "CLASSX",         category: "EDTECH PLATFORM",     images: ["/work/classx1.jpeg"] },
    { title: "TUNIFY",         category: "MUSIC STREAMING APP", images: ["/music_player.png"] },
    { title: "SEIZEFIRE",      category: "E-COMMERCE APP",      images: ["/netflix_clone.png"] },
    { title: "LUMINA FITNESS", category: "HEALTH & FITNESS",    images: ["/work/luminafitness1.jpeg","/work/luminafitness2.jpeg","/work/luminafitness3.jpeg","/work/luminafitness4.jpeg","/work/luminafitness5.jpeg","/work/luminafitness6.jpeg","/work/luminafitness7.jpeg","/work/luminafitness8.jpeg","/work/luminafitness9.jpeg"] },
    { title: "WINDECK",        category: "UTILITY & NETWORKING",images: ["/rubiks_cube_v2.png"] },
    { title: "DAILY DASH",     category: "UTILITY TOOLBOX",     images: ["/work/dailydash1.jpeg","/work/dailydash2.jpeg","/work/dailydash3.jpeg","/work/dailydash4.jpeg","/work/dailydash5.jpeg"] },
    { title: "WHETHER",        category: "WEATHER APP",         images: ["/work/whether1.jpeg","/work/whether2.jpeg","/work/whether3.jpeg","/work/whether4.jpeg","/work/whether5.jpeg"] },
];

const services = [
    { num: "001", title: "Web Design",        desc: "Creating unique designs that reflect brand identity and goals, considering UX, usability, navigation, and content organization." },
    { num: "002", title: "Interaction Design", desc: "Understanding client requirements, analyzing existing solutions, then designing, coding, and testing the web application end-to-end." },
    { num: "003", title: "Web Development",    desc: "Building scalable full-stack applications — from sleek React UIs to robust Node.js and Firebase backends." },
];

const stats = [
    { number: '7+',   label: 'Projects Built' },
    { number: '4',    label: 'Tech Stacks' },
    { number: '1+',   label: 'Year of Experience' },
    { number: '10x',  label: 'Faster with AI' },
];

const faqs = [
    { q: "How long do projects typically take?",  a: "Project timelines vary based on complexity. Simple landing pages take 1-2 weeks, while full-stack applications can take 4-8 weeks. I always start with a discovery call to give you an accurate estimate." },
    { q: "What is your design process?",          a: "I begin with requirements gathering, move to wireframing and prototyping, then development with frequent check-ins. This ensures the final product aligns with your vision at every stage." },
    { q: "Do you offer ongoing support?",         a: "Yes! I offer post-launch support and maintenance packages. Whether it's bug fixes, updates, or new features, I'm here to keep your product running smoothly." },
    { q: "What technologies do you work with?",   a: "I specialize in React, Vite, Node.js, Firebase, and Flutter. I also work with Framer Motion for polished UIs and AI-augmented development workflows." },
    { q: "How do we get started?",                a: "Simply schedule a call through the contact page. We'll discuss your project, goals, and timeline — and I'll get back to you with a proposal within 24 hours." },
];

/* ─── HELPERS ─── */
const ClipReveal = ({ children, delay = 0, duration = 0.9 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px 0px" });
    return (
        <div ref={ref} style={{ overflow: "hidden" }}>
            <motion.div
                initial={{ y: "110%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const FadeUp = ({ children, delay = 0, duration = 0.8 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px 0px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
};

/* ─── PROJECT ROW ─── */
const ProjectRow = ({ p, i, onHover }) => {
    const rowRef = useRef(null);
    const inView = useInView(rowRef, { once: true, margin: "0px 0px -40px 0px" });

    return (
        <Link
            to="/projects"
            className="wf-project-row"
            ref={rowRef}
            onMouseEnter={() => onHover(p.images)}
            onMouseLeave={() => onHover(null)}
        >
            <div className="wf-row-divider" />
            <div className="wf-project-content">
                <div className="wf-title-clip">
                    <motion.h2
                        className="wf-project-title"
                        initial={{ y: "105%" }}
                        animate={inView ? { y: 0 } : {}}
                        transition={{ duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {p.title}
                    </motion.h2>
                </div>
                <span className="wf-project-cat">{p.category}</span>
            </div>
        </Link>
    );
};



/* ─── HOME ─── */
const Home = () => {
    const [openFaq, setOpenFaq]             = useState(null);
    const [hoveredImages, setHoveredImages]  = useState(null);
    const [carouselIdx, setCarouselIdx]      = useState(0);

    useEffect(() => { setCarouselIdx(0); }, [hoveredImages]);

    useEffect(() => {
        if (!hoveredImages?.length || hoveredImages.length <= 1) return;
        const id = setInterval(() => setCarouselIdx(i => (i + 1) % hoveredImages.length), 1800);
        return () => clearInterval(id);
    }, [hoveredImages]);

    const renderSplitName = (name, baseDelay = 0) =>
        name.split("").map((ch, i) => (
            <motion.span
                key={i}
                className="wf-letter"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: baseDelay + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block" }}
            >
                {ch === " " ? "\u00A0" : ch}
            </motion.span>
        ));

    return (
        <div className="wf-home">

            {/* ══ HERO ══ */}
            <section className="wf-hero">
                <div className="wf-hero-names">
                    <div className="wf-name-clip"><h1 className="wf-name-line">{renderSplitName("DARSHAN", 0.1)}</h1></div>
                    <div className="wf-name-clip"><h1 className="wf-name-line">{renderSplitName("SATBHAI", 0.22)}</h1></div>
                </div>

                <motion.div
                    className="wf-hero-card-wrap"
                    initial={{ opacity: 0, y: "85%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <motion.div
                        className="wf-hero-card"
                        initial={{ scale: 0.65, rotateY: 180, rotateZ: 25 }}
                        animate={{ scale: 1, rotateY: 0, rotateZ: 0 }}
                        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                    >
                        <img src="/dev_avatar.png" alt="Darshan Satbhai" className="wf-hero-img" />
                    </motion.div>
                </motion.div>

                <motion.a
                    href="#intro"
                    className="wf-scroll-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ delay: 1.3, duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    aria-label="Scroll down"
                >
                    <ArrowDown size={20} />
                </motion.a>

                {/* Resume Download */}
                <motion.a
                    href="/Darshan_Fresher_Resume.pdf"
                    download="Darshan_Satbhai_Resume.pdf"
                    className="wf-resume-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Download size={14} />
                    Resume
                </motion.a>

                {/* Hero tagline — visible without scrolling */}
                <motion.div
                    className="wf-hero-tagline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                >
                    Building mobile & web apps at<br />10× speed with AI.
                </motion.div>

                {/* Curved SVG divider at bottom */}
                <div className="wf-hero-curve">
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#f2f2f2" />
                    </svg>
                </div>
            </section>

            {/* ══ INTRO (WHITE) ══ */}
            <section id="intro" className="wf-intro-section">
                <FadeUp delay={0.05}>
                    <p className="wf-intro-text">
                        Passionate Full Stack Developer dedicated to building robust
                        applications, seamless user interfaces, and efficient backend systems.
                    </p>
                </FadeUp>
                <FadeUp delay={0.18}>
                    <div style={{ textAlign: 'center' }}>
                        <Link to="/about" className="wf-pill-btn wf-pill-dark">
                            <div className="clip">
                                <div className="hover-text-wrap">
                                    <span>EXPLORE MY STORY</span>
                                    <span className="hover-text-bottom">EXPLORE MY STORY</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </FadeUp>
                <div className="wf-since-block">
                    <FadeUp delay={0.05}>
                        <span className="wf-spaced-label">S I N C E &nbsp; 2 0 2 5</span>
                        <div className="wf-divider-line" />
                    </FadeUp>
                    <ClipReveal delay={0.12}>
                        <p className="wf-since-huge">SINCE 2025</p>
                    </ClipReveal>
                </div>
            </section>

            {/* ══ PORTFOLIO INTRO (BLACK) ══ */}
            <section className="wf-portfolio-intro">
                <FadeUp delay={0.05}>
                    <p className="wf-portfolio-text">
                        From crafting sleek user interfaces to developing efficient backends,
                        I focus on turning innovative ideas into fully functional digital realities.
                    </p>
                </FadeUp>
                <FadeUp delay={0.18}>
                    <Link to="/projects" className="wf-pill-btn wf-pill-light">
                        <div className="clip">
                            <div className="hover-text-wrap">
                                <span>VIEW MY PORTFOLIO</span>
                                <span className="hover-text-bottom">VIEW MY PORTFOLIO</span>
                            </div>
                        </div>
                    </Link>
                </FadeUp>
            </section>

            {/* ══ PROJECTS LIST (with sticky hover image) ══ */}
            <section className="wf-projects-section">
                <div className="wf-projects-layout">
                    {/* Left: scrollable list */}
                    <div className="wf-projects-list">
                        {projects.map((p, i) => (
                            <ProjectRow key={i} p={p} i={i} onHover={setHoveredImages} />
                        ))}
                        <div className="wf-row-divider" />
                    </div>

                    {/* Right: sticky image preview */}
                    <div className="wf-projects-preview">
                        <AnimatePresence mode="wait">
                            {hoveredImages && (
                                <motion.div
                                    key={hoveredImages[0]}
                                    className="wf-preview-img-wrap"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={carouselIdx}
                                            src={hoveredImages[carouselIdx]}
                                            alt="Project preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </AnimatePresence>
                                    {hoveredImages.length > 1 && (
                                        <div className="wf-carousel-dots">
                                            {hoveredImages.map((_, i) => (
                                                <span key={i} className={`wf-dot${i === carouselIdx ? ' is-active' : ''}`} />
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {!hoveredImages && (
                            <div className="wf-preview-placeholder">
                                <span>HOVER A PROJECT</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ══ SERVICES (WHITE CARD) ══ */}
            <section className="wf-dark-pad">
                <div className="wf-card">
                    <FadeUp>
                        <span className="wf-spaced-label wf-label-top">M Y &nbsp; S E R V I C E S</span>
                    </FadeUp>
                    {services.map((s, i) => (
                        <FadeUp key={i} delay={i * 0.1}>
                            <div className="wf-service-row">
                                <div className="wf-service-header-row">
                                    <span className="wf-service-num">{s.num}</span>
                                    <h3 className="wf-service-title">{s.title}</h3>
                                </div>
                                <p className="wf-service-desc">{s.desc}</p>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </section>

            {/* ══ STATS ══ */}
            <section className="wf-stats-section">
                <FadeUp>
                    <span className="wf-spaced-label wf-label-top" style={{ color: '#555' }}>B Y &nbsp; T H E &nbsp; N U M B E R S</span>
                </FadeUp>
                <div className="wf-stats-grid">
                    {stats.map((s, i) => (
                        <FadeUp key={i} delay={i * 0.1}>
                            <div className="wf-stat-item">
                                <span className="wf-stat-number">{s.number}</span>
                                <span className="wf-stat-label">{s.label}</span>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </section>

            {/* ══ FAQ (WHITE CARD) ══ */}
            <section className="wf-dark-pad">
                <div className="wf-card">
                    <FadeUp>
                        <span className="wf-spaced-label wf-label-top">F R E Q U E N T L Y &nbsp; A S K E D</span>
                    </FadeUp>
                    {faqs.map((f, i) => (
                        <FadeUp key={i} delay={i * 0.06}>
                            <div className="wf-faq-item">
                                <div className="wf-row-divider wf-divider-dark" />
                                <button
                                    className="wf-faq-trigger"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    aria-expanded={openFaq === i}
                                >
                                    <div className="wf-faq-left">
                                        <span className="wf-faq-num">0{i + 1}</span>
                                        <span className="wf-faq-q-text">{f.q}</span>
                                    </div>
                                    <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3 }}>
                                        <Plus size={18} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                                            className="wf-faq-answer"
                                            style={{ overflow: "hidden" }}
                                        >
                                            <p>{f.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </FadeUp>
                    ))}
                    <div className="wf-row-divider wf-divider-dark" />
                </div>
            </section>

            {/* ══ CONTACT CTA (massive bg text + floating form) ══ */}
            <section className="wf-contact-cta">
                <div className="wf-contact-bg-text" aria-hidden="true">CONTACT ME</div>
                <div className="wf-contact-float-card">
                    <FadeUp>
                        <p className="wf-cta-text">
                            Whether you need design or need to tweak some code, I have the skills
                            and creativity needed to take your project to the next level.
                        </p>
                    </FadeUp>
                    <FadeUp delay={0.12}>
                        <a href="tel:+916351015778" className="wf-pill-btn wf-pill-dark">
                            <div className="clip">
                                <div className="hover-text-wrap">
                                    <span>SCHEDULE A CALL</span>
                                    <span className="hover-text-bottom">SCHEDULE A CALL</span>
                                </div>
                            </div>
                        </a>
                    </FadeUp>
                </div>
            </section>

        </div>
    );
};

export default Home;
