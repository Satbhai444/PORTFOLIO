import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, y = 50, duration = 0.6 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: duration, delay: delay, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
