import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const Marquee = ({ baseVelocity = -5, reverse = false, skills = [] }) => {
    const skillsRef = useRef(skills.length > 0 ? skills : [
        "React", "JavaScript", "TypeScript", "Node.js", "Firebase",
        "Framer Motion", "CSS3", "HTML5", "Vite", "Git",
        "Web Development", "Frontend", "Backend", "Database", "API"
    ]);

    // Duplicate skills to ensure smooth loop
    const displaySkills = skillsRef.current.length > 0
        ? [...skillsRef.current, ...skillsRef.current, ...skillsRef.current, ...skillsRef.current]
        : [];

    const x = useMotionValue(0);
    const [animationDuration, setAnimationDuration] = useState(30);

    useEffect(() => {
        const itemWidth = 120; // Approximate width of one marquee item
        const totalItems = displaySkills.length;
        const duration = Math.max(20, (totalItems * itemWidth) / 20);
        setAnimationDuration(duration);

        const controls = animate(x, reverse ? "-50%" : "0%", {
            duration: duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
        });

        return () => controls.stop();
    }, [skills, reverse, displaySkills.length, x]);

    // Transforms animate between different positions for continuous loop
    const xTransform = useTransform(x, [0, 100],
        reverse ? ["0%", "-50%"] : ["-50%", "0%"]
    );

    return (
        <div className="marquee-wrapper">
            <div className="marquee-container">
                <motion.div
                    className="marquee-content"
                    style={{ x: xTransform }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {displaySkills.map((skill, i) => (
                        <div key={i} className="marquee-item">
                            <div className="item-content">
                                <span className="marquee-text">{skill}</span>
                                <div className="marquee-dot" />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Marquee;
