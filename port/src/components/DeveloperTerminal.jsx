import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DeveloperTerminal.css';

const DeveloperTerminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to DarshanOS v1.0.0' },
        { type: 'output', text: 'Type "help" to see available commands.' },
    ]);
    const endRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        };
        const handleKeydown = (e) => {
            // Open terminal on Ctrl+` (backtick) or standard Event
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        window.addEventListener('open-terminal', handleOpen);
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('open-terminal', handleOpen);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isOpen]);

    const handleCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        let outputText = '';
        let outputClass = '';

        switch (trimmed) {
            case 'help':
                outputText = `Available commands:
  whoami    - Display bio
  skills    - List technology stack
  projects  - Show active projects
  contact   - Display contact info
  clear     - Clear terminal history
  sudo      - ???
  exit      - Close terminal`;
                break;
            case 'whoami':
                outputText = 'Darshan Satbhai\nCreative Developer, Prompt Engineer, and AI Specialist building things at 10x speed.';
                break;
            case 'skills':
                outputText = `Languages: JavaScript, Dart, Python, C#
Frontend:  React, Flutter, Tailwind, Framer Motion
Backend:   Node.js, Firebase, Supabase
AI/Tools:  Gemini API, OpenAI, Prompt Engineering, Git`;
                break;
            case 'projects':
                outputText = `1. WinDeck (PC Control Suite)
2. AI Chatbot Assistant (Coming Soon)
3. E-Commerce Suite (In Progress)`;
                break;
            case 'contact':
                outputText = `Email: darshansatbhai38@gmail.com
GitHub: github.com/satbhai444
LinkedIn: linkedin.com/in/darshan-satbhai-212600423`;
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                setIsOpen(false);
                return;
            case 'sudo':
            case 'sudo rm -rf /':
                outputText = 'Nice try. This incident will be reported to Darshan.';
                outputClass = 'error';
                break;
            case '':
                return;
            default:
                outputText = `Command not found: ${trimmed}. Type "help" for a list of commands.`;
                outputClass = 'error';
        }

        setHistory(prev => [
            ...prev,
            { type: 'command', text: cmd },
            { type: 'output', text: outputText, className: outputClass }
        ]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                className="dev-terminal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                    if (e.target.className === 'dev-terminal-overlay') setIsOpen(false);
                }}
            >
                <motion.div 
                    className="dev-terminal-container"
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                >
                    <div className="dev-terminal-header">
                        <div className="dev-terminal-controls">
                            <button className="term-btn close" onClick={() => setIsOpen(false)} />
                            <button className="term-btn min" />
                            <button className="term-btn max" />
                        </div>
                        <div className="dev-terminal-title">darshan@portfolio:~</div>
                        <div style={{ width: '44px' }}></div> {/* Spacer for centering */}
                    </div>

                    <div className="dev-terminal-body" onClick={() => inputRef.current?.focus()}>
                        {history.map((line, i) => (
                            <div key={i} className={`term-line ${line.type === 'command' ? 'term-command-line' : ''}`}>
                                {line.type === 'command' ? (
                                    <>
                                        <span className="term-prompt">darshan@portfolio:~$</span>
                                        <span className="term-command">{line.text}</span>
                                    </>
                                ) : (
                                    <div className={`term-output ${line.className || ''}`}>{line.text}</div>
                                )}
                            </div>
                        ))}
                        
                        <div className="term-input-line">
                            <span className="term-prompt">darshan@portfolio:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="term-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                spellCheck="false"
                                autoComplete="off"
                                autoFocus
                            />
                        </div>
                        <div ref={endRef} />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DeveloperTerminal;
