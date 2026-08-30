import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { MessageSquare } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import './Guestbook.css';

const Guestbook = () => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;
        
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'guestbook'), {
                name: name.trim(),
                message: message.trim(),
                timestamp: serverTimestamp()
            });
            setName('');
            setMessage('');
        } catch (error) {
            console.error("Error adding message: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        }).format(date);
    };

    return (
        <div className="guestbook-container">
            <ScrollReveal>
                <div className="guestbook-header">
                    <h1 className="guestbook-title">Guestbook</h1>
                    <p className="guestbook-subtitle">Leave a trace. Let me know you were here.</p>
                </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
                <form className="guestbook-form" onSubmit={handleSubmit}>
                    <div className="gb-input-group">
                        <label htmlFor="name">Your Name</label>
                        <input 
                            id="name"
                            type="text" 
                            placeholder="John Doe" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={50}
                            required
                        />
                    </div>
                    <div className="gb-input-group">
                        <label htmlFor="message">Message</label>
                        <textarea 
                            id="message"
                            placeholder="What's on your mind?" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            maxLength={500}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={isSubmitting || !name.trim() || !message.trim()}>
                        {isSubmitting ? 'Signing...' : 'Sign Guestbook'}
                    </button>
                </form>
            </ScrollReveal>

            <div className="messages-grid">
                {messages.length === 0 ? (
                    <p style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>No messages yet. Be the first!</p>
                ) : (
                    messages.map((msg, idx) => (
                        <ScrollReveal key={msg.id} delay={0.05 * Math.min(idx, 10)}>
                            <div className="message-card">
                                <div className="message-header">
                                    <span className="message-author">{msg.name}</span>
                                    <span className="message-date">{formatDate(msg.timestamp)}</span>
                                </div>
                                <div className="message-text">
                                    {msg.message}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))
                )}
            </div>
        </div>
    );
};

export default Guestbook;
