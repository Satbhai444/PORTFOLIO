import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import './KonamiGame.css';

const KonamiGame = () => {
    const [isActive, setIsActive] = useState(false);
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const handleTrigger = () => setIsActive(true);
        window.addEventListener('trigger-konami', handleTrigger);
        return () => window.removeEventListener('trigger-konami', handleTrigger);
    }, []);

    useEffect(() => {
        if (!isActive || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const gridSize = 20;
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 1;
        let dy = 0;
        let gameLoop;
        let speed = 100;

        const draw = () => {
            // Background
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            snake.unshift(head);

            // Check food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                food = {
                    x: Math.floor(Math.random() * (canvas.width / gridSize)),
                    y: Math.floor(Math.random() * (canvas.height / gridSize))
                };
            } else {
                snake.pop();
            }

            // Check wall collision
            if (
                head.x < 0 || 
                head.x >= canvas.width / gridSize || 
                head.y < 0 || 
                head.y >= canvas.height / gridSize ||
                snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
            ) {
                // Game Over reset
                snake = [{ x: 10, y: 10 }];
                dx = 1; dy = 0;
                setScore(0);
            }

            // Draw food
            ctx.fillStyle = '#ff5f56';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

            // Draw snake
            ctx.fillStyle = '#ffffff';
            snake.forEach((segment, i) => {
                if (i === 0) ctx.fillStyle = '#27c93f';
                else ctx.fillStyle = '#ffffff';
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });
        };

        const handleDirection = (dir) => {
            if (dir === 'UP' && dy === 0) { dx = 0; dy = -1; }
            if (dir === 'DOWN' && dy === 0) { dx = 0; dy = 1; }
            if (dir === 'LEFT' && dx === 0) { dx = -1; dy = 0; }
            if (dir === 'RIGHT' && dx === 0) { dx = 1; dy = 0; }
        };

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') handleDirection('UP');
            if (e.key === 'ArrowDown') handleDirection('DOWN');
            if (e.key === 'ArrowLeft') handleDirection('LEFT');
            if (e.key === 'ArrowRight') handleDirection('RIGHT');
            
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
        };

        const handleCustomDir = (e) => handleDirection(e.detail);

        // Touch Swipe Logic
        let touchStartX = 0;
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchEnd = (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Horizontal Swipe
                if (diffX > 30) handleDirection('LEFT');
                else if (diffX < -30) handleDirection('RIGHT');
            } else {
                // Vertical Swipe
                if (diffY > 30) handleDirection('UP');
                else if (diffY < -30) handleDirection('DOWN');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('snake-dir', handleCustomDir);
        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchend', handleTouchEnd);
        
        gameLoop = setInterval(draw, speed);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('snake-dir', handleCustomDir);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
            clearInterval(gameLoop);
        };
    }, [isActive]);

    const handleDpad = (dir) => {
        window.dispatchEvent(new CustomEvent('snake-dir', { detail: dir }));
    };

    return (
        <AnimatePresence>
            {isActive && (
                <div className="konami-wrapper">
                    <motion.div 
                        className="konami-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    
                    <motion.div 
                        className="konami-modal"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    >
                        <div className="konami-header">
                            <span className="konami-title">ARCADE // SNAKE</span>
                            <span className="konami-score">SCORE: {score}</span>
                            <button className="konami-close" onClick={() => setIsActive(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="konami-game-container">
                            <canvas 
                                ref={canvasRef} 
                                width={600} 
                                height={400} 
                                className="konami-canvas"
                            />
                        </div>
                        
                        {/* On-Screen D-Pad (Visible on Mobile only) */}
                        <div className="konami-dpad">
                            <div className="dpad-row">
                                <button onTouchStart={() => handleDpad('UP')} onClick={() => handleDpad('UP')}><ArrowUp /></button>
                            </div>
                            <div className="dpad-row">
                                <button onTouchStart={() => handleDpad('LEFT')} onClick={() => handleDpad('LEFT')}><ArrowLeft /></button>
                                <button onTouchStart={() => handleDpad('DOWN')} onClick={() => handleDpad('DOWN')}><ArrowDown /></button>
                                <button onTouchStart={() => handleDpad('RIGHT')} onClick={() => handleDpad('RIGHT')}><ArrowRight /></button>
                            </div>
                        </div>

                        <div className="konami-instructions">
                            Swipe, use D-Pad, or Arrow Keys
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default KonamiGame;
