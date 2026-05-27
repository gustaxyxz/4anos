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
          {activeLyric.text}
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
    const initAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          ['click', 'touchstart', 'scroll'].forEach(evt => document.removeEventListener(evt, initAudio));
        }).catch((e) => console.warn('Autoplay bloqueado pelo iOS, aguardando toque:', e));
      }
    };

    // O iPhone requer que o usuário interaja com a tela para liberar o áudio.
    // Vamos tentar forçar o play no primeiro toque ou rolagem.
    ['click', 'touchstart', 'scroll'].forEach(evt => {
      document.addEventListener(evt, initAudio, { passive: true });
    });

    return () => {
      ['click', 'touchstart', 'scroll'].forEach(evt => document.removeEventListener(evt, initAudio));
    };
  }, []);

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
          {/* Letras acima do player para não atrapalhar o design */}
          <div className="min-h-[120px] sm:min-h-[140px] flex items-center justify-center mb-10">
            <LyricDisplay activeLyric={activeLyric} isPlaying={isPlaying} />
          </div>

          {/* Mini Player Estreito (Estilo Spotify Bottom Bar) */}
          <div className="bg-[#181818] rounded-xl p-3 w-full max-w-[340px] mx-auto shadow-2xl border border-white/10 font-sans">
            <div className="flex items-center gap-3 mb-2">
              <img src="/cbj-cover.jpg" alt="Capa" className="w-12 h-12 rounded object-cover shadow-md" />
              <div className="flex-1 overflow-hidden">
                <h3 className="text-white text-sm font-bold truncate">Como Tudo Deve Ser</h3>
                <p className="text-[#a7a7a7] text-xs truncate">Charlie Brown Jr.</p>
              </div>
              <button onClick={handlePlayPause} className="text-white hover:scale-105 active:scale-95 transition-transform flex-shrink-0 mr-2">
                {isPlaying ? (
                  <svg role="img" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
                ) : (
                  <svg role="img" height="24" width="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
                )}
              </button>
            </div>
            
            {/* Barra de Progresso Estreita */}
            <div className="flex items-center gap-2 group px-1">
              <span className="text-[10px] text-[#a7a7a7] min-w-[30px] text-right">{formatTime(currentTime)}</span>
              <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full overflow-hidden relative">
                <div className="h-full bg-white group-hover:bg-[#1ed760] transition-colors" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] text-[#a7a7a7] min-w-[30px]">{formatTime(duration)}</span>
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
          src="/como-tudo-deve-ser.mp3"
          preload="metadata"
          crossOrigin="anonymous"
          autoPlay
        />
      </div>
    </section>
  );
}
