import React, { useEffect, useRef, useState } from 'react';
import './MatrixOverlay.css';

const MatrixOverlay = () => {
    const [isActive, setIsActive] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const handleTrigger = () => setIsActive(true);
        window.addEventListener('trigger-matrix', handleTrigger);
        return () => window.removeEventListener('trigger-matrix', handleTrigger);
    }, []);

    useEffect(() => {
        if (!isActive || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array.from({ length: columns }).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        
        // Auto stop after 10 seconds
        const timeout = setTimeout(() => {
            setIsActive(false);
        }, 10000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="matrix-overlay" onClick={() => setIsActive(false)}>
            <canvas ref={canvasRef} />
            <div className="matrix-text">SYSTEM OVERRIDE</div>
        </div>
    );
};

export default MatrixOverlay;
