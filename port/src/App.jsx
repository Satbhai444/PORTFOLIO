import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToHome from './components/BackToHome';

// Styles
import './index.css';

const PAGE_TITLES = {
  '/':         'Darshan Satbhai | Flutter & React Developer',
  '/about':    'About | Darshan Satbhai',
  '/projects': 'Projects | Darshan Satbhai',
  '/contact':  'Contact | Darshan Satbhai',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[pathname] ?? 'Darshan Satbhai | Developer';
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => {
  return (
    <Router>
      <div className="page-wrapper">
        <ScrollToTop />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <BackToHome />
      </div>
    </Router>
  );
};

export default App;
