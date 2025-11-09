'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { PAGE_COLORS } from '@/lib/colors';

const getPageInfo = (path: string) => {
  if (path === '/') return { color: PAGE_COLORS.home, name: 'HOME' };
  if (path.startsWith('/art')) return { color: PAGE_COLORS.art, name: 'ART' };
  if (path.startsWith('/music')) return { color: PAGE_COLORS.music, name: 'MUSIC' };
  if (path.startsWith('/projects')) return { color: PAGE_COLORS.projects, name: 'PROJECTS' };
  if (path.startsWith('/blog')) return { color: PAGE_COLORS.blog, name: 'BLOG' };
  if (path.startsWith('/about')) return { color: PAGE_COLORS.about, name: 'ABOUT' };
  return { color: '#FFFFFF', name: 'PAGE' };
};

const getTextColor = (bgColor: string) => {
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [wipePosition, setWipePosition] = useState(100); // Start off-screen right
  const [pageInfo, setPageInfo] = useState(getPageInfo(pathname));
  const [displayedChildren, setDisplayedChildren] = useState(children);

  console.log('🎨 RENDER - pathname:', pathname, 'isTransitioning:', isTransitioning, 'wipePosition:', wipePosition);

  // Listen for custom navigation event from Sidebar
  useEffect(() => {
    const handleTransitionStart = (e: CustomEvent) => {
      const { color, label } = e.detail;
      console.log('🚀 Custom event received - starting transition for:', label);

      setPageInfo({ color, name: label.toUpperCase() });
      setIsTransitioning(true);
      setWipePosition(100);

      console.log('⏱️ T+0ms: Starting transition, wipePosition set to 100');

      // Start wipe from right
      requestAnimationFrame(() => {
        console.log('⏱️ T+~16ms: requestAnimationFrame - wipePosition set to 0');
        setWipePosition(0); // Wipe to left, covering screen
      });
    };

    window.addEventListener('startPageTransition', handleTransitionStart as EventListener);
    return () => window.removeEventListener('startPageTransition', handleTransitionStart as EventListener);
  }, []);

  // When pathname actually changes (after navigation), update content and finish transition
  useEffect(() => {
    if (!isTransitioning) return;

    console.log('🔄 Pathname changed to:', pathname, '- updating content');

    // Update displayed children to new page
    setDisplayedChildren(children);

    // Wipe back to right immediately
    setWipePosition(100);

    // End transition
    setTimeout(() => {
      console.log('⏱️ Transition complete');
      setIsTransitioning(false);
    }, 250);
  }, [pathname]);

  const textColor = getTextColor(pageInfo.color);

  return (
    <>
      {displayedChildren}
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
          {/* Color wipe - below navbar (z-index 100) */}
          <div
            className="absolute inset-0 transition-transform duration-250 ease-in-out"
            style={{
              backgroundColor: pageInfo.color,
              transform: `translateX(${wipePosition}%)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className="text-8xl font-bold tracking-tight"
                style={{ color: textColor }}
              >
                {wipePosition === 0 ? '⏮' : '▶'}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
