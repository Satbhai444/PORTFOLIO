import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
                    <Link to="/" className="nb__brand">PORTFOLIO</Link>

                    <div className="nb__right">
                        <a href="tel:+916351015778" className="nb__cta hide-mobile">
                            <div className="clip">
                                <div className="hover-text-wrap">
                                    <span>SCHEDULE A CALL</span>
                                    <span className="hover-text-bottom">SCHEDULE A CALL</span>
                                </div>
                            </div>
                        </a>
                        <button
                            className={`nb__toggle ${isOpen ? 'is-open' : ''}`}
                            onClick={() => setIsOpen(v => !v)}
                            aria-label="Toggle menu"
                        >
                            <span className="nb__bar" />
                            <span className="nb__bar" />
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
                                        className={`nb__menu-col${location.pathname === lnk.to ? ' is-active' : ''}`}
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
                            <a href="/Darshan_Fresher_Resume.pdf" download className="nb__resume-link">
                                Download Resume <ArrowUpRight size={14} />
                            </a>
                            <div className="nb__socials">
                                <a href="https://github.com/satbhai444" target="_blank" rel="noreferrer">GitHub</a>
                                <a href="https://linkedin.com/in/darshan-satbhai" target="_blank" rel="noreferrer">LinkedIn</a>
                                <a href="https://www.instagram.com/darshannn.0801" target="_blank" rel="noreferrer">Instagram</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
