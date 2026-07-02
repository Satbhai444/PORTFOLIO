import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { Marquee, TiltCard, MarqueeTitle } from '../components/MarqueeTilt';
import './About.css';

const marqueeItems = ['Flutter', 'React', 'Firebase', 'Node.js', 'Framer Motion', 'Dart', 'Riverpod', 'Vite', 'Prompt Engineering', 'AI Development', 'Socket.io', 'GSAP'];

const ClipReveal = ({ children, delay = 0 }) => (
    <div style={{ overflow: 'hidden' }}>
        <motion.div
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.div>
    </div>
);

const FadeIn = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
        {children}
    </motion.div>
);

const experience = [
    { role: "Flutter & Mobile Development", period: "2024 - Present", desc: "Building cross-platform mobile applications with Flutter, Dart, Riverpod, and Firebase — delivering production-ready apps like Tunify, SeizeFire, Lumina Fitness, and DailyDash." },
    { role: "Web Development & React", period: "2024 - Present", desc: "Creating modern web applications using React, Vite, Tailwind CSS, and Framer Motion with a focus on premium UI/UX and performance." },
    { role: "AI-Augmented Development", period: "2025 - Present", desc: "Leveraging LLMs like Gemini, GPT, and Claude to accelerate development workflows — building full-stack apps at 10x speed through intelligent prompt engineering." },
    { role: "Freelance & Projects", period: "2024 - Present", desc: "Working independently on diverse client projects, from e-commerce platforms to utility apps and IoT solutions like WinDeck." },
];

const About = () => {
    const storyRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
    const cardRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const cardRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
    const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <div className="page-wrapper">
            {/* ═══════ ABOUT HERO ═══════ */}
            <section className="about-hero">
                <div className="padding-global" style={{ paddingBottom: 0 }}>
                    <div className="container-large">
                        <div className="about-hero-content">
                            <FadeIn>
                                <div className="text-style-allcaps text-color-muted" style={{ marginBottom: '1.5rem' }}>About</div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
                <MarqueeTitle title="ABOUT ME" speed={20} />
                <div className="padding-global">
                    <div className="container-large">
                        <FadeIn delay={0.2}>
                            <p className="text-color-muted" style={{ marginTop: '2rem', fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.7' }}>
                                I'm Darshan Satbhai — a Prompt Engineer & AI Specialist who leverages the power of LLMs to build high-performance web and mobile applications at 10x speed. I turn complex visions into digital reality through intelligent AI orchestration.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.35}>
                            <a
                                href="/Darshan_Fresher_Resume.pdf"
                                download="Darshan_Satbhai_Resume.pdf"
                                className="resume-download-btn"
                            >
                                <Download size={16} />
                                Download Resume
                            </a>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* MARQUEE #1 */}
            <Marquee items={marqueeItems} />

            {/* ═══════ 3D PARALLAX CARD ═══════ */}
            <section className="about-card-section" ref={storyRef}>
                <div className="padding-global">
                    <div className="container-large">
                        <div className="about-card-wrapper">
                            <TiltCard className="about-tilt-wrap" maxTilt={14}>
                                <motion.div
                                    className="about-3d-card"
                                    style={{ rotateY: cardRotateY, rotateZ: cardRotateZ, scale: cardScale }}
                                >
                                    <img src="/dev_avatar.png" alt="Darshan Satbhai" />
                                </motion.div>
                            </TiltCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* MARQUEE #2 reverse */}
            <Marquee items={['Web Design', 'Interaction Design', 'Full Stack', 'Mobile Apps', 'AI Integration', 'UI/UX', 'Open Source', 'Freelance']} reverse />

            {/* ═══════ EXPERIENCE TIMELINE ═══════ */}
            <section className="about-experience">
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <FadeIn>
                            <div className="text-style-allcaps text-color-muted" style={{ marginBottom: '3rem' }}>Experience</div>
                        </FadeIn>
                        <div className="experience-list">
                            {experience.map((exp, idx) => (
                                <motion.div
                                    key={idx}
                                    className="experience-item"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                >
                                    <div className="experience-left">
                                        <h3 className="experience-role">{exp.role}</h3>
                                        <span className="text-style-allcaps text-color-muted">{exp.period}</span>
                                    </div>
                                    <div className="experience-right">
                                        <p className="text-color-muted">{exp.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SKILLS / TECH STACK ═══════ */}
            <section className="about-skills">
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <FadeIn>
                            <div className="text-style-allcaps text-color-muted" style={{ marginBottom: '3rem' }}>Tech Stack</div>
                        </FadeIn>
                        <div className="skills-grid">
                            {[
                                { cat: 'Mobile',     skills: ['Flutter', 'Dart', 'Riverpod', 'Hive', 'GoRouter'] },
                                { cat: 'Frontend',   skills: ['React', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'] },
                                { cat: 'Backend',    skills: ['Firebase', 'Firestore', 'Node.js', 'REST APIs', 'Socket.io'] },
                                { cat: 'AI & Tools', skills: ['Gemini', 'GPT-4', 'Claude', 'Prompt Engineering', 'Git'] },
                            ].map((group, idx) => (
                                <FadeIn key={idx} delay={idx * 0.1}>
                                    <TiltCard className="skill-group" maxTilt={8}>
                                        <h4 className="skill-group-title">{group.cat}</h4>
                                        <div className="skill-tags">
                                            {group.skills.map((skill, sIdx) => (
                                                <span key={sIdx} className="skill-tag">{skill}</span>
                                            ))}
                                        </div>
                                    </TiltCard>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MARQUEE #3 light */}
            <Marquee items={marqueeItems} light />

            {/* ═══════ FOOTER CTA ═══════ */}
            <section className="about-footer-cta">
                <div className="padding-global padding-section-large">
                    <div className="container-large" style={{ textAlign: 'center' }}>
                        <FadeIn>
                            <h2 className="heading-style-h2 text-color-white" style={{ marginBottom: '2rem' }}>
                                Let's work together
                            </h2>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <Link to="/contact" className="button is-white">
                                <div className="clip">
                                    <div className="hover-text-wrap">
                                        <span>Get in touch</span>
                                        <span className="hover-text-bottom">Get in touch</span>
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
