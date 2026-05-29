import { useEffect, useRef } from "react";

const Particles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    let lastWidth = window.innerWidth;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Only reinitialize particles if it's the first load or orientation changes (width change).
      // This prevents visual glitches on mobile when the address bar hides/shows on scroll.
      if (particles.length === 0 || Math.abs(window.innerWidth - lastWidth) > 50) {
        initParticles();
        lastWidth = window.innerWidth;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    
    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    
    const handleMouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);

    // Track theme color changes dynamically
    let currentThemeColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-blue').trim() || "#00d2ff";

    const observer = new MutationObserver(() => {
      const newColor = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-blue').trim();
      if (newColor && newColor !== currentThemeColor) {
        currentThemeColor = newColor;
      }
    });
    
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    class Particle {
      constructor(x, y, size, opacity, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = opacity;
        this.weight = weight;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = currentThemeColor;
        ctx.fill();
        ctx.globalAlpha = 1.0; // Reset alpha for other draws if needed
        ctx.closePath();
      }

      update() {
        // Drifting movement
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off edges (virtually)
        if (this.baseX > canvas.width || this.baseX < 0) this.vx = -this.vx;
        if (this.baseY > canvas.height || this.baseY < 0) this.vy = -this.vy;

        // Interaction with mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        
        let directionX = forceDirectionX * force * this.weight;
        let directionY = forceDirectionY * force * this.weight;

        if (distance < mouse.radius && mouse.x !== undefined) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
        
        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 4) + 2;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let opacity = Math.random() * 0.5 + 0.1; 
        let weight = Math.random() * 2 + 1;
        particles.push(new Particle(x, y, size, opacity, weight));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default Particles;
