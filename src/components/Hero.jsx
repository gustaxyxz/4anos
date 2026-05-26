import { motion } from 'framer-motion';

export default function Hero({ onScrollClick }) {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-dark via-dark to-dark/95">
      <div className="relative z-10 text-center">
        <motion.h1
          className="font-serif text-6xl sm:text-7xl lg:text-8xl font-black gradient-text mb-6 sm:mb-8 leading-tight gpu-accelerated"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          4 Anos de<br />Nosso Amor
        </motion.h1>

        <motion.p
          className="text-primary text-base sm:text-xl lg:text-2xl font-light tracking-widest uppercase mb-10 sm:mb-14 gpu-accelerated"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Uma celebração eterna
        </motion.p>

        <motion.button
          onClick={onScrollClick}
          className="w-10 h-10 border border-primary/50 rounded-full flex items-center justify-center mx-auto hover:border-primary hover:shadow-[0_0_20px_rgba(192,132,252,0.5)] transition-all duration-300 gpu-accelerated"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 0.8, delay: 0.4, repeatDelay: 1.2, repeat: Infinity }}
          whileHover={{ scale: 1.05 }}
        >
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </div>

      {/* Decorative blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl gpu-accelerated"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl gpu-accelerated"
        animate={{
          x: [0, -30, 10, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
}
