import { motion } from 'framer-motion';

export default function MusicPlayer({ audioRef, isPlaying, onPlayPause }) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[500] gpu-accelerated"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
    >
      <div className="bg-dark/95 backdrop-blur-2xl border border-primary/40 rounded-full px-5 sm:px-7 py-3 sm:py-4 flex items-center gap-3 sm:gap-4 shadow-2xl hover:border-primary/60 transition-all duration-300">
        <motion.button
          onClick={onPlayPause}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-primary/40 to-accent/40 hover:from-primary/60 hover:to-accent/60 border border-primary/60 flex items-center justify-center text-primary transition-all duration-300 gpu-accelerated flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
        >
          {isPlaying ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>

        <span className="text-xs sm:text-sm text-primary/90 font-mono hidden xs:block whitespace-nowrap font-light">
          {isPlaying ? '♫ Tocando' : '⏸ Parado'}
        </span>
      </div>
    </motion.div>
  );
}
