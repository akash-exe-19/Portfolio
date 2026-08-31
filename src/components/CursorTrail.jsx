import React, { useState, useEffect, useRef } from 'react';

const CursorTrail = () => {
  const [points, setPoints] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const requestRef = useRef();

  useEffect(() => {
    // Check if device has fine pointer (desktop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    setIsVisible(true);

    let idCounter = 0;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .glass-panel')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .glass-panel')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    const updateTrail = () => {
      setPoints((prev) => {
        const newPoint = { x: mousePos.current.x, y: mousePos.current.y, id: idCounter++ };
        const newPoints = [newPoint, ...prev];
        if (newPoints.length > 15) {
          newPoints.length = 15;
        }
        return newPoints;
      });
      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail Points */}
      {points.map((pt, index) => {
        const size = Math.max(2, 10 - index * 0.6);
        const opacity = 1 - index / 15;
        return (
          <div
            key={pt.id}
            style={{
              position: 'fixed',
              left: pt.x - size / 2,
              top: pt.y - size / 2,
              width: size,
              height: size,
              backgroundColor: 'var(--color-accent-blue, #3b82f6)',
              borderRadius: '50%',
              opacity: opacity,
              pointerEvents: 'none',
              zIndex: 9999,
              transition: 'none',
            }}
          />
        );
      })}
      
      {/* Main Cursor Circle */}
      <div
        style={{
          position: 'fixed',
          left: mousePos.current.x - 8,
          top: mousePos.current.y - 8,
          width: 16,
          height: 16,
          border: '2px solid var(--color-accent-blue, #3b82f6)',
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          transition: 'transform 0.15s ease-out, background-color 0.15s ease-out',
        }}
      />
    </>
  );
};

export default CursorTrail;
