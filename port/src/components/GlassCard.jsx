import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className={`liquid-glass ${className}`}
            style={{
                padding: '24px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Shine Effect Overlay */}
            <div
                className="card-shine"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.05) 100%)',
                    pointerEvents: 'none'
                }}
            />
            {children}
        </motion.div>
    );
};

export default GlassCard;
