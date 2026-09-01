import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { Home, User, Layers, Mail, Search, Laptop, FileText, BookOpen } from 'lucide-react';
import './MacDock.css';

const MacDock = () => {
    const location = useLocation();

    // 🌊 Liquid Scroll Momentum Logic
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 30,
        stiffness: 200
    });

    // Jab hum scroll karte hain, dock physical liquid ki tarah react karega
    const yOffset = useTransform(smoothVelocity, [-1000, 0, 1000], [15, 0, -15]); // Up/Down bounce
    const rotateX = useTransform(smoothVelocity, [-1000, 0, 1000], [15, 0, -15]); // 3D Tilt like a mirror

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/about', icon: User, label: 'About' },
        { path: '/projects', icon: Layers, label: 'Work' },
        { path: '/contact', icon: Mail, label: 'Contact' },
    ];

    return (
        <div className="mac-dock-container" style={{ perspective: '800px' }}>
            {/* SVG Filter for Liquid Squeeze/Distortion Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <filter id="liquid-squeeze">
                    {/* Wavy liquid distortion */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="1" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                </filter>
            </svg>

            <motion.div 
                className="mac-dock"
                style={{ 
                    y: yOffset, 
                    rotateX: rotateX,
                    transformStyle: 'preserve-3d'
                }}
            >
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link to={item.path} key={item.path} className="dock-item-wrapper">
                            <motion.div 
                                className={`dock-item interactive ${isActive ? 'active' : ''}`}
                                whileHover={{ scale: 1.4, y: -10, rotateX: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                                <item.icon strokeWidth={1.5} size={24} />
                                <div className="dock-tooltip">{item.label}</div>
                            </motion.div>
                            {isActive && <div className="dock-indicator" />}
                        </Link>
                    );
                })}

                <div className="dock-divider" />


                <div className="dock-item-wrapper" onClick={() => window.dispatchEvent(new Event('open-command-palette'))}>
                    <motion.div 
                        className="dock-item interactive"
                        whileHover={{ scale: 1.4, y: -10, rotateX: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        <Search strokeWidth={1.5} size={24} />
                        <div className="dock-tooltip">Command Palette</div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default MacDock;
