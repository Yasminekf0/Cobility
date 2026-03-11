import { useState, useEffect } from 'react';

export default function ClickIndicator() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleInteraction = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;

      if (typeof x === 'number' && typeof y === 'number') {
        const id = Date.now() + Math.random();
        setRipples((prev) => [...prev, { id, x, y }]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
    }}>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.9)',
            background: 'rgba(255, 255, 255, 0.3)',
            animation: 'ripple-expand 0.5s ease-out',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)',
          }}
        />
      ))}
    </div>
  );
}
