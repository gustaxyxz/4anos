import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudioSync, getCurrentLyric } from '../hooks/useAudioSync';

export default function AcousticPoetry() {
  const audioRef = useRef(null);
  const { currentTime, isPlaying } = useAudioSync(audioRef);
  const [activeLyric, setActiveLyric] = useState(null);

  useEffect(() => {
    const lyric = getCurrentLyric(currentTime);
    setActiveLyric(lyric);
  }, [currentTime]);

  const handlePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play().catch((e) => console.log('Autoplay blocked'));
    } else {
      audioRef.current?.pause();
    }
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black gradient-text mb-6 sm:mb-8">
            Para Você, Meu Amor
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            1.460 dias. Milhares de sorrisos. Momentos que moldaram quem somos juntos.
          </p>
        </motion.div>

        {/* Lyrics Display */}
        <motion.div
          className="relative mb-16 sm:mb-20 min-h-[220px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {activeLyric && (
            <motion.div
              key={activeLyric.text}
              className="text-center px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary drop-shadow-[0_0_25px_rgba(192,132,252,0.4)]">
                {activeLyric.text}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Love Message */}
        <motion.div
          className="text-center mb-16 sm:mb-20 space-y-5 sm:space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
            Você é meu destino. Todos os dias escolho você.
          </p>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
            Obrigado por ser minha paz e minha luz.
          </p>
          <motion.p
            className="text-2xl sm:text-3xl font-serif text-primary font-bold pt-6"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Eu te amo absurdamente 💜
          </motion.p>
        </motion.div>

        {/* Music Player */}
        <motion.div
          className="flex flex-col items-center gap-8 sm:gap-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button
              onClick={handlePlayPause}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white hover:shadow-[0_0_60px_rgba(192,132,252,0.6)] transition-shadow duration-300 gpu-accelerated flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
            >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>

            <div className="text-sm text-primary/80 font-mono min-w-[90px] text-center">
              {formatTime(currentTime)} / {formatTime(audioRef.current?.duration || 0)}
            </div>
          </div>

          <audio
            ref={audioRef}
            src="/musica.mp3"
            preload="metadata"
            crossOrigin="anonymous"
          />

          {/* Progress Bar */}
          <div className="w-full max-w-md px-4">
            <input
              type="range"
              min="0"
              max={audioRef.current?.duration || 0}
              value={currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = parseFloat(e.target.value);
                }
              }}
              className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-accent transition-colors"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}
