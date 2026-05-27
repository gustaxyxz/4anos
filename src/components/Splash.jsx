import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Splash({ onComplete }) {
  const [showSplash, setShowSplash] = useState(true);
  const [showYears, setShowYears] = useState(false);
  const [yearIndex, setYearIndex] = useState(0);
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const years = ['2022', '2023', '2024', '2025', '2026'];

  const handleStart = () => {
    setShowYears(true);
    const interval = setInterval(() => {
      setYearIndex((prev) => {
        const next = prev + 1;
        if (next >= years.length) {
          clearInterval(interval);
          setTimeout(() => {
            setShowSplash(false);
            setTimeout(() => {
              const audio = audioRef.current || document.querySelector('audio');
              if (audio) {
                audio.volume = 0.3;
                audio.play().catch(err => console.log('Autoplay prevented:', err));
              }
              onComplete?.();
            }, 300);
          }, 1000);
        }
        return next;
      });
    }, 1200);
  };

  // AlwaysBeMine Particle Heart Logic
  useEffect(() => {
    if (!showYears || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const settings = {
      particles: {
        length: 500, // quantidade de partículas
        duration: 2, // duração em segundos
        velocity: 100, // velocidade
        effect: -0.75, // efeito de dispersão
        size: 30, // tamanho da partícula
      },
    };

    class Point {
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
      clone() {
        return new Point(this.x, this.y);
      }
      length(length) {
        if (typeof length == 'undefined') return Math.sqrt(this.x * this.x + this.y * this.y);
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
      }
      normalize() {
        const len = this.length();
        if (len !== 0) {
          this.x /= len;
          this.y /= len;
        }
        return this;
      }
    }

    class Particle {
      constructor() {
        this.position = new Point();
        this.velocity = new Point();
        this.acceleration = new Point();
        this.age = 0;
      }
      initialize(x, y, dx, dy) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
      }
      update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
      }
      draw(context, image) {
        function ease(t) {
          return --t * t * t + 1;
        }
        const size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
      }
    }

    class ParticlePool {
      constructor(length) {
        this.particles = new Array(length).fill(null).map(() => new Particle());
        this.firstActive = 0;
        this.firstFree = 0;
        this.duration = settings.particles.duration;
      }
      add(x, y, dx, dy) {
        this.particles[this.firstFree].initialize(x, y, dx, dy);
        this.firstFree++;
        if (this.firstFree === this.particles.length) this.firstFree = 0;
        if (this.firstActive === this.firstFree) this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
      }
      update(deltaTime) {
        let i;
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) this.particles[i].update(deltaTime);
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++) this.particles[i].update(deltaTime);
          for (i = 0; i < this.firstFree; i++) this.particles[i].update(deltaTime);
        }
        while (this.particles[this.firstActive].age >= this.duration && this.firstActive !== this.firstFree) {
          this.firstActive++;
          if (this.firstActive === this.particles.length) this.firstActive = 0;
        }
      }
      draw(context, image) {
        let i;
        if (this.firstActive < this.firstFree) {
          for (i = this.firstActive; i < this.firstFree; i++) this.particles[i].draw(context, image);
        }
        if (this.firstFree < this.firstActive) {
          for (i = this.firstActive; i < this.particles.length; i++) this.particles[i].draw(context, image);
          for (i = 0; i < this.firstFree; i++) this.particles[i].draw(context, image);
        }
      }
    }

    function pointOnHeart(t) {
      return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
      );
    }

    const image = (function () {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = settings.particles.size;
      canvas.height = settings.particles.size;
      function to(t) {
        let point = pointOnHeart(t);
        point.x = settings.particles.size / 2 + (point.x * settings.particles.size) / 350;
        point.y = settings.particles.size / 2 - (point.y * settings.particles.size) / 350;
        return point;
      }
      context.beginPath();
      let t = -Math.PI;
      let point = to(t);
      context.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        context.lineTo(point.x, point.y);
      }
      context.closePath();
      context.fillStyle = '#c084fc'; // Cor lilás do projeto
      context.fill();
      return canvas;
    })();

    const particles = new ParticlePool(settings.particles.length);
    const particleRate = settings.particles.length / settings.particles.duration;
    let time;

    function render() {
      animationFrameId = requestAnimationFrame(render);
      const newTime = new Date().getTime() / 1000;
      const deltaTime = newTime - (time || newTime);
      time = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().length(settings.particles.velocity);
        particles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
      }
      particles.update(deltaTime);
      particles.draw(context, image);
    }

    function onResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', onResize);
    onResize();
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showYears]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-dark z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="noise" />

          {!showYears ? (
            // Button only state
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={handleStart}
                className="px-12 sm:px-16 py-4 sm:py-5 bg-gradient-to-r from-primary to-accent rounded-full font-bold uppercase tracking-widest text-white border-2 border-primary/80 transition-all duration-300 gpu-accelerated text-sm sm:text-base relative overflow-hidden group"
                whileHover={{ scale: 1.12, borderColor: '#ffffff' }}
                whileTap={{ scale: 0.88 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/* Roxo reflection effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                {/* Shadow glow */}
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full blur-xl -z-10 group-hover:blur-2xl transition-all duration-300"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <span className="relative z-10">Começar</span>
              </motion.button>

              {/* Decorative text */}
              <motion.p
                className="text-primary/60 mt-8 text-sm sm:text-base font-light tracking-widest uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Clique para começar a celebração
              </motion.p>
            </motion.div>
          ) : (
            // Years display state - clean and minimal
            <motion.div
              className="text-center flex flex-col items-center justify-center w-full h-screen px-4 sm:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Canvas do Coração AlwaysBeMine (Partículas animadas) */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                style={{ filter: 'drop-shadow(0 0 20px rgba(192,132,252,0.4))' }}
              />

              {/* Large year number - optimized for mobile */}
              <motion.h1
                className="font-black text-7xl sm:text-8xl md:text-9xl lg:text-[14rem] leading-none gradient-text relative z-10"
                key={yearIndex}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {years[yearIndex]}
              </motion.h1>
            </motion.div>
          )}

          {/* Decorative blobs */}
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: [0, 30, -10, 0],
              y: [0, -20, 10, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: [0, -30, 10, 0],
              y: [0, 20, -10, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, delay: 2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
