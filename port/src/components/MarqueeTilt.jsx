import React, { useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MarqueeTilt.css';

/* ─── MARQUEE ─── */
export const Marquee = ({ items, light = false, reverse = false }) => {
    const [activeSkill, setActiveSkill] = useState(null);
    const doubled = [...items, ...items];
    
    return (
        <>
        <div className={`marquee-section${light ? ' is-light' : ''}`}>
            <div className={`marquee-track${reverse ? ' reverse' : ''}`}>
                {doubled.map((item, i) => (
                    <span 
                        key={i} 
                        className="marquee-item interactive"
                        onClick={() => setActiveSkill(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        {item}
                        <span className="marquee-dot" />
                    </span>
                ))}
            </div>
        </div>

        {/* SKILL MODAL */}
        <AnimatePresence>
            {activeSkill && (
                <motion.div 
                    className="skill-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveSkill(null)}
                >
                    <motion.div 
                        className="skill-modal-content"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="skill-modal-header">
                            <div className="skill-modal-icon">
                                <Code2 size={24} />
                            </div>
                            <button className="skill-modal-close interactive" onClick={() => setActiveSkill(null)}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        <h3 className="skill-modal-title">{activeSkill}</h3>
                        <p className="skill-modal-desc">
                            I leverage <strong>{activeSkill}</strong> alongside advanced AI workflows to architect and deliver high-performance digital experiences at 10x speed.
                        </p>

                        <div className="skill-modal-actions">
                            <Link to="/projects" className="skill-modal-btn primary interactive">
                                View Case Studies <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

/* ─── MARQUEE TITLE ─── */
export const MarqueeTitle = ({ title, speed = 18 }) => {
    const repeated = [title, title, title, title];
    return (
        <div className="marquee-title-section">
            <div className="marquee-title-track" style={{ animationDuration: `${speed}s` }}>
                {repeated.map((t, i) => (
                    <span key={i} className="marquee-title-item">
                        {t}
                        <span className="marquee-title-sep">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ─── TILT CARD ───
   Wraps any children with a 3-D cursor-follow tilt.
   maxTilt: degrees (default 12)
*/
export const TiltCard = ({ children, className = '', maxTilt = 12, style = {} }) => {
    const ref = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        const rotX = -y * maxTilt;
        const rotY =  x * maxTilt;
        el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    }, [maxTilt]);

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }, []);

    return (
        <div
            ref={ref}
            className={`tilt-card ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};
