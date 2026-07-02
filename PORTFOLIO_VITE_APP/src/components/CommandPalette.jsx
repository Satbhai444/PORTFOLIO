import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Command, Home, User, Briefcase, Mail, Download, Github } from 'lucide-react';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const commands = [
        { name: 'Go to Home', icon: <Home size={18} />, action: () => navigate('/') },
        { name: 'About Me', icon: <User size={18} />, action: () => navigate('/about') },
        { name: 'View Projects', icon: <Briefcase size={18} />, action: () => navigate('/projects') },
        { name: 'Contact Me', icon: <Mail size={18} />, action: () => navigate('/contact') },
        { name: 'Download Resume', icon: <Download size={18} />, action: () => window.open('/Darshan_Fresher_Resume.pdf') },
        { name: 'GitHub Profile', icon: <Github size={18} />, action: () => window.open('https://github.com/satbhai444') },
    ];

    const filteredCommands = commands.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="cmd-palette-overlay" onClick={() => setIsOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="cmd-palette liquid-glass"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="cmd-input-wrapper">
                            <Search size={20} className="cmd-icon" />
                            <input
                                type="text"
                                placeholder="Type a command or search..."
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="cmd-shortcut">ESC</div>
                        </div>

                        <div className="cmd-list">
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((cmd, i) => (
                                    <div
                                        key={i}
                                        className="cmd-item"
                                        onClick={() => {
                                            cmd.action();
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="cmd-item-left">
                                            {cmd.icon}
                                            <span>{cmd.name}</span>
                                        </div>
                                        <Command size={14} className="cmd-meta" />
                                    </div>
                                ))
                            ) : (
                                <div className="cmd-no-results">No results found for "{query}"</div>
                            )}
                        </div>
                    </motion.div>

                    <style>{`
                        .cmd-palette-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            background: rgba(0, 0, 0, 0.4);
                            backdrop-filter: blur(8px);
                            z-index: 10000;
                            display: flex;
                            align-items: flex-start;
                            justify-content: center;
                            padding-top: 15vh;
                        }
                        .cmd-palette {
                            width: 100%;
                            max-width: 600px;
                            border: 1px solid rgba(255, 255, 255, 0.1) !important;
                            border-radius: 20px !important;
                            overflow: hidden;
                            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                        }
                        .cmd-input-wrapper {
                            display: flex;
                            align-items: center;
                            padding: 20px;
                            gap: 15px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                        }
                        .cmd-input-wrapper input {
                            background: transparent;
                            border: none;
                            color: white;
                            font-size: 1.1rem;
                            width: 100%;
                            outline: none;
                        }
                        .cmd-shortcut {
                            background: rgba(255, 255, 255, 0.1);
                            padding: 4px 8px;
                            border-radius: 6px;
                            font-size: 0.7rem;
                            font-weight: 700;
                        }
                        .cmd-list {
                            padding: 10px;
                            max-height: 400px;
                            overflow-y: auto;
                        }
                        .cmd-item {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 12px 15px;
                            border-radius: 12px;
                            cursor: pointer;
                            transition: all 0.2s ease;
                        }
                        .cmd-item:hover {
                            background: var(--accent-color);
                            color: white;
                        }
                        .cmd-item-left {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                        }
                        .cmd-meta {
                            opacity: 0.5;
                        }
                        .cmd-no-results {
                            padding: 20px;
                            text-align: center;
                            color: var(--text-secondary);
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
