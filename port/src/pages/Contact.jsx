import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Marquee } from '../components/MarqueeTilt';
import './Contact.css';

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const marqueeItems = ["Let's Talk", 'Schedule a Call', 'Start a Project', 'Get in Touch', 'Collaborate', 'Build Together', 'Hire Me', 'Work With Me'];

const faqs = [
    { q: "What technologies do you specialize in?", a: "I specialize in Flutter for cross-platform mobile development, React/Vite for web applications, Firebase for backend services, and AI-augmented development workflows using LLMs like Gemini and GPT." },
    { q: "How long do projects typically take?", a: "Timelines vary based on complexity. A standard mobile app takes 4-6 weeks, while simpler web projects can be delivered in 1-2 weeks thanks to my AI-augmented workflow." },
    { q: "Do you offer ongoing support?", a: "Yes, I provide post-launch support and maintenance packages to ensure your application stays updated, secure, and performs optimally." },
    { q: "Can you work with existing codebases?", a: "Absolutely. I'm experienced in migrating, refactoring, and enhancing existing Flutter and React projects, including database migrations and UI overhauls." },
    { q: "What is your pricing model?", a: "I offer both fixed-price project quotes and hourly/retainer-based arrangements depending on the scope and duration of the engagement." },
];

import ScrollReveal from '../components/ScrollReveal';

const FadeUp = ({ children, delay = 0, className = "" }) => {
    return (
        <ScrollReveal delay={delay} className={className}>
            {children}
        </ScrollReveal>
    );
};

const FaqItem = ({ faq, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            className="faq-item-v2 interactive"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <button className="faq-top-v2" onClick={() => setOpen(!open)}>
                <span>{faq.q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="faq-bottom-v2"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p>{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await emailjs.send(
                EJS_SERVICE,
                EJS_TEMPLATE,
                {
                    name:    formData.name,
                    email:   formData.email,
                    message: formData.message,
                    title:   'New Portfolio Contact',
                    time:    new Date().toLocaleString(),
                },
                EJS_KEY
            );
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err?.text || err?.message || 'Unknown Error');
            setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 8000);
        }
    };

    const btnLabel = {
        idle:    'Send Message',
        sending: 'Sending...',
        success: 'Message Sent ✓',
        error:   `Error: ${errorMsg}`,
    }[status];

    return (
        <div className="contact-v2">
            
            {/* ═══════ HERO SECTION ═══════ */}
            <section className="contact-hero-v2">
                <div className="hero-v2-content">
                    <motion.h1 
                        className="hero-v2-title"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="hollow-text interactive">SAY</span><br/>
                        HELLO
                    </motion.h1>
                </div>
            </section>

            {/* ═══════ FORM & INFO SECTION ═══════ */}
            <section className="padding-global padding-section-large" style={{ paddingTop: '0' }}>
                <div className="container-large">
                    <div className="contact-grid">
                        
                        {/* Contact Info */}
                        <FadeUp className="contact-info">
                            <h3 className="contact-info-title">Let's start a project together.</h3>
                            <p className="contact-info-desc">Fill out the form and I'll get back to you within 24 hours. Or, just shoot me a direct email.</p>
                            
                            <div className="contact-methods">
                                <a href="mailto:darshansatbhai38@gmail.com" className="interactive method-link">
                                    darshansatbhai38@gmail.com <ArrowUpRight size={16}/>
                                </a>
                                <a href="https://www.linkedin.com/in/darshan-satbhai-212600423?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="interactive method-link">
                                    LinkedIn <ArrowUpRight size={16}/>
                                </a>
                            </div>
                        </FadeUp>

                        {/* Minimalist Form */}
                        <FadeUp delay={0.2} className="contact-form-wrapper">
                            <form className="sleek-form" onSubmit={handleSubmit}>
                                <div className="input-group interactive">
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder=" " />
                                    <label>Your Name</label>
                                </div>
                                
                                <div className="input-group interactive">
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" " />
                                    <label>Email Address</label>
                                </div>
                                
                                <div className="input-group interactive">
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" placeholder=" " />
                                    <label>Project Details</label>
                                </div>

                                <button
                                    type="submit"
                                    className={`interactive-btn-large interactive ${status === 'error' ? 'btn-error' : ''}`}
                                    disabled={status === 'sending'}
                                    style={{ width: '100%', marginTop: '1rem', background: status === 'success' ? '#10b981' : 'white' }}
                                >
                                    {btnLabel}
                                </button>
                            </form>
                        </FadeUp>
                    </div>
                </div>
            </section>

            <Marquee items={marqueeItems} />

            {/* ═══════ FAQ SECTION ═══════ */}
            <section className="padding-global padding-section-large">
                <div className="container-large">
                    <FadeUp>
                        <div className="section-label">Questions</div>
                    </FadeUp>
                    <div className="faq-list-v2">
                        {faqs.map((faq, idx) => (
                            <FaqItem key={idx} faq={faq} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            <Marquee items={marqueeItems} reverse />

        </div>
    );
};

export default Contact;
