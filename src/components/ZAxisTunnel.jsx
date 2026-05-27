import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const photos = [
  '/IMG_1420.JPEG',
  '/IMG_0419.JPEG',
  '/IMG_1735.JPEG',
  '/IMG_8285.JPEG',
  '/IMG_1638.JPEG',
];

const yearTexts = [
  { year: '2022', text: 'O Começo de Tudo' },
  { year: '2023', text: 'Crescemos Juntos' },
  { year: '2024', text: 'Nossas Histórias' },
  { year: '2025', text: 'Crescimento' },
  { year: '2026', text: 'Para Sempre' },
];

export default function ZAxisTunnel() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative w-full bg-dark" style={{ height: `${yearTexts.length * 120}vh` }}>
      {/* Tunnel container */}
      <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark/50 via-dark to-dark/50 z-20 pointer-events-none">
        {yearTexts.map((item, idx) => (
          <TunnelCard key={idx} index={idx} item={item} photo={photos[idx]} scrollProgress={scrollYProgress} total={yearTexts.length} />
        ))}
      </div>
    </div>
  );
}

function TunnelCard({ index, item, photo, scrollProgress, total }) {
  const step = 1 / total;
  
  // Sobreposição suave: cada foto começa a aparecer ANTES da anterior sumir
  const start = (index * step) - (step * 0.3);
  const peak = (index * step) + (step * 0.3);
  const end = (index * step) + (step * 1.3);

  const scaleProgress = useTransform(
    scrollProgress,
    [start, peak, end],
    [0.1, 1, 5]
  );

  const opacityProgress = useTransform(
    scrollProgress,
    [start, start + (step * 0.3), peak + (step * 0.3), end],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center gpu-accelerated"
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center px-3 sm:px-6">
        <div className="w-full max-w-2xl aspect-square relative rounded-3xl overflow-hidden border border-primary/40 blur-glass gpu-accelerated shadow-2xl">
          {/* Photo background */}
          <img
            src={photo}
            alt={item.year}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />

          {/* Overlay gradient - transparent to allow light from image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/10 to-dark/20" />

          {/* Year & Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10">
            <motion.h2 className="font-black text-9xl sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-none gradient-text drop-shadow-[0_0_40px_rgba(200,100,255,0.8)]">
              {item.year}
            </motion.h2>
            <motion.p className="text-white font-light tracking-widest uppercase text-base sm:text-lg md:text-xl drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">
              {item.text}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
