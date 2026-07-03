import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Marquee, TiltCard, MarqueeTitle } from '../components/MarqueeTilt';
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

const FadeIn = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
        {children}
    </motion.div>
);

const FaqItem = ({ faq, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <button className="faq-top" onClick={() => setOpen(!open)}>
                <span>{faq.q}</span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="faq-bottom"
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
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
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
                    name:    `${formData.firstName} ${formData.lastName}`,
                    email:   formData.email,
                    message: formData.message,
                    title:   'New Portfolio Contact',
                    time:    new Date().toLocaleString(),
                },
                EJS_KEY
            );
            setStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
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
        <div className="page-wrapper">
            {/* ═══════ CONTACT HERO ═══════ */}
            <section className="contact-hero">
                {/* Background marquee */}
                <div className="contact-bg-marquee">
                    <div className="text-style-allcaps text-color-muted" style={{ padding: '0 2.5rem', marginBottom: '1rem' }}>Contact</div>
                    <MarqueeTitle title="LET'S TALK" speed={22} />
                </div>

                {/* Centered floating form card */}
                <FadeIn delay={0.3}>
                    <div className="contact-form-card">
                        <p className="contact-intro-text">Please fill out the form below and I will<br />be in touch within 24 hours.</p>
                        <form className="contact-form contact-form-light" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-field">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" />
                                </div>
                                <div className="form-field">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
                                </div>
                            </div>
                            <div className="form-field">
                                <label>Your Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                            </div>
                            <div className="form-field">
                                <label>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="Tell me about your project..." />
                            </div>
                            <button
                                type="submit"
                                className={`contact-submit-btn${status === 'error' ? ' btn-error' : ''}`}
                                disabled={status === 'sending'}
                            >
                                {btnLabel}
                            </button>
                        </form>
                    </div>
                </FadeIn>
            </section>

            {/* MARQUEE */}
            <Marquee items={marqueeItems} />

            {/* ═══════ FAQ SECTION ═══════ */}
            <section className="contact-faq">
                <div className="padding-global padding-section-large">
                    <div className="container-large">
                        <FadeIn>
                            <div className="text-style-allcaps text-color-muted" style={{ marginBottom: '3rem' }}>FAQ</div>
                        </FadeIn>
                        <div className="faq-list">
                            {faqs.map((faq, idx) => (
                                <FaqItem key={idx} faq={faq} index={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* MARQUEE light reverse */}
            <Marquee items={marqueeItems} light reverse />

        </div>
    );
};

export default Contact;
