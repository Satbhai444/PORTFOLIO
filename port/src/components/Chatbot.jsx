import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Rocket, FileText, Phone, User, Smile, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Chatbot.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

/* ═══════ API SETUP ═══════ */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

/* ═══════ RESPONSES ═══════ */
const DEV_JOKES = [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "I would tell you a UDP joke, but you might not get it.",
    "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings.",
    "!false — It's funny because it's true. 😄",
];

const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return "Hey there night owl 🦉";
    if (hour < 12) return "Good morning ☀️";
    if (hour < 18) return "Good afternoon 🌤️";
    return "Good evening 🌙";
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const isMobile = () => window.innerWidth <= 768;

const SUGGESTIONS = [
    { icon: <Rocket size={14} />, label: "Show me your projects", cmd: "projects" },
    { icon: <FileText size={14} />, label: "Download resume", cmd: "resume" },
    { icon: <Phone size={14} />, label: "Get in touch", cmd: "contact" },
    { icon: <User size={14} />, label: "Tell me about Darshan", cmd: "about" },
    { icon: <Smile size={14} />, label: "Tell me a dev joke", cmd: "joke" },
    { icon: <Sparkles size={14} />, label: "Surprise me!", cmd: "party" },
];

/* ═══════ COMPONENT ═══════ */
const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [userName, setUserName] = useState(() => localStorage.getItem('chatbot_user') || null);
    const [awaitingName, setAwaitingName] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [mobile, setMobile] = useState(isMobile);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setMobile(isMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (mobile) return;
        const timer = setTimeout(() => setShowModel(true), 4000);
        return () => clearTimeout(timer);
    }, [mobile]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    }, [isOpen]);

    const addBotMessage = useCallback((text, delay = 1000) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { text, sender: 'bot' }]);
        }, delay);
    }, []);

    const handleNavigate = useCallback((path, label) => {
        sessionStorage.setItem('chatbot_scroll', window.scrollY.toString());
        sessionStorage.setItem('chatbot_from', 'home');
        addBotMessage(`Taking you to ${label}! 🚀`, 800);
        setTimeout(() => navigate(path), 1800);
    }, [navigate, addBotMessage]);

    const handleAIResponse = async (prompt) => {
        if (!genAI) {
            addBotMessage("I'm sorry, my AI brain is currently offline (API Key missing). 🤔");
            return;
        }
        setIsTyping(true);
        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                systemInstruction: `You are a highly capable AI assistant powered by Gemini. You are currently integrated into Darshan Satbhai's portfolio website. Darshan is a highly skilled web developer.
                You can answer ANY question the user asks, just like the normal Gemini model (coding, general knowledge, math, creative writing, etc.). Do not restrict yourself to only portfolio topics. Provide detailed and helpful answers for anything the user asks.
                If asked about Darshan, be positive. 
                The user talking to you is named ${userName || 'a visitor'}. Use emojis occasionally to keep the chat friendly.`
            });
            
            const chat = model.startChat({
                history: messages
                    .filter(m => !m.text.includes('Taking you to') && !m.text.includes('Try the suggestions'))
                    .map(m => ({
                        role: m.sender === 'user' ? 'user' : 'model',
                        parts: [{ text: m.text }]
                    })),
                generationConfig: {
                    maxOutputTokens: 2048,
                }
            });

            const result = await chat.sendMessage(prompt);
            const responseText = result.response.text();
            
            setIsTyping(false);
            setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
        } catch (error) {
            console.error("Gemini API Error:", error);
            setIsTyping(false);
            addBotMessage("Oops, my AI brain had a little glitch! Try again later. 😅");
        }
    };

    const processMessage = useCallback((rawText) => {
        const text = rawText.toLowerCase().trim();
        if (!text) return;
        setMessages(prev => [...prev, { text: rawText, sender: 'user' }]);

        if (awaitingName) {
            const name = rawText.trim();
            setUserName(name);
            localStorage.setItem('chatbot_user', name);
            setAwaitingName(false);
            addBotMessage(`Nice to meet you, ${name}! 🎉 Try the suggestions below or ask me anything.`);
            return;
        }
        
        // Navigation Commands
        if (text.includes('project') || text.includes('work') || text.includes('portfolio')) { handleNavigate('/projects', 'Projects'); return; }
        if (text.includes('contact') || text.includes('email') || text.includes('hire') || text.includes('call')) { handleNavigate('/contact', 'Contact'); return; }
        if (text.includes('about') || text.includes('who is darshan') || text.includes('skill')) { handleNavigate('/about', 'About'); return; }
        
        // Action Commands
        if (text.includes('resume') || text.includes('cv') || text.includes('download')) {
            addBotMessage("Downloading Resume... 📄");
            setTimeout(() => { const l = document.createElement('a'); l.href = '/Darshan_Fresher_Resume.pdf'; l.download = 'Darshan_Satbhai_Resume.pdf'; document.body.appendChild(l); l.click(); document.body.removeChild(l); }, 1500);
            return;
        }
        if (text.includes('joke') || text.includes('funny')) { addBotMessage(pick(DEV_JOKES)); return; }
        if (text.includes('party') || text.includes('confetti') || text.includes('surprise')) {
            addBotMessage("🎉 Let's go!");
            setTimeout(async () => { const c = (await import('canvas-confetti')).default; c({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); }, 1400);
            return;
        }
        if (text === 'clear') { setMessages([]); return; }

        // Fallback to Gemini AI for natural conversation
        handleAIResponse(rawText);
    }, [userName, awaitingName, addBotMessage, handleNavigate, messages]);

    const handleSend = () => { if (!input.trim()) return; processMessage(input); setInput(''); };

    const hasMessages = messages.length > 0;

    return (
        <>
            {/* ═══════ 3D ROBOT FLOATING ═══════ */}
            <motion.div
                className={`cb-float ${isOpen ? 'cb-float-hidden' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setIsOpen(true)}
            >
                <div className="cb-model">
                    {showModel && !mobile && !isOpen ? (
                        <Suspense fallback={<div className="cb-fallback-icon"><Bot size={40} color="#8c64ff" /></div>}>
                            <Spline
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                            />
                        </Suspense>
                    ) : (
                        <div className="cb-fallback-icon"><Bot size={40} color="#8c64ff" /></div>
                    )}
                </div>
                <span className="cb-float-label">Chat with AI</span>
            </motion.div>

            {/* ═══════ CHAT WINDOW ═══════ */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="cb-window"
                        initial={{ opacity: 0, y: 24, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.92 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Close button */}
                        <button className="cb-close-btn" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </button>

                        {/* Hero / Welcome Area */}
                        {!hasMessages && (
                            <div className="cb-welcome">
                                <div className="cb-welcome-avatar">
                                    <div className="cb-welcome-glow" />
                                    <span className="cb-welcome-icon"><Bot size={36} color="#ffffff" /></span>
                                </div>
                                <h3 className="cb-welcome-title">Chat with ScriptAI</h3>
                                <p className="cb-welcome-desc">
                                    I can navigate you to pages, download resume, tell jokes, and answer your questions.
                                </p>
                            </div>
                        )}

                        {/* Messages */}
                        {hasMessages && (
                            <div className="cb-messages">
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        className={`cb-msg ${msg.sender === 'user' ? 'cb-msg-r' : 'cb-msg-l'}`}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {msg.sender === 'bot' && <span className="cb-msg-icon"><Bot size={16} /></span>}
                                        <div className={`cb-bub ${msg.sender === 'user' ? 'cb-bub-u' : 'cb-bub-b'}`}>
                                            {msg.text.split('\n').map((line, j) => (
                                                <React.Fragment key={j}>{line}<br /></React.Fragment>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <div className="cb-msg cb-msg-l">
                                        <span className="cb-msg-icon"><Bot size={16} /></span>
                                        <div className="cb-bub cb-bub-b cb-typing"><span /><span /><span /></div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}

                        {/* Suggestions */}
                        <div className={`cb-suggestions ${hasMessages ? 'cb-suggestions-compact' : ''}`}>
                            {!hasMessages && <p className="cb-sug-title">Prompt Suggestions For You</p>}
                            <div className="cb-sug-grid">
                                {SUGGESTIONS.map(s => (
                                    <button
                                        key={s.cmd}
                                        onClick={() => processMessage(s.cmd)}
                                        className="cb-sug-chip"
                                    >
                                        <span className="cb-sug-icon-wrapper">{s.icon}</span>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input */}
                        <div className="cb-input-wrap">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask me anything..."
                                className="cb-input"
                            />
                            <button onClick={handleSend} className="cb-send" disabled={!input.trim()}>
                                <Send size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;

