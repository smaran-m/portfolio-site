'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Artwork {
  thumbnail: string;
  images: string[];
  title: string;
  captions: string[];
}

interface ArtGalleryProps {
  artworks: Artwork[];
}

export default function ArtGallery({ artworks }: ArtGalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setCurrentImageIndex(0);
  };

  useEffect(() => {
    if (selectedArtwork && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedArtwork]);

  const closeModal = () => {
    setSelectedArtwork(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedArtwork) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedArtwork.images.length);
    }
  };

  const prevImage = () => {
    if (selectedArtwork) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedArtwork.images.length - 1 : prev - 1
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((artwork, index) => (
          <button
            key={index}
            onClick={() => openModal(artwork)}
            className="group relative border border-gray-200 bg-white hover:border-accent transition-all overflow-hidden"
          >
            <div className="aspect-square relative bg-gray-100">
              <Image
                src={`/assets/art/${artwork.thumbnail}`}
                alt={artwork.title}
                fill
                className="object-cover group-hover:brightness-110 transition-all"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-mono text-sm text-gray-900">{artwork.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{artwork.images.length} images</p>
            </div>

            {/* Subtle ASCII decoration */}
            <div className="absolute top-2 left-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌜
            </div>
            <div className="absolute top-2 right-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌝
            </div>
            <div className="absolute bottom-2 left-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌞
            </div>
            <div className="absolute bottom-2 right-2 text-gray-300 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              ⌟
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 outline-none"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-2xl hover:text-accent transition-colors"
          >
            ✕
          </button>

          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <Image
                src={`/assets/art/${selectedArtwork.images[currentImageIndex]}`}
                alt={selectedArtwork.captions[currentImageIndex]}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-white font-mono text-lg">{selectedArtwork.title}</h3>
              <p className="text-gray-400 text-sm mt-1">
                {selectedArtwork.captions[currentImageIndex]}
              </p>
              <p className="text-gray-500 text-xs mt-2 font-mono">
                {currentImageIndex + 1} / {selectedArtwork.images.length}
              </p>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={prevImage}
                className="px-4 py-2 bg-white text-black hover:bg-accent hover:text-white transition-colors font-mono text-sm"
              >
                ← Previous
              </button>
              <button
                onClick={nextImage}
                className="px-4 py-2 bg-white text-black hover:bg-accent hover:text-white transition-colors font-mono text-sm"
              >
                Next →
              </button>
            </div>

            <p className="text-center text-gray-500 text-xs mt-4 font-mono">
              Use arrow keys to navigate · Press ESC to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
