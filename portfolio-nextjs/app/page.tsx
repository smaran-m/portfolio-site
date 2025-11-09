import RippleCanvas from '@/components/RippleCanvas';
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <RippleCanvas />

      <div className="fixed bottom-8 left-8 pointer-events-none" style={{ zIndex: 10 }}>
        <div className="pointer-events-auto select-none">
          <div className="flex flex-col items-start max-w-xl">
            <div className="text-sm text-gray-500 mb-2">
              <h2>This is a personal website for smaran</h2>
            </div>

            <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-4 text-left">
              <AnimatedText text='"SAMMISH"' />
            </h1>

            <div className="text-sm text-gray-500 mb-6">
              <h2>mishra, who works as a software engineer currently in boston</h2>
            </div>
          </div>
          <div className="text-sm text-gray-500 space-x-3 font-mono">
            <Link href="/about" className="hover:text-accent transition-colors">
              about
            </Link>
            <span>·</span>
            <a
              href="https://x.com/smaran_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              twitter
            </a>
            <span>·</span>
            <a
              href="https://www.youtube.com/@sammish/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              youtube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
