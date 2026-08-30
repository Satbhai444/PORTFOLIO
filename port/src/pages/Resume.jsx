import React from 'react';
import { Download, Briefcase, GraduationCap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Resume.css';

const Resume = () => {
    return (
        <div className="resume-container">
            <ScrollReveal>
                <div className="resume-header">
                    <div>
                        <h1 className="resume-title">Resume</h1>
                        <p className="resume-subtitle">My journey and experience so far.</p>
                    </div>
                    {/* Dummy download link for now */}
                    <a href="#" className="download-btn">
                        <Download size={20} />
                        Download PDF
                    </a>
                </div>
            </ScrollReveal>

            <div className="timeline-section">
                <ScrollReveal delay={0.1}>
                    <h2><Briefcase size={24} /> Experience</h2>
                </ScrollReveal>
                <div className="timeline">
                    
                    <ScrollReveal delay={0.2}>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-date">2025 - Present</div>
                            <h3 className="timeline-role">Mobile & Full-Stack Developer</h3>
                            <div className="timeline-company">Independent / Freelance</div>
                            <p className="timeline-desc">
                                Architecting and building cross-platform mobile applications using Flutter and React. 
                                Integrated complex Firebase backends, AI features (LLMs), and managed end-to-end deployments.
                            </p>
                            <div className="skill-tags">
                                <span className="skill-tag">Flutter</span>
                                <span className="skill-tag">React</span>
                                <span className="skill-tag">Firebase</span>
                                <span className="skill-tag">Prompt Engineering</span>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-date">2024 - 2025</div>
                            <h3 className="timeline-role">Frontend Web Developer</h3>
                            <div className="timeline-company">Personal Projects</div>
                            <p className="timeline-desc">
                                Developed multiple highly interactive web applications including WinDeck and various landing pages. 
                                Focused on high-performance animations, responsive design, and modern UX patterns.
                            </p>
                            <div className="skill-tags">
                                <span className="skill-tag">JavaScript</span>
                                <span className="skill-tag">Vite</span>
                                <span className="skill-tag">Framer Motion</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            <div className="timeline-section">
                <ScrollReveal delay={0.4}>
                    <h2><GraduationCap size={24} /> Education</h2>
                </ScrollReveal>
                <div className="timeline">
                    <ScrollReveal delay={0.5}>
                        <div className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-date">2022 - 2026</div>
                            <h3 className="timeline-role">Computer Science</h3>
                            <div className="timeline-company">University / College Name</div>
                            <p className="timeline-desc">
                                Focus on Data Structures, Algorithms, and Software Engineering principles.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

export default Resume;
