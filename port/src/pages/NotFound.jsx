import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, ArrowUpRight, ShieldAlert } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    const [text, setText] = useState('');
    const fullText = "SYSTEM_FAILURE: REALITY_NOT_FOUND\n> ERROR_CODE: 404\n> INITIATING_RECOVERY_PROTOCOL...";

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 50);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="page-wrapper" style={{ backgroundColor: '#050505' }}>
            <section className="notfound-section" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}
                >
                    <ShieldAlert size={64} color="#ff3333" style={{ margin: '0 auto 2rem auto', opacity: 0.8 }} />
                    
                    <h1 style={{ 
                        fontSize: 'clamp(4rem, 15vw, 8rem)', 
                        fontWeight: 900, 
                        color: 'transparent',
                        WebkitTextStroke: '2px rgba(255, 51, 51, 0.5)',
                        margin: 0,
                        lineHeight: 1,
                        letterSpacing: '10px',
                        textShadow: '0 0 20px rgba(255, 51, 51, 0.2)'
                    }}>
                        404
                    </h1>

                    <div style={{
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,51,51,0.2)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        color: '#ff3333',
                        textAlign: 'left',
                        marginTop: '2rem',
                        minHeight: '120px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,51,51,0.5)', boxShadow: '0 0 10px red', animation: 'scanline 2s linear infinite' }} />
                        <Terminal size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                        <span style={{ whiteSpace: 'pre-line' }}>{text}<span className="cursor-blink">_</span></span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 2.5 }}
                        style={{ marginTop: '3rem' }}
                    >
                        <Link to="/" className="interactive-btn interactive" style={{ border: '1px solid rgba(255,51,51,0.3)', color: '#fff' }}>
                            REBOOT SYSTEM (HOME) <ArrowUpRight />
                        </Link>
                    </motion.div>
                </motion.div>

            </section>
        </div>
    );
};

export default NotFound;

