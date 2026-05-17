import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 18;
const COLORS = ['#fbbf24', '#fde68a', '#f59e0b', '#fef08a', '#facc15'];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

export default function StudymateCursor() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const particles = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let alive = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function onMove(e) {
      const x = e.clientX ?? (e.touches && e.touches[0].clientX);
      const y = e.clientY ?? (e.touches && e.touches[0].clientY);
      mouse.current = { x, y };

      // Spawn burst of particles on move
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 3 + Math.random() * 7,
          alpha: 0.85 + Math.random() * 0.15,
          color: randomColor(),
          decay: 0.012 + Math.random() * 0.018,
        });
      }

      // Cap particles
      if (particles.current.length > 220) {
        particles.current.splice(0, particles.current.length - 220);
      }
    }

    function onClick(e) {
      const x = e.clientX;
      const y = e.clientY;
      // Big burst on click
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (Math.PI * 2 / PARTICLE_COUNT) * i + Math.random() * 0.4;
        const speed = 2 + Math.random() * 5;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 4 + Math.random() * 8,
          alpha: 1,
          color: randomColor(),
          decay: 0.018 + Math.random() * 0.02,
        });
      }
    }

    function draw() {
      if (!alive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw particles
      particles.current = particles.current.filter(p => p.alpha > 0.01);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.r *= 0.97;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2);

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        grd.addColorStop(0, p.color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
      }

      // Draw main cursor dot
      const { x, y } = mouse.current;
      if (x > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('click', onClick);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        cursor: 'none',
      }}
    />
  );
}
