'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface Song {
  title: string;
  url: string;
}

interface Album {
  thumbnail: string;
  title: string;
  songs: Song[];
}

interface AudioPlayerProps {
  albums: Album[];
}

export default function AudioPlayer({ albums }: AudioPlayerProps) {
  const { theme } = useTheme();
  const [currentSong, setCurrentSong] = useState<{ album: string; song: Song } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visualizerData, setVisualizerData] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const playSong = (album: string, song: Song) => {
    if (currentSong?.song.url === song.url && isPlaying) {
      // Pause current song
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      // Play new song or resume
      setCurrentSong({ album, song });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!currentSong) return;

    // Create or get audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    // Set source and play
    if (audioRef.current.src !== currentSong.song.url) {
      audioRef.current.src = currentSong.song.url;
      audioRef.current.load();
    }

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error('Playback error:', err);
        setIsPlaying(false);
      });

      // Setup Web Audio API for visualization
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();

        if (audioRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
      }

      // Resume AudioContext if suspended
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      // Set FFT size based on window width
      if (analyserRef.current) {
        const fftSize = Math.min(2048, Math.max(32, Math.pow(2, Math.ceil(Math.log2(window.innerWidth / 10)))));
        analyserRef.current.fftSize = fftSize;
      }

      startVisualizer();
    } else {
      audioRef.current.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentSong, isPlaying]);

  const startVisualizer = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualizer = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      // Sample data for visualization
      const sampleSize = Math.min(100, bufferLength);
      const step = Math.floor(bufferLength / sampleSize);
      const sampledData = [];

      for (let i = 0; i < sampleSize; i++) {
        const index = i * step;
        sampledData.push(dataArray[index]);
      }

      setVisualizerData(sampledData);
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    updateVisualizer();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  // Cleanup: Stop audio when component unmounts (navigating away)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Calculate luminance and sort nav colors by brightness (once)
  const navColorsByLuminosity = [...theme.navColors].sort((a, b) => {
    const getLuminance = (hex: string) => {
      const rgb = parseInt(hex.replace('#', ''), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };
    return getLuminance(a) - getLuminance(b);
  });

  // Block character intensity levels
  const getVisualizerChar = (value: number): string => {
    const chars = ' ░▒▓█';
    const index = Math.floor((value / 255) * (chars.length - 1));
    return chars[index];
  };

  const getVisualizerColor = (value: number): string => {
    // Map intensity to nav colors sorted by luminosity
    const index = Math.floor((value / 255) * (navColorsByLuminosity.length - 1));
    return navColorsByLuminosity[index];
  };

  return (
    <div className="space-y-8">
      {/* Track Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {albums.map((album, albumIndex) => (
          <div
            key={albumIndex}
            className="border overflow-hidden"
            style={{
              borderColor: theme.border,
              backgroundColor: theme.card,
            }}
          >
            <div className="flex gap-4 p-4">
              <div
                className="relative w-24 h-24 flex-shrink-0"
                style={{ backgroundColor: theme.border }}
              >
                <Image
                  src={album.thumbnail}
                  alt={album.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="font-mono text-sm font-bold mb-2"
                  style={{ color: theme.text.primary }}
                >
                  {album.title}
                </h3>
                <div className="space-y-1">
                  {album.songs.map((song, songIndex) => {
                    const isActive = currentSong?.song.url === song.url;
                    return (
                      <button
                        key={songIndex}
                        onClick={() => playSong(album.title, song)}
                        className="group w-full text-left text-xs font-mono px-2 py-1 transition-colors overflow-hidden relative"
                        style={
                          isActive
                            ? { backgroundColor: theme.border, color: theme.text.primary }
                            : { color: theme.text.secondary, backgroundColor: 'transparent' }
                        }
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = theme.border;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <span className="inline-block whitespace-nowrap group-hover:animate-marquee-scroll group-active:animate-marquee-scroll">
                          {isActive && isPlaying ? '\u25B6\uFE0E ' : ''}
                          {song.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Now Playing + Controls */}
      {currentSong && (
        <div
          className="fixed bottom-0 left-0 right-0 mr-16 border-t z-50"
          style={{
            backgroundColor: theme.mode === 'dark' ? '#000000' : theme.sidebar.background,
            borderColor: theme.border,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 font-mono text-sm transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: theme.border,
                  color: theme.text.primary
                }}
              >
                {isPlaying ? '\u23F8\uFE0E' : '\u25B6\uFE0E'}
              </button>

              <div className="flex-1">
                <p className="text-sm font-mono" style={{ color: theme.text.primary }}>
                  {currentSong.album} — {currentSong.song.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono" style={{ color: theme.text.tertiary }}>
                    {formatTime(currentTime)}
                  </span>
                  <div
                    className="flex-1 h-1 cursor-pointer"
                    style={{ backgroundColor: theme.card }}
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${(currentTime / duration) * 100}%`,
                        backgroundColor: theme.text.primary
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono" style={{ color: theme.text.tertiary }}>
                    {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>

            {/* ASCII Visualizer */}
            {isPlaying && visualizerData.length > 0 && (
              <div className="flex items-end justify-center h-24 font-mono text-xs leading-none overflow-hidden">
                {visualizerData.map((value, index) => {
                  const height = Math.floor((value / 255) * 12); // 12 rows max
                  //const char = getVisualizerChar(value);
                  const color = getVisualizerColor(value);
                  const column = Array(12).fill(' ').map((_, i) => i < height ? '█' : ' ');
                  return (
                    <div key={index} className="flex flex-col-reverse flex-1 text-center">
                      {column.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            color: i < height ? color : 'transparent',
                          }}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
