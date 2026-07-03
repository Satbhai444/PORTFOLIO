import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Spotlight = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleToggleSpotlight = (e) => {
            if (e.detail && e.detail.type === 'toggle-spotlight') {
                setIsActive(prev => !prev);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('spotlight-toggle', handleToggleSpotlight);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('spotlight-toggle', handleToggleSpotlight);
        };
    }, []);

    if (!isActive) return null;

    return (
        <motion.div
            className="spotlight-overlay"
            animate={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.95) 100%)`
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 9998,
                pointerEvents: 'none',
                boxShadow: `inset 0 0 100px var(--accent-glow)` // Subtle rim glow in spotlight mode
            }}
        />
    );
};

export default Spotlight;

