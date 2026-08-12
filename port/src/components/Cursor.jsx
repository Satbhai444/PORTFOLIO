import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
    const [hovering, setHovering] = useState(false);
    
    // Smooth motion values for the cursor
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Spring config for a magnetic, liquid feel
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            // Offset by half the cursor size (assume base size is 20px)
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setHovering(true);
            }
        };

        const handleMouseOut = () => {
            setHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    return (
        <motion.div
            className="custom-cursor"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            animate={{
                scale: hovering ? 2.5 : 1,
                backgroundColor: hovering ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 1)',
                border: hovering ? '1px solid rgba(255, 255, 255, 0.5)' : '0px solid rgba(255, 255, 255, 0)',
                backdropFilter: hovering ? 'blur(4px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.2 }}
        />
    );
};

export default Cursor;
