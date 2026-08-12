import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Download, Mail, Github, Sun, Search, Cpu, Bomb, Zap, Eye, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import './CommandPalette.css';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const lastSpaceTime = useRef(0);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === ' ' && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

            if (e.key === ' ') {
                const now = Date.now();
                if (now - lastSpaceTime.current < 300) {
                    e.preventDefault();
                    setIsOpen(true);
                    setErrorMsg('');
                    setSearch('');
                    lastSpaceTime.current = 0;
                } else {
                    lastSpaceTime.current = now;
                }
            }
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };

        const handleOpenEvent = () => {
            setIsOpen(true);
            setErrorMsg('');
            setSearch('');
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-command-palette', handleOpenEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-command-palette', handleOpenEvent);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    const commands = [
        {
            id: 'download_resume',
            title: 'Download Resume',
            icon: <Download size={16} />,
            action: () => {
                const link = document.createElement('a');
                link.href = '/Darshan_Fresher_Resume.pdf';
                link.download = 'Darshan_Satbhai_Resume.pdf';
                link.click();
                setIsOpen(false);
            }
        },
        {
            id: 'hire_me',
            title: 'Hire Me / Contact',
            icon: <Mail size={16} />,
            action: () => {
                navigate('/contact');
                setIsOpen(false);
            }
        },
        {
            id: 'github',
            title: 'View GitHub',
            icon: <Github size={16} />,
            action: () => {
                window.open('https://github.com/satbhai444', '_blank');
                setIsOpen(false);
            }
        },
        {
            id: 'windeck_architecture',
            title: 'View WinDeck Architecture',
            icon: <Cpu size={16} />,
            action: () => {
                setIsOpen(false);
                window.dispatchEvent(new Event('open-windeck-overlay'));
            }
        },
        {
            id: 'self_destruct',
            title: 'Initiate Self-Destruct',
            icon: <Bomb size={16} color="#ff3b30" />,
            action: () => {
                setIsOpen(false);
                window.dispatchEvent(new Event('trigger-self-destruct'));
            }
        },
        {
            id: 'matrix_protocol',
            title: 'Matrix Protocol',
            icon: <Zap size={16} color="#00ff41" />,
            action: () => {
                setIsOpen(false);
                window.dispatchEvent(new Event('trigger-matrix'));
            }
        },
        {
            id: 'invert_reality',
            title: 'Invert Reality',
            icon: <Eye size={16} />,
            action: () => {
                setIsOpen(false);
                document.body.classList.toggle('invert-reality');
            }
        },
        {
            id: 'deploy_confetti',
            title: 'Deploy Confetti',
            icon: <PartyPopper size={16} color="#ffbd2e" />,
            action: () => {
                setIsOpen(false);
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#ffffff', '#888888', '#333333']
                });
            }
        },
        {
            id: 'light_mode',
            title: 'Toggle Light Mode',
            icon: <Sun size={16} />,
            action: () => {
                setErrorMsg('Error: Engineers only work in the dark.');
                setTimeout(() => {
                    setIsOpen(false);
                    setErrorMsg('');
                }, 3000);
            }
        }
    ];

    const filteredCommands = commands.filter(cmd => 
        cmd.title.toLowerCase().includes(search.toLowerCase()) || 
        cmd.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="cp-overlay" onClick={() => setIsOpen(false)}>
                    <motion.div 
                        className="cp-modal"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="cp-search-header">
                            <div className="cp-apple-buttons">
                                <button className="apple-btn close" onClick={() => setIsOpen(false)} title="Close"></button>
                                <button className="apple-btn minimize" onClick={() => setIsOpen(false)} title="Minimize"></button>
                                <button className="apple-btn expand" onClick={() => setIsOpen(false)} title="Expand"></button>
                            </div>
                            <Search size={20} className="cp-search-icon" style={{ marginLeft: '12px' }} />
                            <input 
                                ref={inputRef}
                                type="text"
                                className="cp-input"
                                placeholder="Type a command or search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="cp-badge">ESC</div>
                        </div>

                        {errorMsg && (
                            <div className="cp-error">
                                <span className="cp-error-text">{errorMsg}</span>
                            </div>
                        )}

                        <div className="cp-list">
                            <div className="cp-list-label">Suggestions</div>
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((cmd) => (
                                    <button 
                                        key={cmd.id} 
                                        className="cp-item interactive"
                                        onClick={cmd.action}
                                    >
                                        <div className="cp-item-icon">{cmd.icon}</div>
                                        <span>{cmd.title}</span>
                                    </button>
                                ))
                            ) : (
                                <div className="cp-empty">No commands found.</div>
                            )}
                        </div>
                        
                        <div className="cp-footer">
                            <Command size={14} /> <span>Command Palette</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
