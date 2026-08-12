import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ParallaxBackground.css';

const ParallaxBackground = ({ text1 = "INNOVATE", text2 = "ENGINEER", text3 = "BUILD" }) => {
    // We use the global window scroll for the parallax effect
    const { scrollY } = useScroll();

    // Map the scroll pixel values to Y translation values.
    // Different multiplier speeds create the 3D parallax illusion.
    const y1 = useTransform(scrollY, [0, 3000], [0, 800]); // Moves down slowly
    const y2 = useTransform(scrollY, [0, 3000], [0, -500]); // Moves up faster
    const y3 = useTransform(scrollY, [0, 3000], [0, 1000]); // Moves down fast

    return (
        <div className="parallax-bg-container hide-mobile">
            <motion.div className="parallax-text p-top" style={{ y: y1 }}>
                {text1}
            </motion.div>
            
            <motion.div className="parallax-text p-mid" style={{ y: y2 }}>
                {text2}
            </motion.div>
            
            <motion.div className="parallax-text p-bot" style={{ y: y3 }}>
                {text3}
            </motion.div>
        </div>
    );
};

export default ParallaxBackground;
