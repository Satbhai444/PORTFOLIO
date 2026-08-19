import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Grip, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => { setIsOpen(false); }, [location]);

    const menuLinks = [
        { label: 'About',   to: '/about' },
        { label: 'Work',    to: '/projects' },
        { label: 'Contact', to: '/contact' },
    ];

    return (
        <>
            <nav className={`nb ${scrolled ? 'nb--scrolled' : ''}`}>
                <div className="nb__inner">
                    <Link to="/" className="nb__brand interactive">
                        <img src="/signature.png" alt="Darshan Satbhai" style={{ height: '36px', filter: 'invert(1)', objectFit: 'contain' }} />
                    </Link>

                    <div className="nb__status hide-mobile">
                        <span className="nb__status-dot" />
                        <span className="nb__status-text">Available for work</span>
                    </div>

                    <div className="nb__right">
                        {/* Terminal Trigger */}
                        <button 
                            className="cp-trigger-btn interactive" 
                            onClick={() => window.dispatchEvent(new Event('open-terminal'))}
                            aria-label="Open Developer Terminal"
                            style={{ marginRight: '8px', padding: '0 12px' }}
                        >
                            <span>&gt;_</span>
                        </button>
                        
                        {/* Command Palette Trigger */}
                        <button 
                            className="cp-trigger-btn interactive" 
                            onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                            aria-label="Open Command Palette"
                        >
                            <Search size={14} />
                            <span className="hide-mobile">Space x2</span>
                        </button>
                        <Link to="/contact" className="nb__cta hide-mobile interactive">
                            <div className="clip">
                                <div className="hover-text-wrap">
                                    <span>CONTACT ME</span>
                                    <span className="hover-text-bottom">CONTACT ME</span>
                                </div>
                            </div>
                        </Link>
                        <button
                            className={`nb__toggle interactive ${isOpen ? 'is-open' : ''}`}
                            onClick={() => setIsOpen(v => !v)}
                            aria-label="Toggle menu"
                            style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', color: isOpen ? '#000' : '#fff' }}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={26} strokeWidth={1.5} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Grip size={26} strokeWidth={1.5} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Full-width dropdown overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="nb__overlay"
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Horizontal 3-column grid */}
                        <div className="nb__menu-grid">
                            {menuLinks.map((lnk, i) => (
                                <motion.div
                                    key={lnk.label}
                                    className="nb__col-wrap"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        to={lnk.to}
                                        className={`nb__menu-col interactive ${location.pathname === lnk.to ? ' is-active' : ''}`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="nb__col-preview" />
                                        <div className="nb__col-footer">
                                            <div className="nb__col-meta">
                                                <span className="nb__menu-num">0{i + 1}</span>
                                                <span className="nb__col-label">{lnk.label}</span>
                                            </div>
                                            <ArrowUpRight size={22} className="nb__menu-arrow" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        {/* Footer row */}
                        <div className="nb__overlay-footer">
                            <a href="/Darshan_Fresher_Resume.pdf" download className="nb__resume-link interactive">
                                Download Resume <ArrowUpRight size={14} />
                            </a>
                            <div className="nb__socials">
                                <a href="https://github.com/satbhai444" target="_blank" rel="noreferrer" className="interactive">GitHub</a>
                                <a href="https://www.linkedin.com/in/darshan-satbhai-212600423?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="interactive">LinkedIn</a>
                                <a href="https://www.instagram.com/darshaan_satbhai?igsh=c3BmMHdpY2Q4M2Ez" target="_blank" rel="noreferrer" className="interactive">Instagram</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
