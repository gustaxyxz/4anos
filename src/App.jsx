import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Splash from './components/Splash';
import Counter from './components/Counter';
import Hero from './components/Hero';
import ZAxisTunnel from './components/ZAxisTunnel';
import Gallery from './components/Gallery';
import AcousticPoetry from './components/AcousticPoetry';
import MusicPlayer from './components/MusicPlayer';
import { useAudioSync } from './hooks/useAudioSync';

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);
  const { isPlaying } = useAudioSync(audioRef);

  const handleSplashComplete = () => {
    setShowContent(true);
    // Auto-play audio on first interaction
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log('Autoplay blocked'));
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play().catch((e) => console.log('Autoplay blocked'));
    } else {
      audioRef.current?.pause();
    }
  };

  const handleHeroScroll = () => {
    const tunnelElement = document.getElementById('tunnel-section');
    tunnelElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-dark overflow-x-hidden">
      {/* Noise texture */}
      <div className="noise" />

      {/* Splash Screen */}
      <Splash onComplete={handleSplashComplete} />

      {/* Main Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* Counter - Always visible when scrolling */}
        <Counter />

        {/* Hero Section */}
        <Hero onScrollClick={handleHeroScroll} />

        {/* Z-Axis Tunnel Section */}
        <div id="tunnel-section">
          <ZAxisTunnel />
        </div>

        {/* Gallery */}
        <Gallery />

        {/* Acoustic Poetry Section */}
        <AcousticPoetry />

        {/* Footer */}
        <motion.footer
          className="w-full py-10 sm:py-14 px-4 sm:px-6 text-center border-t border-primary/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400/80 text-sm sm:text-base font-light">
            Made with 💜 for you
          </p>
          <p className="text-primary/50 text-xs sm:text-sm mt-2 font-light">
            © 2022-2026 • Nosso Amor Eterno
          </p>
        </motion.footer>
      </motion.div>

      {/* Music Player */}
      {showContent && (
        <MusicPlayer
          audioRef={audioRef}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}

      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" />
    </div>
  );
}
