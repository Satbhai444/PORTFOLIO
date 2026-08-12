import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Server, Smartphone, Lock } from 'lucide-react';
import './WinDeckOverlay.css';

const WinDeckOverlay = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        const handleEscape = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };

        window.addEventListener('open-windeck-overlay', handleOpen);
        window.addEventListener('keydown', handleEscape);
        
        return () => {
            window.removeEventListener('open-windeck-overlay', handleOpen);
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="wdo-wrapper">
                    <motion.div 
                        className="wdo-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <motion.div 
                        className="wdo-modal"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="wdo-header">
                            <div>
                                <h2 className="wdo-title"><Cpu size={20} /> WinDeck Architecture</h2>
                                <p className="wdo-subtitle">Ultra-Low-Latency Local Control Suite</p>
                            </div>
                            <button className="wdo-close interactive" onClick={() => setIsOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="wdo-body">
                            <div className="wdo-diagram">
                                {/* Mobile Client */}
                                <div className="wdo-node wdo-client">
                                    <Smartphone size={32} />
                                    <span>Flutter App</span>
                                    <div className="wdo-node-desc">Touch UI / Commands</div>
                                </div>
                                
                                {/* Connection Line 1 */}
                                <div className="wdo-line wdo-line-1">
                                    <div className="wdo-packet"></div>
                                </div>
                                
                                {/* Server Node */}
                                <div className="wdo-node wdo-server">
                                    <Server size={32} />
                                    <span>Local Socket Server</span>
                                    <div className="wdo-node-desc">Node.js (Localhost)</div>
                                    <div className="wdo-security"><Lock size={12} /> E2E Encrypted (AES-256)</div>
                                </div>
                                
                                {/* Connection Line 2 */}
                                <div className="wdo-line wdo-line-2">
                                    <div className="wdo-packet wdo-packet-fast"></div>
                                </div>
                                
                                {/* Desktop Host */}
                                <div className="wdo-node wdo-host">
                                    <Cpu size={32} />
                                    <span>Windows OS</span>
                                    <div className="wdo-node-desc">C# / Win32 API</div>
                                </div>
                            </div>
                            
                            <div className="wdo-stats">
                                <div className="wdo-stat">
                                    <div className="wdo-stat-val">{'< 5ms'}</div>
                                    <div className="wdo-stat-label">Latency</div>
                                </div>
                                <div className="wdo-stat">
                                    <div className="wdo-stat-val">100%</div>
                                    <div className="wdo-stat-label">Local (No Cloud)</div>
                                </div>
                                <div className="wdo-stat">
                                    <div className="wdo-stat-val">60fps</div>
                                    <div className="wdo-stat-label">UI Rendering</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WinDeckOverlay;
