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
  { text: 'Um dia eu espero te encontrar numa bem melhor', emoji: '🎸', time: 17, duration: 6 },
  { text: 'Cada um tem seu caminho, eu sei foi até melhor', emoji: '🛤️', time: 23, duration: 7 },
  { text: 'Irmãos do mesmo jeito', emoji: '🤝', time: 30, duration: 5 },
  { text: 'Quero que você seja feliz', emoji: '✨', time: 35, duration: 4 },
  { text: 'Como tudo deve ser...', emoji: '🤍', time: 39, duration: 4 },
  { text: 'Um dia eu espero te encontrar numa bem melhor', emoji: '🎸', time: 44, duration: 6 },
  { text: 'Cada um tem seu caminho, eu sei foi até melhor', emoji: '🛤️', time: 50, duration: 6 },
  { text: 'Irmãos do mesmo jeito', emoji: '🤝', time: 56, duration: 4 },
  { text: 'Quero que você seja feliz', emoji: '✨', time: 61, duration: 4 },
  { text: 'Como tudo deve ser...', emoji: '🤍', time: 65, duration: 6 },
  { text: 'Eu te amo absurdamente', emoji: '💜', time: 72, duration: 10 },
];

export const getCurrentLyric = (currentTime) => {
  return lyrics.find((lyric) => currentTime >= lyric.time && currentTime < lyric.time + lyric.duration);
};
