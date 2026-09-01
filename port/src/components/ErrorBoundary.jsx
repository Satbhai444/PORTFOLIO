import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCcw } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-dark)',
          color: 'var(--text-white)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="interactive">
              <ShieldAlert size={80} color="#ff3333" style={{ margin: '0 auto 2rem auto', opacity: 0.8 }} />
              <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                System Error
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '400px' }}>
                A critical error occurred while rendering this module. Our automated recovery protocol has logged the issue.
              </p>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="interactive"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2.5rem',
                  background: 'var(--text-white)',
                  color: 'var(--bg-dark)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <RefreshCcw size={18} /> REBOOT SYSTEM
              </button>
            </Tilt>
          </motion.div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
