import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './AIGenerateReveal.css';

const AIGenerateReveal = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });
    const [isGenerated, setIsGenerated] = useState(false);

    // After animation finishes, we can remove the skeleton overlay completely
    const handleAnimationComplete = () => {
        setIsGenerated(true);
    };

    return (
        <div ref={ref} className={`ai-reveal-wrapper ${className}`}>
            
            {/* The actual content that fades in */}
            <motion.div
                style={{ height: '100%' }}
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={inView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                transition={{ duration: 0.8, delay: delay + 0.5, ease: 'easeOut' }}
            >
                {children}
            </motion.div>

            {/* AI Scanning Skeleton Overlay */}
            {!isGenerated && (
                <motion.div
                    className="ai-scanner-overlay"
                    initial={{ opacity: 1 }}
                    animate={inView ? { opacity: 0 } : {}}
                    transition={{ duration: 0.4, delay: delay + 0.8 }}
                    onAnimationComplete={handleAnimationComplete}
                >
                    {/* The scanning line */}
                    {inView && (
                        <motion.div 
                            className="ai-scan-line"
                            initial={{ top: '0%' }}
                            animate={{ top: '100%' }}
                            transition={{ duration: 0.7, delay: delay, ease: 'linear' }}
                        />
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default AIGenerateReveal;
