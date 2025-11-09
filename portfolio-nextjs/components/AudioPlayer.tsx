'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

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

  // ASCII intensity levels
  const getVisualizerChar = (value: number): string => {
    const chars = ' ·:!|█';
    const index = Math.floor((value / 255) * (chars.length - 1));
    return chars[index];
  };

  const getVisualizerColor = (value: number): string => {
    const intensity = Math.floor((value / 255) * 255);
    return `rgb(${intensity}, ${intensity}, ${intensity})`;
  };

  return (
    <div className="space-y-8">
      {/* Track Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {albums.map((album, albumIndex) => (
          <div key={albumIndex} className="border border-gray-200 bg-white overflow-hidden">
            <div className="flex gap-4 p-4">
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100">
                <Image
                  src={album.thumbnail}
                  alt={album.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-mono text-sm font-bold text-gray-900 mb-2">
                  {album.title}
                </h3>
                <div className="space-y-1">
                  {album.songs.map((song, songIndex) => (
                    <button
                      key={songIndex}
                      onClick={() => playSong(album.title, song)}
                      className={`w-full text-left text-xs font-mono px-2 py-1 transition-colors ${
                        currentSong?.song.url === song.url
                          ? 'bg-accent text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {currentSong?.song.url === song.url && isPlaying ? '▶ ' : ''}
                      {song.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Now Playing + Controls */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white border-t border-gray-700 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-accent hover:bg-accent-dark text-white px-4 py-2 font-mono text-sm transition-colors"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <div className="flex-1">
                <p className="text-sm font-mono">
                  {currentSong.album} — {currentSong.song.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400 font-mono">{formatTime(currentTime)}</span>
                  <div
                    className="flex-1 h-1 bg-gray-700 cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* ASCII Visualizer */}
            {isPlaying && visualizerData.length > 0 && (
              <div className="flex items-end justify-center h-24 font-mono text-xs leading-none overflow-hidden">
                {visualizerData.map((value, index) => {
                  const height = Math.floor((value / 255) * 12); // 12 rows max
                  const column = Array(12).fill(' ').map((_, i) => i < height ? '█' : ' ');
                  return (
                    <div key={index} className="flex flex-col-reverse flex-1 text-center">
                      {column.map((char, i) => (
                        <div
                          key={i}
                          style={{
                            color: i < height ? getVisualizerColor(value) : 'transparent',
                          }}
                        >
                          {char}
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
