import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import './ExperienceTimeline.css';

const ExperienceTimeline = ({ experience }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 60%", "end 60%"]
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    return (
        <div className="experience-timeline-container" ref={containerRef}>
            
            {/* DESKTOP SVG PATH */}
            <div className="timeline-svg-wrapper hide-mobile">
                <svg viewBox="0 0 1000 1600" fill="none" className="timeline-svg">
                    {/* Faded dashed line */}
                    <path 
                        d="M500 50 C500 250, 850 250, 850 450 C850 700, 150 700, 150 950 C150 1200, 850 1200, 850 1450"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="4"
                        strokeDasharray="16 16"
                        fill="none"
                        strokeLinecap="round"
                    />
                    {/* Animated highlight line */}
                    <motion.path 
                        d="M500 50 C500 250, 850 250, 850 450 C850 700, 150 700, 150 950 C150 1200, 850 1200, 850 1450"
                        stroke="#fff"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        style={{ pathLength }}
                    />
                </svg>
            </div>

            {/* MOBILE LINE */}
            <div className="timeline-mobile-line show-mobile">
                <motion.div className="mobile-line-highlight" style={{ scaleY: pathLength, transformOrigin: 'top' }} />
            </div>

            {/* CARDS */}
            <div className="timeline-nodes-container">
                {experience.map((exp, idx) => {
                    // Desktop positions mapped to the SVG path points
                    // Node 0: (500, 50) -> Top Center
                    // Node 1: (850, 450) -> Right
                    // Node 2: (150, 950) -> Left
                    // Node 3: (850, 1450) -> Right
                    
                    let nodeClass = `node-${idx}`;
                    let alignment = idx % 2 !== 0 ? 'align-right' : 'align-left';
                    if (idx === 0) alignment = 'align-center';

                    // Reveal opacity based on scroll
                    const cardOpacity = useTransform(
                        scrollYProgress, 
                        [Math.max(0, (idx * 0.25) - 0.1), (idx * 0.25) + 0.1], 
                        [0.2, 1]
                    );

                    return (
                        <div key={idx} className={`timeline-node-wrapper ${nodeClass} ${alignment}`}>
                            <div className="timeline-dot-container hide-mobile">
                                <div className="timeline-dot-base" />
                                <motion.div 
                                    className="timeline-dot-highlight"
                                    style={{ 
                                        scale: useTransform(
                                            scrollYProgress, 
                                            [idx * 0.25, (idx * 0.25) + 0.05], 
                                            [0, 1]
                                        ) 
                                    }}
                                />
                            </div>
                            
                            <motion.div style={{ opacity: cardOpacity }} className="timeline-card-motion">
                                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="timeline-card bento-item interactive">
                                    <div>
                                        <span className="exp-period">{exp.period}</span>
                                        <h3 className="exp-role">{exp.role}</h3>
                                    </div>
                                    <p>{exp.desc}</p>
                                </Tilt>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExperienceTimeline;
