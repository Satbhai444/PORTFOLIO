import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Marquee, TiltCard, MarqueeTitle } from '../components/MarqueeTilt';
import './Projects.css';

const marqueeItems = ['Tunify', 'SeizeFire', 'Lumina Fitness', 'WinDeck', 'DailyDash', 'Whether', 'Flutter', 'React', 'Firebase', 'Node.js', 'Full Stack'];

const projects = [
    { title: "Tunify",        category: "Music Streaming", tech: "Flutter · Dart · Riverpod · Hive · Firebase",         images: ["/music_player.png"],                                                                                                                                                                                                                    desc: "A feature-rich music streaming app with multi-source search, offline downloads, real-time lyrics, and background playback.",  github: "https://github.com/Satbhai444/tunify" },
    { title: "SeizeFire",     category: "E-Commerce",      tech: "Flutter · Firebase · Riverpod · GoRouter",             images: ["/netflix_clone.png"],                                                                                                                                                                                                                desc: "A premium minimalist streetwear e-commerce app with secure authentication, cart management, and admin dashboard.",           github: "https://github.com/Satbhai444/Seizefire" },
    { title: "Lumina Fitness",category: "Health & Fitness",tech: "Flutter · Riverpod · Hive · TTS · fl_chart",          images: ["/work/luminafitness1.jpeg","/work/luminafitness2.jpeg","/work/luminafitness3.jpeg","/work/luminafitness4.jpeg","/work/luminafitness5.jpeg","/work/luminafitness6.jpeg","/work/luminafitness7.jpeg","/work/luminafitness8.jpeg","/work/luminafitness9.jpeg"], desc: "An offline-first fitness companion with bilingual voice coaching, streak challenges, and interactive progress analytics.",     github: "https://github.com/Satbhai444/Lumina-Fitness" },
    { title: "WinDeck",       category: "Utility / IoT",   tech: "Flutter · Node.js · Socket.io · PowerShell",          images: ["/rubiks_cube_v2.png"],                                                                                                                                                                                                               desc: "A real-time remote control app that transforms an Android phone into a customizable macro pad for Windows PC.",               github: "https://github.com/Satbhai444/windeck" },
    { title: "DailyDash",     category: "Utility Toolbox", tech: "Flutter · Riverpod · Hive · GoRouter",              images: ["/work/dailydash1.jpeg","/work/dailydash2.jpeg","/work/dailydash3.jpeg","/work/dailydash4.jpeg","/work/dailydash5.jpeg"],                                                                                                                    desc: "A comprehensive daily utility toolbox with 15 tools including calculators, scanners, translators, and generators.",          github: "https://github.com/Satbhai444/Daily-Dash" },
    { title: "Whether",       category: "Weather App",     tech: "Flutter · Dart · OpenWeatherMap API · Riverpod",   images: ["/work/whether1.jpeg","/work/whether2.jpeg","/work/whether3.jpeg","/work/whether4.jpeg","/work/whether5.jpeg"],                                                                                                                       desc: "A clean real-time weather app with hourly forecasts, city search, favorites, humidity and UV index tracking.",               github: "https://github.com/Satbhai444/whether" },
];

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

const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);
    const [carouselIdx, setCarouselIdx] = useState(0);

    useEffect(() => { setCarouselIdx(0); }, [hoveredProject]);

    useEffect(() => {
        if (!hoveredProject?.images?.length || hoveredProject.images.length <= 1) return;
        const id = setInterval(() => setCarouselIdx(i => (i + 1) % hoveredProject.images.length), 1800);
        return () => clearInterval(id);
    }, [hoveredProject]);

    return (
        <div className="page-wrapper">
            {/* ═══════ WORKS HERO ═══════ */}
            <section className="works-hero">
                <div className="padding-global" style={{ paddingBottom: 0 }}>
                    <div className="container-large">
                        <div className="works-hero-content">
                            <FadeIn>
                                <div className="text-style-allcaps text-color-muted" style={{ marginBottom: '1.5rem' }}>Selected Work</div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
                <MarqueeTitle title="MY WORK" speed={16} />
            </section>

            {/* MARQUEE */}
            <Marquee items={marqueeItems} />

            {/* ═══════ WORKS SPLIT PANEL ═══════ */}
            <section className="works-split-section">
                {/* Left: sticky image preview */}
                <div className="works-split-left">
                    <AnimatePresence mode="wait">
                        {hoveredProject ? (
                            <motion.div
                                key={hoveredProject.title}
                                className="works-carousel-wrap"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={carouselIdx}
                                        src={hoveredProject.images[carouselIdx]}
                                        alt={hoveredProject.title}
                                        className="works-preview-img"
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </AnimatePresence>
                                {hoveredProject.images.length > 1 && (
                                    <div className="works-carousel-dots">
                                        {hoveredProject.images.map((_, i) => (
                                            <span key={i} className={`works-dot${i === carouselIdx ? ' is-active' : ''}`} />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.p
                                key="placeholder"
                                className="works-preview-placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                Hover a project
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: white project list */}
                <div className="works-split-right">
                    <div className="works-panel-header">
                        <span className="text-style-allcaps">All Projects</span>
                        <span className="text-style-allcaps" style={{ color: '#999' }}>{projects.length} Works</span>
                    </div>
                    {projects.map((proj, idx) => (
                        <motion.div
                            key={idx}
                            className="works-panel-item"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            onMouseEnter={() => setHoveredProject(proj)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="works-panel-item-left">
                                <span className="works-panel-num">0{idx + 1}</span>
                                <div>
                                    <span className="works-panel-title">{proj.title}</span>
                                    <span className="works-panel-cat">{proj.category}</span>
                                </div>
                            </div>
                            <a
                                href={proj.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="works-panel-github"
                                onClick={e => e.stopPropagation()}
                            >
                                <FaGithub size={18} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* MARQUEE light */}
            <Marquee items={['Open to Work', 'Available for Freelance', "Let's Build Something", 'Get in Touch']} light />

            {/* ═══════ FOOTER CTA ═══════ */}
            <section className="works-footer-cta">
                <div className="padding-global padding-section-large">
                    <div className="container-large" style={{ textAlign: 'center' }}>
                        <FadeIn>
                            <p className="text-color-muted" style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                                Interested in working together? Let's discuss your next project.
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <Link to="/contact" className="button is-white">
                                <div className="clip">
                                    <div className="hover-text-wrap">
                                        <span>Start a project</span>
                                        <span className="hover-text-bottom">Start a project</span>
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

export default Projects;
