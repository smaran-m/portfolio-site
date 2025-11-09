import ArtGallery from '@/components/ArtGallery';
import artworks from '@/public/assets/art/artworks.json';
import ThemedPage, { ThemedText } from '@/components/ThemedPage';

export const metadata = {
  title: 'Art Gallery - sammish',
  description: 'Digital artwork and illustrations by Smaran (sammish)',
};

export default function ArtPage() {
  return (
    <ThemedPage className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Art Gallery
          </h1>
          <ThemedText variant="secondary">
            <p className="text-lg max-w-2xl">
              Digital illustrations, character art, and 3D renderings. Each piece shows the process from sketch to final.
            </p>
          </ThemedText>

          {/* ASCII decoration */}
          <ThemedText variant="tertiary">
            <div className="mt-6 font-mono text-xs">
              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
            </div>
          </ThemedText>
        </div>

        <ArtGallery artworks={artworks} />
      </div>
    </ThemedPage>
  );
}
