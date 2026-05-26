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
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={containerRef} className="relative h-[625vh] w-full bg-dark">
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
  const startRange = index * 0.2;
  const endRange = (index + 1) * 0.2;

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
