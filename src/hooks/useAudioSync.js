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
  { section: '♫ Introdução', emoji: '🎸', time: 0, duration: 12 },
  { section: '♫ Verso 1', emoji: '✨', time: 12, duration: 18 },
  { section: '♫ Refrão Principal', emoji: '💜', time: 30, duration: 16 },
  { section: '♫ Verso 2', emoji: '✨', time: 46, duration: 18 },
  { section: '♫ Refrão Principal', emoji: '💜', time: 64, duration: 16 },
  { section: '♫ Bridge', emoji: '🌟', time: 80, duration: 14 },
  { section: '♫ Final', emoji: '💜', time: 94, duration: 20 },
];

export const getCurrentLyric = (currentTime) => {
  return lyrics.find((lyric) => currentTime >= lyric.time && currentTime < lyric.time + lyric.duration);
};
