'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PAGE_COLORS } from '@/lib/colors';

const getPageInfo = (path: string) => {
  if (path === '/') return { color: PAGE_COLORS.home, name: 'Home' };
  if (path.startsWith('/art')) return { color: PAGE_COLORS.art, name: 'Art' };
  if (path.startsWith('/music')) return { color: PAGE_COLORS.music, name: 'Music' };
  if (path.startsWith('/projects')) return { color: PAGE_COLORS.projects, name: 'Projects' };
  if (path.startsWith('/blog')) return { color: PAGE_COLORS.blog, name: 'Blog' };
  if (path.startsWith('/about')) return { color: PAGE_COLORS.about, name: 'About' };
  return { color: '#FFFFFF', name: 'Page' };
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
  const [transitionPhase, setTransitionPhase] = useState<'color' | 'background' | 'done'>('done');
  const [pageInfo, setPageInfo] = useState(getPageInfo(pathname));
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPathname) {
      const newPageInfo = getPageInfo(pathname);
      setPageInfo(newPageInfo);
      setIsTransitioning(true);
      setTransitionPhase('color');

      // Color fill phase - 300ms
      setTimeout(() => {
        setTransitionPhase('background');
      }, 300);

      // Background fill phase - 300ms
      setTimeout(() => {
        setTransitionPhase('done');
        setIsTransitioning(false);
        setPrevPathname(pathname);
      }, 600);
    }
  }, [pathname, prevPathname]);

  const textColor = getTextColor(pageInfo.color);
  const finalBg = textColor === '#000000' ? '#FFFFFF' : '#000000';

  return (
    <>
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
          {/* Color wipe from right (navbar) to left */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              backgroundColor: pageInfo.color,
              transform: transitionPhase === 'color' ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className="text-8xl font-bold tracking-tight font-mono"
                style={{ color: textColor }}
              >
                {pageInfo.name}
              </h1>
            </div>
          </div>

          {/* Background wipe from left to right */}
          {transitionPhase === 'background' && (
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                backgroundColor: finalBg,
                transform: 'translateX(0)',
              }}
            />
          )}
        </div>
      )}
      {children}
    </>
  );
}
