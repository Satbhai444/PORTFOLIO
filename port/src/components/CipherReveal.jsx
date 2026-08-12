import React, { useState, useEffect, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

const CipherReveal = ({ text, className = '' }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isHovering) {
            setDisplayText(text);
            return;
        }

        let iteration = 0;
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(prev => {
                return text
                    .split('')
                    .map((char, index) => {
                        // Keep spaces intact
                        if (char === ' ') return ' ';
                        
                        // Once we pass the letter's index, show the actual letter
                        if (index < iteration) {
                            return text[index];
                        }

                        // Otherwise show a random character
                        return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
                    })
                    .join('');
            });

            // Adjust speed of reveal here (fraction adds delay to complete reveal)
            iteration += 1 / 3;

            if (iteration >= text.length) {
                clearInterval(intervalRef.current);
            }
        }, 30);

        return () => clearInterval(intervalRef.current);
    }, [isHovering, text]);

    return (
        <span 
            className={className} 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ display: 'inline-block' }}
        >
            {displayText}
        </span>
    );
};

export default CipherReveal;
