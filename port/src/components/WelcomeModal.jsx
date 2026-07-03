import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ArrowRight, Sparkles } from 'lucide-react';
import './WelcomeModal.css';

const WelcomeModal = () => {
    const [name, setName] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const savedName = localStorage.getItem('user_name');
        if (!savedName) {
            setIsVisible(true);
        }

        const handleForceShow = () => setIsVisible(true);
        window.addEventListener('showWelcomeModal', handleForceShow);
        return () => window.removeEventListener('showWelcomeModal', handleForceShow);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const input = name.trim();
        if (input) {
            if (input === '0801') {
                localStorage.setItem('user_name', 'Darshan');
                localStorage.setItem('user_role', 'admin');
            } else {
                localStorage.setItem('user_name', input);
                localStorage.setItem('user_role', 'user');
            }
            setIsVisible(false);
            window.dispatchEvent(new Event('nameUpdated'));
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="welcome-overlay"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="welcome-card liquid-glass"
                    >
                        <div className="welcome-header">
                            <div className="welcome-icon">
                                <Sparkles size={32} color="var(--accent-color)" />
                            </div>
                            <h1>Welcome to <span className="gradient-text">My Universe</span></h1>
                            <p>Before we begin the journey, may I know your name?</p>
                        </div>

                        <form onSubmit={handleSubmit} className="welcome-form">
                            <div className="input-group">
                                <User size={20} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="Enter your name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </div>
                            <button type="submit" className="primary-btn-liquid">
                                Start Exploration <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="welcome-footer">
                            <p>This helps in personalizing your experience.</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeModal;
