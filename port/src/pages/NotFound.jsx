import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import animation404 from '../1L11OE5B3cZ57sv3AY.webm';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="page-wrapper">
            <section className="notfound-section">
                <div className="notfound-content">

                    {/* Big glitchy 404 */}
                    <div className="notfound-num-wrap">
                        <motion.div
                            className="notfound-404"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            404
                        </motion.div>
                        <div className="notfound-404-ghost">404</div>
                    </div>

                    {/* Webm Animation */}
                    <motion.div
                        className="notfound-animation-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <video
                            src={animation404}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="notfound-video"
                        />
                    </motion.div>

                    {/* Label */}
                    <motion.div
                        className="text-style-allcaps text-color-muted"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ marginBottom: '1rem', letterSpacing: '0.2em' }}
                    >
                        Page Not Found
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        className="text-color-muted notfound-desc"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Looks like this page took a wrong turn.<br />
                        Let's get you back on track.
                    </motion.p>

                    {/* Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link to="/" className="notfound-btn">
                            <div className="clip">
                                <div className="hover-text-wrap">
                                    <span>Back to Home</span>
                                    <span className="hover-text-bottom">Back to Home</span>
                                </div>
                            </div>
                            <ArrowUpRight size={18} />
                        </Link>
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default NotFound;

