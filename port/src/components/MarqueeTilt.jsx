import React, { useRef, useCallback } from 'react';
import './MarqueeTilt.css';

/* ─── MARQUEE ─── */
export const Marquee = ({ items, light = false, reverse = false }) => {
    const doubled = [...items, ...items];
    return (
        <div className={`marquee-section${light ? ' is-light' : ''}`}>
            <div className={`marquee-track${reverse ? ' reverse' : ''}`}>
                {doubled.map((item, i) => (
                    <span key={i} className="marquee-item">
                        {item}
                        <span className="marquee-dot" />
                    </span>
                ))}
            </div>
        </div>
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
