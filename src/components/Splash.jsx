import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Splash({ onComplete }) {
  const [showSplash, setShowSplash] = useState(true);
  const [showYears, setShowYears] = useState(false);
  const [yearIndex, setYearIndex] = useState(0);
  const audioRef = useRef(null);

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
              {/* Large year number - optimized for mobile */}
              <motion.h1
                className="font-black text-7xl sm:text-8xl md:text-9xl lg:text-[14rem] leading-none gradient-text"
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
