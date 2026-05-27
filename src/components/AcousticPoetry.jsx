import { useRef, useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioSync, getCurrentLyric } from '../hooks/useAudioSync';

const LyricDisplay = memo(({ activeLyric, isPlaying }) => (
  <AnimatePresence mode="wait">
    {activeLyric ? (
      <motion.div
        key={`${activeLyric.section}-${activeLyric.time}`}
        className="text-center px-4"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-block"
        >
          <span className="text-6xl sm:text-7xl mb-4 block">{activeLyric.emoji}</span>
        </motion.div>
        <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          {activeLyric.section}
        </p>
      </motion.div>
    ) : (
      <motion.p
        className="text-lg text-gray-400 italic"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isPlaying ? 'Tocando...' : 'Toque a música para começar'}
      </motion.p>
    )}
  </AnimatePresence>
));

LyricDisplay.displayName = 'LyricDisplay';

export default function AcousticPoetry() {
  const audioRef = useRef(null);
  const { currentTime, duration, isPlaying } = useAudioSync(audioRef);
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

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-dark via-dark/95 to-dark">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black gradient-text mb-4 sm:mb-6">
            Para Você, Meu Amor
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            1.460 dias de histórias, sorrisos e um amor que cresce a cada dia.
          </p>
        </motion.div>

        {/* Music Player Card */}
        <motion.div
          className="relative mb-20 sm:mb-28"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Spotify-Style Card */}
          <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-primary/30 shadow-2xl overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Album Cover (Estilo Spotify) */}
            <motion.div
              className="relative w-48 h-48 sm:w-60 sm:h-60 mx-auto mb-6 sm:mb-8 rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5"
              animate={{ scale: isPlaying ? 1 : 0.95, opacity: isPlaying ? 1 : 0.8 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <img
                src="/cbj-cover.jpg"
                alt="Como Tudo Deve Ser - Charlie Brown Jr"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Lyric Display */}
            <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center mb-8">
              <LyricDisplay activeLyric={activeLyric} isPlaying={isPlaying} />
            </div>

            {/* Progress Bar */}
            <div className="mb-6 space-y-2">
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50"
                  style={{ width: `${progress}%` }}
                  transition={{ type: 'tween', ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Play Button */}
            <div className="flex justify-center mb-8">
              <motion.button
                onClick={handlePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-lg group-hover:blur-xl transition-all opacity-75 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-r from-primary to-accent rounded-full p-4 text-white">
                  <span className="text-2xl sm:text-3xl">
                    {isPlaying ? '⏸' : '▶'}
                  </span>
                </div>
              </motion.button>
            </div>

            {/* Status */}
            <div className="text-center text-sm text-gray-400">
              {isPlaying ? (
                <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  ♫ Charlie Brown Jr. - Como Tudo Deve Ser
                </motion.span>
              ) : (
                <span>Clique para tocar ♫</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Love Message */}
        <motion.div
          className="text-center space-y-6 sm:space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Você é meu destino.
          </p>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Todos os dias eu escolho você.
          </p>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Obrigado por ser minha paz e minha luz.
          </p>
          <motion.p
            className="text-2xl sm:text-3xl lg:text-4xl font-serif text-primary font-bold pt-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Eu te amo absurdamente 💜
          </motion.p>
        </motion.div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src="/musica.mp3"
          preload="metadata"
          crossOrigin="anonymous"
        />
      </div>
    </section>
  );
}
