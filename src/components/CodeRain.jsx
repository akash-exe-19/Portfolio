import React, { useEffect, useRef } from 'react';

const CodeRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', resizeCanvas);

    // Characters: Katakana + digits + latin uppercase
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    
    const fontSize = 14;
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    
    // Column logic
    const getColumns = () => Math.floor(canvas.width / 16);
    let drops = Array(getColumns()).fill(1);

    // Watch for theme color changes
    let accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-blue').trim() || '#00f0ff';
    
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
          accentColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-blue').trim() || '#00f0ff';
        }
      }
    });
    
    observer.observe(document.documentElement, { attributes: true });

    const draw = () => {
      // Create trail effect — higher alpha = faster fade = duller rain
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      
      const currentColumns = getColumns();
      if (currentColumns !== drops.length) {
        const oldDrops = [...drops];
        drops = Array(currentColumns).fill(1);
        for(let i = 0; i < Math.min(oldDrops.length, drops.length); i++) {
           drops[i] = oldDrops[i];
        }
      }

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * 16;
        const y = drops[i] * fontSize;
        
        // Draw trailing characters in very low opacity white
        ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.fillText(text, x, y - fontSize);
        
        // Draw head character in accent color at reduced opacity
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = accentColor;
        ctx.fillText(text, x, y);
        ctx.globalAlpha = 1.0;
        
        // Reset drop position
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default CodeRain;
