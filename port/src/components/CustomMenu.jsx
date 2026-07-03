import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Briefcase, User, Lightbulb, Palette, Copy } from 'lucide-react';
import './CustomMenu.css';

const CustomMenu = ({ toggleTheme, theme, setAccentColor }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    const colors = [
        { name: 'Apple Blue', value: '#0071e3' },
        { name: 'Purple', value: '#bf5af2' },
        { name: 'Emerald', value: '#34c759' },
        { name: 'Sunset', value: '#ff9500' },
    ];

    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        setPosition({ x: e.clientX, y: e.clientY });
        setVisible(true);
    }, []);

    const handleClick = useCallback(() => {
        setVisible(false);
    }, []);

    useEffect(() => {
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleClick);
        };
    }, [handleContextMenu, handleClick]);

    const menuItems = [
        { label: 'Home', icon: <Home size={16} />, action: () => navigate('/') },
        { label: 'Projects', icon: <Briefcase size={16} />, action: () => navigate('/projects') },
        { label: 'About Me', icon: <User size={16} />, action: () => navigate('/about') },
        { type: 'divider' },
        {
            label: 'Toggle Spotlight',
            icon: <Lightbulb size={16} />,
            action: () => window.dispatchEvent(new CustomEvent('spotlight-toggle', { detail: { type: 'toggle-spotlight' } }))
        },
        { type: 'colors' },
        { type: 'divider' },
        {
            label: 'Copy Link',
            icon: <Copy size={16} />,
            action: () => {
                navigator.clipboard.writeText(window.location.href);
                alert('Copied to clipboard!');
            }
        },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="custom-menu liquid-glass"
                    style={{
                        position: 'fixed',
                        left: position.x,
                        top: position.y,
                        zIndex: 10000,
                    }}
                >
                    {menuItems.map((item, index) => (
                        item.type === 'divider' ? (
                            <div key={index} className="menu-divider" />
                        ) : item.type === 'colors' ? (
                            <div key={index} className="menu-colors-row">
                                {colors.map(c => (
                                    <div
                                        key={c.value}
                                        className="color-dot"
                                        style={{ backgroundColor: c.value }}
                                        onClick={() => setAccentColor(c.value)}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div
                                key={index}
                                className="menu-item"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.action();
                                    setVisible(false);
                                }}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </div>
                        )
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};


export default CustomMenu;
