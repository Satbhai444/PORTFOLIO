import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { ArrowUpRight } from 'lucide-react';
import './Footer.css';

const InstagramIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="insta-grad" cx="30%" cy="107%" r="114%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="10%" stopColor="#fdf497" />
                <stop offset="50%" stopColor="#fd5949" />
                <stop offset="65%" stopColor="#d6249f" />
                <stop offset="100%" stopColor="#285AEB" />
            </radialGradient>
        </defs>
        <path className="insta-default" fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        <path className="insta-colored" fill="url(#insta-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="wf-footer">
            <div className="wf-footer-inner">

                {/* Big CTA heading */}
                <div className="wf-footer-cta" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2 
                        className="cta-huge-title"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        LET'S TALK
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link to="/contact" className="interactive-btn-large interactive" style={{ display: 'inline-block', marginTop: '2rem' }}>
                            START A PROJECT
                        </Link>
                    </motion.div>
                </div>

                <div className="wf-footer-divider" />

                {/* Middle row: nav links */}
                <div className="wf-footer-mid">
                    <div className="wf-footer-col">
                        <span className="wf-footer-label">NAVIGATION</span>
                        <nav className="wf-footer-nav-col">
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/projects">Projects</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>
                    </div>
                    <div className="wf-footer-col">
                        <span className="wf-footer-label">SOCIALS</span>
                        <div className="wf-footer-nav-col">
                            <a href="https://github.com/satbhai444" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://www.linkedin.com/in/darshan-satbhai-212600423?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://www.instagram.com/darshaan_satbhai?igsh=c3BmMHdpY2Q4M2Ez" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                    <div className="wf-footer-col">
                        <span className="wf-footer-label">CONTACT</span>
                        <div className="wf-footer-nav-col">
                            <a href="mailto:darshansatbhai38@gmail.com">Email Me</a>
                            <a href="https://www.linkedin.com/in/darshan-satbhai-212600423?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LinkedIn Message</a>
                            <a href="https://www.instagram.com/darshaan_satbhai?igsh=c3BmMHdpY2Q4M2Ez" target="_blank" rel="noopener noreferrer">Instagram DM</a>
                        </div>
                    </div>
                </div>

                <div className="wf-footer-divider" />

                {/* Bottom row: copyright + social icons */}
                <div className="wf-footer-bottom">
                    <p className="wf-footer-copy">© {new Date().getFullYear()} DARSHAN SATBHAI. ALL RIGHTS RESERVED.</p>
                    <div className="wf-footer-socials">
                        <a href="https://github.com/satbhai444" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="github-hover"><FaGithub size={18} /></a>
                        <a href="https://www.linkedin.com/in/darshan-satbhai-212600423?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="linkedin-hover"><FaLinkedin size={18} /></a>
                        <a href="https://www.instagram.com/darshaan_satbhai?igsh=c3BmMHdpY2Q4M2Ez" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram-hover"><InstagramIcon size={18} /></a>
                        <a href="mailto:darshansatbhai38@gmail.com" aria-label="Email" className="mail-hover"><FaEnvelope size={18} /></a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
