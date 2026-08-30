import React from 'react';
import { Laptop, Monitor, Mouse, Keyboard, Headphones, Code2, Terminal, Paintbrush } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Gear.css';

const GEAR_DATA = [
    {
        category: "Hardware",
        items: [
            { icon: <Laptop />, name: "MacBook Pro M2", desc: "16-inch, 32GB RAM. My daily driver for everything from mobile dev to heavy Docker containers." },
            { icon: <Monitor />, name: "LG UltraFine 4K", desc: "Dual 27-inch setup for maximum screen real estate during complex debugging." },
            { icon: <Keyboard />, name: "Keychron K2 V2", desc: "Mechanical wireless keyboard with Brown switches. Tactile but not too loud." },
            { icon: <Mouse />, name: "Logitech MX Master 3S", desc: "The ergonomic king. Custom mapped buttons for IDE shortcuts." },
            { icon: <Headphones />, name: "Sony WH-1000XM5", desc: "Essential for deep work and silencing the outside world." }
        ]
    },
    {
        category: "Software & Tools",
        items: [
            { icon: <Code2 />, name: "VS Code", desc: "Heavily customized. Theme: One Dark Pro. Font: Fira Code with font ligatures enabled." },
            { icon: <Terminal />, name: "Windows Terminal / iTerm2", desc: "Zsh + Oh My Zsh. Customized with powerlevel10k for git status at a glance." },
            { icon: <Paintbrush />, name: "Figma", desc: "For UI/UX prototyping before writing a single line of code." }
        ]
    }
];

const Gear = () => {
    return (
        <div className="gear-container">
            <ScrollReveal>
                <div className="gear-header">
                    <h1 className="gear-title">Uses</h1>
                    <p className="gear-subtitle">A curated list of the hardware, software, and tools I use on a daily basis to design and build software.</p>
                </div>
            </ScrollReveal>

            {GEAR_DATA.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '4rem' }}>
                    <ScrollReveal delay={0.2}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#fff' }}>{section.category}</h2>
                    </ScrollReveal>
                    <div className="gear-grid">
                        {section.items.map((item, i) => (
                            <ScrollReveal key={i} delay={0.1 * i}>
                                <div className="gear-card">
                                    <div className="gear-icon-wrapper">
                                        {item.icon}
                                    </div>
                                    <h3>{item.name}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Gear;
