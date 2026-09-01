import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Compass } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-dark)' }}>
            <section className="notfound-section">
                
                <div className="notfound-content">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2000} className="interactive">
                            <div className="notfound-num-wrap">
                                <h1 className="notfound-404">404</h1>
                                <div className="notfound-404-ghost">404</div>
                            </div>
                        </Tilt>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Compass size={32} color="var(--text-muted)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-white)', marginBottom: '1rem' }}>
                            Lost in the void
                        </h2>
                        <p className="notfound-desc" style={{ color: 'var(--text-muted)' }}>
                            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
                        </p>

                        <Link to="/" className="notfound-btn interactive">
                            BACK TO HOME <ArrowUpRight size={18} />
                        </Link>
                    </motion.div>
                </div>

                {/* Background decorative elements */}
                <div className="notfound-bg-glow"></div>
            </section>
        </div>
    );
};

export default NotFound;
