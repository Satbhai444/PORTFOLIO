import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Advanced3DCard.css';

const Advanced3DCard = ({ title, category, image, index }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15; // Max 15 degree rotation
    const rotateX = ((centerY - y) / centerY) * 15; // Max 15 degree rotation

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="advanced-3d-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.div
        className="card-content"
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          scale: 1.02,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image" />
          <div className="card-overlay" />
        </div>
        <div className="card-info">
          <h3 className="card-title">{title}</h3>
          <p className="card-category">{category}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Advanced3DCard;