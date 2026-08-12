import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import './BrowserModal.css';

const BrowserModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [originalUrl, setOriginalUrl] = useState('');
    const [proxiedUrl, setProxiedUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const handleOpenBrowser = (e) => {
            const targetUrl = e.detail.url;
            setOriginalUrl(targetUrl);
            
            // Proxy logic to bypass X-Frame-Options
            // We use corsproxy.io as a best-effort bypass for strict sites
            if (targetUrl.includes('github.com') || targetUrl.includes('linkedin.com') || targetUrl.includes('instagram.com')) {
                setProxiedUrl(`https://corsproxy.io/?${encodeURIComponent(targetUrl)}`);
            } else {
                setProxiedUrl(targetUrl);
            }

            setIsOpen(true);
            setIsLoading(true);
            setKey(prev => prev + 1);
        };

        window.addEventListener('open-browser', handleOpenBrowser);
        return () => window.removeEventListener('open-browser', handleOpenBrowser);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleRefresh = () => {
        setIsLoading(true);
        setKey(prev => prev + 1);
    };

    const handleOpenExternal = () => {
        window.open(originalUrl, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="browser-wrapper">
                    <motion.div 
                        className="browser-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                    
                    <motion.div 
                        className="browser-modal"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Browser Header / URL Bar */}
                        <div className="browser-header">
                            <div className="apple-buttons">
                                <button className="apple-btn close" onClick={() => setIsOpen(false)} title="Close"></button>
                                <button className="apple-btn minimize" onClick={() => setIsOpen(false)} title="Minimize"></button>
                                <button className="apple-btn expand" onClick={handleOpenExternal} title="Open External"></button>
                            </div>

                            <div className="browser-url-bar">
                                <Lock size={12} className="url-lock" />
                                <span className="url-text">{originalUrl}</span>
                            </div>

                            <div className="browser-spacer"></div>
                        </div>

                        {/* Browser Content */}
                        <div className="browser-content">
                            {isLoading && (
                                <div className="browser-loading">
                                    <div className="spinner"></div>
                                </div>
                            )}

                            <iframe
                                key={key}
                                src={proxiedUrl}
                                className="browser-iframe"
                                onLoad={() => setIsLoading(false)}
                                onError={() => setIsLoading(false)}
                                title="Built-in Browser"
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BrowserModal;
