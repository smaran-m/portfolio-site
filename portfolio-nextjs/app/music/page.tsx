import AudioPlayer from '@/components/AudioPlayer';
import tracks from '@/public/assets/music/tracks.json';

export const metadata = {
  title: 'Music - Sammish',
  description: 'Original music and beats by Smaran (Sammish)',
};

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 pb-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Music <span className="text-accent">Club</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Original beats and remixes. Click any track to play and see the audio visualizer.
          </p>

          {/* ASCII decoration */}
          <div className="mt-6 text-gray-300 font-mono text-xs">
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          </div>
        </div>

        <AudioPlayer albums={tracks} />
      </div>
    </div>
  );
}
