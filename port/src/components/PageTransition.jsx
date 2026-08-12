import React from 'react';
import { motion } from 'framer-motion';
import './PageTransition.css';

const PageTransition = ({ children, locationKey }) => {
    // The main content animation (fades out and scales down slightly)
    const contentVariants = {
        initial: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(10px)' },
        animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, y: -20, scale: 0.98, filter: 'blur(10px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
    };

    // The sliding columns for the "Awwwards" wipe effect
    const columns = 5;
    
    return (
        <>
            {/* The actual page content */}
            <motion.div
                key={`content-${locationKey}`}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ width: '100%', minHeight: '100vh' }}
            >
                {children}
            </motion.div>

            {/* The sweeping transition columns */}
            <div className="transition-overlay-container">
                {[...Array(columns)].map((_, i) => (
                    <motion.div
                        key={`col-${locationKey}-${i}`}
                        className="transition-column"
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        exit={{ scaleY: 1 }}
                        transition={{ 
                            duration: 0.6, 
                            ease: [0.22, 1, 0.36, 1],
                            delay: i * 0.05 // staggered effect
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default PageTransition;
