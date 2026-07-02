import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import './CTA.css';

const CTA = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === '/contact') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/contact', { state: { focus: true, prefill: true } });
            window.scrollTo(0, 0);
        }
    };

    return (
        <section className="cta-section">
            <div className="cta-container liquid-glass">
                <Reveal delay={0.2} width="100%">
                    <div className="cta-content">
                        <div className="cta-icon-wrap">
                            <Sparkles size={40} className="sparkle-icon" />
                        </div>
                        <h2 className="cta-title">Have a <span className="gradient-text">Project</span> in Mind?</h2>
                        <p className="cta-desc">
                            Let's collaborate to build something extraordinary. I'm available for freelance
                            opportunities and meaningful collaborations.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="primary-btn-liquid"
                            onClick={handleClick}
                        >
                            Start a Conversation <ArrowRight size={18} />
                        </motion.button>
                    </div>
                </Reveal>
                <div className="cta-bg-glow" />
            </div>
        </section>
    );
};

export default CTA;
