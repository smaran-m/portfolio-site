import AudioPlayer from '@/components/AudioPlayer';
import tracks from '@/public/assets/music/tracks.json';
import ThemedPage, { ThemedText } from '@/components/ThemedPage';

export const metadata = {
  title: 'Music - sammish',
  description: 'Music and beats released under the name sammish',
};

export default function MusicPage() {
  return (
    <ThemedPage className="py-16 pb-48">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Music
          </h1>
          <ThemedText variant="secondary">
            <p className="text-lg max-w-2xl">
              Original beats and remixes (excl. L4K uploads). Click any track to play.
            </p>
          </ThemedText>

          {/* ASCII decoration */}
          <ThemedText variant="tertiary">
            <div className="mt-6 font-mono text-xs">
              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            </div>
          </ThemedText>
        </div>

        <AudioPlayer albums={tracks} />
      </div>
    </ThemedPage>
  );
}
