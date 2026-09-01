import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AdminProvider } from './context/AdminContext';

// Components
// import Navbar from './components/Navbar';
import { SpotlightTracker } from './components/SpotlightTracker';
import { useScrollProgress } from './hooks/useScrollProgress';
import MacDock from './components/MacDock';
import Footer from './components/Footer';
import BackToHome from './components/BackToHome';
import BuyMeCoffee from './components/BuyMeCoffee';
import CommandPalette from './components/CommandPalette';
import CookieConsent from './components/CookieConsent';

// Styles
import './index.css';

const PAGE_TITLES = {
  '/':         'Darshan Satbhai | Flutter & React Developer',
  '/about':    'About | Darshan Satbhai',
  '/projects': 'Projects | Darshan Satbhai',
  '/contact':  'Contact | Darshan Satbhai',
  '/admin':    'Admin Login | Darshan Satbhai',
  '/admin/dashboard': 'Admin Dashboard | Darshan Satbhai',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[pathname] ?? 'Darshan Satbhai | Developer';
  }, [pathname]);
  return null;
}

import './components/PageTransition.css'; // Add the CSS for columns

function AnimatedRoutes() {
  const location = useLocation();
  const columns = 5;
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes don't get the portfolio chrome (dock, footer, etc.)
  if (isAdminRoute) {
    return (
      <Routes location={location}>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {/* 
        We wrap both the content and the transition overlay in a Fragment.
        AnimatePresence needs direct motion children to track keys.
      */}
      <motion.div
        key={`content-${location.pathname}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ width: '100%', minHeight: '100vh', willChange: 'opacity, transform' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>

      {/* The sweeping transition columns */}
      <motion.div 
        key={`overlay-${location.pathname}`}
        className="transition-overlay-container"
      >
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            className="transition-column"
            initial={{ scaleY: 1, transformOrigin: 'bottom' }}
            animate={{ scaleY: 0, transformOrigin: 'top' }}
            exit={{ scaleY: 1, transformOrigin: 'bottom' }}
            transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05 // Staggered effect
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => {
  const [isSelfDestructing, setIsSelfDestructing] = useState(false);
  useScrollProgress();

  useEffect(() => {
    const handleSelfDestruct = () => setIsSelfDestructing(true);
    window.addEventListener('trigger-self-destruct', handleSelfDestruct);

    // Konami Code Logic
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    const handleKonami = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          window.dispatchEvent(new Event('trigger-konami'));
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    document.addEventListener('keydown', handleKonami);

    // Mobile Secret Trigger: 5 rapid taps anywhere on screen
    let tapCount = 0;
    let tapTimeout;
    const handleMobileTap = () => {
      tapCount++;
      if (tapCount >= 5) {
        window.dispatchEvent(new Event('trigger-konami'));
        tapCount = 0;
      }
      clearTimeout(tapTimeout);
      tapTimeout = setTimeout(() => {
        tapCount = 0;
      }, 400); // 400ms window between taps
    };
    document.addEventListener('touchstart', handleMobileTap);

    return () => {
      window.removeEventListener('trigger-self-destruct', handleSelfDestruct);
      document.removeEventListener('keydown', handleKonami);
      document.removeEventListener('touchstart', handleMobileTap);
    };
  }, []);

  const location_hook_unavailable = null; // can't use useLocation outside Router

  return (
    <Router>
      <AdminProvider>
        <AppContent isSelfDestructing={isSelfDestructing} />
      </AdminProvider>
    </Router>
  );
};

/**
 * Separate component so we can use useLocation inside Router
 */
const AppContent = ({ isSelfDestructing }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <SpotlightTracker>
      <div className={`page-wrapper ${isSelfDestructing ? 'self-destruct-active' : ''}`}>
        <ScrollToTop />
        {!isAdminRoute && <CommandPalette />}
        <main>
          <AnimatedRoutes />
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <BackToHome />}
        {!isAdminRoute && <BuyMeCoffee />}
      </div>
      {!isAdminRoute && <CookieConsent />}
      {!isAdminRoute && <MacDock />}
    </SpotlightTracker>
  );
};

export default App;
