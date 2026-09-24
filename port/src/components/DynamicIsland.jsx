import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Bell, Mail, CheckCircle2, Clock, BatteryMedium, BatteryWarning, BatteryFull, Zap, Share2, Wifi, WifiOff, Terminal, GitCommit, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Glass } from "@samasante/liquid-glass";
import './DynamicIsland.css';

const liquidOptics = {
  refraction: {
    strength: 0.140,
    depth: 0.950,
    curvature: 0.500,
    dispersion: 0.200,
  },
  edge: {
    bend: 0.400,
    width: 0.070,
  },
  sheen: {
    intensity: 1.2,
    thickness: 3.5,
    specular: 1.6,
    angle: 0,
  },
  background: {
    glow: 0.100,
    frost: 1,
    brightness: 0,
  }
};

const InstagramIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="di-insta-grad" cx="30%" cy="107%" r="114%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="10%" stopColor="#fdf497" />
                <stop offset="50%" stopColor="#fd5949" />
                <stop offset="65%" stopColor="#d6249f" />
                <stop offset="100%" stopColor="#285AEB" />
            </radialGradient>
        </defs>
        <path className="insta-default" fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        <path className="insta-colored" fill="url(#di-insta-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const DynamicIsland = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [notification, setNotification] = useState(null);
    const [currentSection, setCurrentSection] = useState('');
    const [time, setTime] = useState('');
    const [battery, setBattery] = useState({ level: null, charging: false });
    const [hearts, setHearts] = useState([]);
    const [likeCount, setLikeCount] = useState(1200);

    // Global listener for dynamic island notifications
    useEffect(() => {
        const handleNotify = (e) => {
            setNotification(e.detail);
            setTimeout(() => {
                setNotification(null);
            }, 3000);
        };
        window.addEventListener('notify-island', handleNotify);
        return () => window.removeEventListener('notify-island', handleNotify);
    }, []);

    // Scroll Spy (Location Tracker) - Optimized with throttling
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const sections = ['contact', 'projects', 'about'];
                    let current = '';
                    for (const id of sections) {
                        const el = document.getElementById(id);
                        if (el) {
                            const rect = el.getBoundingClientRect();
                            if (rect.top <= window.innerHeight * 0.4) {
                                current = id;
                                break;
                            }
                        }
                    }
                    setCurrentSection(current);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        // trigger once on mount
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getSectionData = () => {
        switch(currentSection) {
            case 'about': return { text: 'About', icon: '👨‍💻' };
            case 'projects': return { text: 'Projects', icon: '🚀' };
            case 'contact': return { text: 'Contact', icon: '📬' };
            default: return null;
        }
    };
    const sectionData = getSectionData();

    // Live Time and Battery
    useEffect(() => {
        const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        updateTime();
        const timeInterval = setInterval(updateTime, 60000);

        if (navigator.getBattery) {
            navigator.getBattery().then((batt) => {
                const updateBatt = () => setBattery({ level: Math.round(batt.level * 100), charging: batt.charging });
                updateBatt();
                batt.addEventListener('levelchange', updateBatt);
                batt.addEventListener('chargingchange', updateBatt);
            }).catch(() => {});
        }

        return () => clearInterval(timeInterval);
    }, []);



    // Copy Link Action
    const handleCopyLink = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        setNotification({ message: "Link Copied!", icon: "success" });
        setIsHovered(false);
    };

    // Animation variants - use a percentage max-width or just rely on CSS
    const islandVariants = {
        idle: { 
            width: sectionData ? 140 : 100, 
            height: 32, 
            borderRadius: 16,
            transition: { type: "spring", stiffness: 400, damping: 25 }
        },
        hovered: { 
            width: Math.min(380, window.innerWidth - 32), 
            height: 200, 
            borderRadius: 32,
            transition: { type: "spring", stiffness: 400, damping: 25 }
        },
        notifying: {
            width: Math.min(280, window.innerWidth - 32),
            height: 45,
            borderRadius: 24,
            transition: { type: "spring", stiffness: 400, damping: 25 }
        }
    };

    // Keep size updated on resize
    useEffect(() => {
        const handleResize = () => {
            if (isHovered) setIsHovered(false); // reset state on resize to fix bounds
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isHovered]);

    const currentState = notification ? 'notifying' : (isHovered ? 'hovered' : 'idle');

    const formatLikes = (num) => (num / 1000).toFixed(1) + 'k';

    const handleHeartClick = (e) => {
        e.stopPropagation(); // prevent closing the island
        setLikeCount(prev => prev + 1);
        const newHeart = {
            id: Date.now() + Math.random(),
            x: (Math.random() - 0.5) * 80, // random x spread
            color: ['#ff3b30', '#ff9500', '#ffcc00', '#4cd964', '#5ac8fa', '#007aff', '#5856d6', '#ff2d55'][Math.floor(Math.random() * 8)]
        };
        
        setHearts(prev => [...prev, newHeart]);
        
        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 2000);
    };

    return (
        <div className="dynamic-island-container">
            {/* Floating Hearts Container */}
            <AnimatePresence>
                {hearts.map(heart => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 1, y: 30, x: heart.x, scale: 0.5 }}
                        animate={{ opacity: 0, y: -150, x: heart.x + (Math.random() - 0.5) * 60, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            pointerEvents: 'none',
                            zIndex: 100,
                            marginLeft: '-12px',
                            marginTop: '-12px'
                        }}
                    >
                        <Heart size={24} fill={heart.color} color={heart.color} />
                    </motion.div>
                ))}
            </AnimatePresence>

            <motion.div
                className="dynamic-island"
                variants={islandVariants}
                initial="idle"
                animate={currentState}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={() => setIsHovered(!isHovered)}
            >
                <Glass optics={liquidOptics} style={{ width: '100%', height: '100%', display: 'flex', color: '#fff' }}>
                    <AnimatePresence mode="wait">
                    {currentState === 'idle' && (
                        <motion.div 
                            key="idle"
                            className="di-content di-idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        >
                            {sectionData ? (
                                <div className="di-spy-text">
                                    <span>{sectionData.icon}</span> {sectionData.text}
                                </div>
                            ) : (
                                <div className="di-sensor"></div>
                            )}
                            <div className="di-dot"></div>
                        </motion.div>
                    )}

                    {currentState === 'hovered' && (
                        <motion.div 
                            key="hovered"
                            className="di-content di-hovered"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                        >
                            <div className="di-top-row">
                                <div className="di-profile">
                                    <img src="/profile.jpg" alt="Profile" />
                                    <div className="di-text">
                                        <span className="di-title">Darshan Satbhai</span>
                                        <span className="di-subtitle">Available for work</span>
                                    </div>
                                </div>
                                <div className="di-status-pill">
                                    <span className="di-pulse"></span>
                                    <span>Online</span>
                                </div>
                            </div>

                            <div className="di-middle-row">
                                <div className="di-widget">
                                    <Clock size={14} color="#888" />
                                    <span>{time}</span>
                                </div>
                                {battery.level !== null && (
                                    <div className="di-widget" style={{ 
                                        color: battery.charging ? '#34C759' : (battery.level <= 20 ? '#FF3B30' : '#34C759'),
                                        borderColor: battery.charging ? 'rgba(52, 199, 89, 0.2)' : (battery.level <= 20 ? 'rgba(255, 59, 48, 0.2)' : 'rgba(52, 199, 89, 0.2)')
                                    }}>
                                        {battery.charging ? (
                                            <Zap size={14} fill="#34C759" color="#34C759" />
                                        ) : (
                                            battery.level <= 20 ? <BatteryWarning size={14} color="#FF3B30" /> : <BatteryFull size={14} color="#34C759" />
                                        )}
                                        <span>{battery.level}%</span>
                                    </div>
                                )}
                            </div>

                            <div className="di-bottom-row">
                                <div className="di-btn-group">
                                    <a href="mailto:daarshannexaa@gmail.com" className="di-hire-btn">Hire Me</a>
                                    <button className="di-copy-btn" onClick={handleHeartClick} title="Send Love" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Heart size={16} fill="#ff2d55" color="#ff2d55" />
                                        <span style={{ fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace' }}>{formatLikes(likeCount)}</span>
                                    </button>
                                    <button className="di-copy-btn" onClick={handleCopyLink} title="Copy Link">
                                        <Share2 size={16} />
                                    </button>
                                </div>
                                <div className="di-actions">
                                    <a href="https://github.com/Satbhai444" target="_blank" rel="noreferrer" title="GitHub" className="social-btn github-btn"><FaGithub size={18} /></a>
                                    <a href="https://www.linkedin.com/in/darshansatbhai/" target="_blank" rel="noreferrer" title="LinkedIn" className="social-btn linkedin-btn"><FaLinkedin size={18} /></a>
                                    <a href="https://www.instagram.com/darshaan_satbhai?igsh=c3BmMHdpY2Q4M2Ez" target="_blank" rel="noreferrer" title="Instagram" className="social-btn instagram-btn"><InstagramIcon size={18} /></a>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentState === 'notifying' && notification && (
                        <motion.div 
                            key="notifying"
                            className="di-content di-notifying"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5, transition: { duration: 0.1 } }}
                        >
                            {notification.icon === 'success' ? <CheckCircle2 size={18} color="#34C759" /> : <Bell size={18} color="#007AFF" />}
                            <span>{notification.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                </Glass>
            </motion.div>
        </div>
    );
};

export default DynamicIsland;
