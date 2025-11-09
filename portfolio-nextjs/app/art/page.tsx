import ArtGallery from '@/components/ArtGallery';
import artworks from '@/public/assets/art/artworks.json';

export const metadata = {
  title: 'Art Gallery - Sammish',
  description: 'Digital artwork and illustrations by Smaran (Sammish)',
};

export default function ArtPage() {
  return (
    <div className="min-h-screen py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Art Gallery
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Digital illustrations, character art, and 3D renderings. Each piece shows the process from sketch to final.
          </p>

          {/* ASCII decoration */}
          <div className="mt-6 text-gray-600 font-mono text-xs">
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          </div>
        </div>

        <ArtGallery artworks={artworks} />
      </div>
    </div>
  );
}
