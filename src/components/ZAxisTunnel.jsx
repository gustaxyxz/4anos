import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const photos = [
  '/IMG_1420.JPEG',
  '/IMG_0419.JPEG',
  '/IMG_1735.JPEG',
  '/IMG_8285.JPEG',
];

const yearTexts = [
  { year: '2022', text: 'O Começo de Tudo' },
  { year: '2023', text: 'Crescemos Juntos' },
  { year: '2024', text: 'Nossas Histórias' },
  { year: '2025', text: 'Para Sempre' },
];

export default function ZAxisTunnel() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full bg-dark">
      {/* Tunnel container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-dark/50 via-dark to-dark/50">
        {yearTexts.map((item, idx) => (
          <TunnelCard key={idx} index={idx} item={item} photo={photos[idx]} scrollProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function TunnelCard({ index, item, photo, scrollProgress }) {
  // Progress within the range for this specific card
  const startRange = index * 0.25;
  const endRange = (index + 1) * 0.25;

  const scaleProgress = useTransform(
    scrollProgress,
    [startRange - 0.12, startRange, endRange, endRange + 0.12],
    [0.6, 1, 1, 0.6]
  );

  const opacityProgress = useTransform(
    scrollProgress,
    [startRange - 0.12, startRange, endRange, endRange + 0.12],
    [0, 1, 1, 0]
  );

  const yProgress = useTransform(
    scrollProgress,
    [startRange - 0.15, startRange, endRange, endRange + 0.15],
    [80, 0, 0, -80]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center gpu-accelerated"
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        y: yProgress,
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

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

          {/* Year & Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 sm:pb-12 text-center px-6">
            <motion.h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black gradient-text mb-3 sm:mb-4">
              {item.year}
            </motion.h2>
            <motion.p className="text-primary text-base sm:text-lg font-light tracking-wider opacity-95">
              {item.text}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
