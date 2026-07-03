import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import './BackToHome.css';

const BackToHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';
    const cameFromChatbot = sessionStorage.getItem('chatbot_from') === 'home';

    const handleBack = () => {
        const scrollPos = sessionStorage.getItem('chatbot_scroll');
        sessionStorage.removeItem('chatbot_from');
        sessionStorage.removeItem('chatbot_scroll');
        
        navigate('/', { state: { scrollTo: scrollPos ? parseInt(scrollPos) : 0 } });
    };

    return (
        <AnimatePresence>
            {!isHome && cameFromChatbot && (
                <motion.button
                    className="back-to-home-btn"
                    onClick={handleBack}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={15} />
                    <span>Back to Home</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToHome;
