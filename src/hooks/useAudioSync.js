import { useState, useEffect, useRef } from 'react';

export const useAudioSync = (audioRef) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef]);

  return { currentTime, duration, isPlaying };
};

export const lyrics = [
  { text: '1.460 dias juntos', time: 0, duration: 4 },
  { text: 'Cada momento é uma dádiva', time: 5, duration: 6 },
  { text: 'Você é meu destino', time: 12, duration: 6 },
  { text: 'Todos os dias escolho você', time: 19, duration: 6 },
  { text: 'Sua paz é minha paz', time: 26, duration: 6 },
  { text: 'Luz nos meus dias escuros', time: 33, duration: 6 },
  { text: 'Para sempre começando', time: 40, duration: 6 },
  { text: 'Eu te amo absurdamente', time: 47, duration: 10 },
];

export const getCurrentLyric = (currentTime) => {
  return lyrics.find((lyric) => currentTime >= lyric.time && currentTime < lyric.time + lyric.duration);
};
