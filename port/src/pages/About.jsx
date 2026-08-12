import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import { Marquee } from '../components/MarqueeTilt';
import GitHubStats from '../components/GitHubStats';
import Tilt from 'react-parallax-tilt';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ParallaxBackground from '../components/ParallaxBackground';
import './About.css';

import AIGenerateReveal from '../components/AIGenerateReveal';

const FadeUp = ({ children, delay = 0, className = "" }) => {
    return (
        <AIGenerateReveal delay={delay} className={className}>
            {children}
        </AIGenerateReveal>
    );
};

const marqueeItems = ['Flutter', 'React', 'Firebase', 'Node.js', 'Framer Motion', 'Dart', 'Riverpod', 'Vite', 'Django', 'Python', 'Prompt Engineering', 'AI Development'];

const experience = [
    { role: "Web Development & React", period: "2024 - Present", desc: "Creating modern web applications using React, Vite, Tailwind CSS, and Framer Motion with a focus on premium UI/UX and performance." },
    { role: "Freelance & Projects", period: "2024 - Present", desc: "Working independently on diverse client projects, from e-commerce platforms to utility apps and IoT solutions like WinDeck." },
    { role: "AI-Augmented Development", period: "2025 - Present", desc: "Leveraging LLMs like Gemini, GPT, and Claude to accelerate development workflows — building full-stack apps at 10x speed through intelligent prompt engineering." },
    { role: "Flutter & Mobile Development", period: "2025 - Present", desc: "Building cross-platform mobile applications with Flutter, Dart, Riverpod, and Firebase — delivering production-ready apps like Tunify, SeizeFire, Lumina Fitness, and DailyDash." },
];

const About = () => {
    return (
        <div className="about-v2">
            <ParallaxBackground text1="ENGINEER" text2="INNOVATE" text3="CREATE" />
            
            {/* ═══════ HERO SECTION ═══════ */}
            <section className="about-hero-v2">
                <div className="hero-v2-content">
                    <motion.h1 
                        className="hero-v2-title"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="hollow-text interactive">ABOUT</span><br/>
                        DARSHAN
                    </motion.h1>
                    
                    <motion.div 
                        className="about-bio"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <p>I'm Darshan Satbhai — a Prompt Engineer & AI Specialist who leverages the power of LLMs to build high-performance web and mobile applications at 10x speed. I turn complex visions into digital reality through intelligent AI orchestration.</p>
                        
                        <a
                            href="/Darshan_Fresher_Resume.pdf"
                            download="Darshan_Satbhai_Resume.pdf"
                            className="interactive-btn interactive"
                            style={{ marginTop: '2rem' }}
                        >
                            <Download size={18} /> Download Resume
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* MARQUEE */}
            <Marquee items={marqueeItems} />

            {/* ═══════ EXPERIENCE TIMELINE ═══════ */}
            <section className="padding-global">
                <div className="container-large">
                    <FadeUp>
                        <div className="section-label">Experience Journey</div>
                    </FadeUp>
                    <ExperienceTimeline experience={experience} />
                </div>
            </section>

            {/* ═══════ SKILLS / TECH STACK BENTO ═══════ */}
            <section className="bento-section padding-global padding-section-large" style={{ paddingTop: 0 }}>
                <div className="container-large">
                    <FadeUp>
                        <div className="section-label">Tech Stack</div>
                    </FadeUp>
                    <div className="bento-grid">
                        {[
                            { cat: 'Mobile',     skills: ['Flutter', 'Dart', 'Riverpod', 'Hive'] },
                            { cat: 'Frontend',   skills: ['React', 'JavaScript', 'Tailwind', 'Framer'] },
                            { cat: 'Backend',    skills: ['Firebase', 'Node.js', 'Socket.io', 'REST'] },
                            { cat: 'AI & Tools', skills: ['Gemini', 'GPT-4', 'Claude', 'Git'] },
                        ].map((group, idx) => (
                            <FadeUp key={idx} delay={idx * 0.1} className="bento-small interactive">
                                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{group.cat}</h3>
                                    <div className="skill-tags">
                                        {group.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </Tilt>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ GITHUB LIVE DATA ═══════ */}
            <section className="bento-section padding-global padding-section-large" style={{ paddingTop: 0 }}>
                <div className="container-large">
                    <FadeUp>
                        <div className="section-label">GitHub Activity</div>
                    </FadeUp>
                    <GitHubStats />
                </div>
            </section>

        </div>
    );
};

export default About;
