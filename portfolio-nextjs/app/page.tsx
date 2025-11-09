'use client';

import RippleCanvas from '@/components/RippleCanvas';
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: theme.background }}>
      <RippleCanvas />

      {/* Theme Toggle */}
      <div className="fixed top-8 left-8 pointer-events-auto" style={{ zIndex: 10 }}>
        <ThemeToggle />
      </div>

      <div className="fixed bottom-8 left-4 right-20 sm:left-8 sm:right-auto pointer-events-none" style={{ zIndex: 10 }}>
        <div className="pointer-events-auto select-none">
          <div className="flex flex-col items-start max-w-xl">
            <div className="text-sm mb-2" style={{ color: theme.text.tertiary }}>
              <h2>this is a personal website for smaran</h2>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-left" style={{ color: theme.text.primary }}>
              "<AnimatedText text='sammish' />"
            </h1>

            <div className="text-sm mb-6" style={{ color: theme.text.tertiary }}>
              <h2>mishra, who works as a software engineer currently in boston</h2>
            </div>
          </div>
          <div className="text-sm flex flex-wrap gap-x-3 gap-y-2 font-mono" style={{ color: theme.text.tertiary }}>
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
            <span>·</span>
              <span>webrings</span>
            <a
              href="https://nonacademic.net/ring?action=prev&from=sammish"
              className="hover:opacity-70 transition-opacity px-1 rounded"
              style={{ color: '#FF0000', backgroundColor: theme.border }}
              title="L4K - Previous"
            >
              ↑
            </a>
            <a
              href="https://nonacademic.net/ring?action=next&from=sammish"
              className="hover:opacity-70 transition-opacity px-1 rounded"
              style={{ color: '#00FF00', backgroundColor: theme.border }}
              title="L4K - Next"
            >
              ↓
            </a>
            <a
              href="https://staydown.money/wr?prev=https://sammi.sh/"
              className="hover:opacity-70 transition-opacity px-1 rounded"
              style={{ color: '#0000FF', backgroundColor: theme.border }}
              title="staydown.money - Previous"
            >
              ←
            </a>
            <a
              href="https://staydown.money/wr?next=https://sammi.sh/"
              className="hover:opacity-70 transition-opacity px-1 rounded"
              style={{ color: '#FFFF00', backgroundColor: theme.border }}
              title="staydown.money - Next"
            >
              →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
