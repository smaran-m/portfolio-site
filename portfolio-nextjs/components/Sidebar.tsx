'use client';

import { useRouter, usePathname } from 'next/navigation';
import { NAV_COLORS } from '@/lib/colors';

const navItems = [
  { href: '/', color: NAV_COLORS[0], label: 'Home' },
  { href: '/art', color: NAV_COLORS[1], label: 'Art' },
  { href: '/music', color: NAV_COLORS[2], label: 'Music' },
  { href: '/projects', color: NAV_COLORS[3], label: 'Projects' },
  { href: '/blog', color: NAV_COLORS[4], label: 'Blog' },
  { href: '/about', color: NAV_COLORS[5], label: 'About' },
];

// Determine text color based on background brightness
const getTextColor = (bgColor: string) => {
  // Extract RGB values
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Use black text for bright colors, white for dark
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string, color: string, label: string) => {
    // Don't navigate if already on this page
    if (pathname === href) return;

    e.preventDefault();

    // Dispatch custom event with navigation info for PageTransition to catch
    window.dispatchEvent(new CustomEvent('startPageTransition', {
      detail: { href, color, label }
    }));

    // Navigate after a delay to allow transition to start
    setTimeout(() => {
      router.push(href);
    }, 250);
  };

  return (
    <nav className="fixed right-0 top-0 bottom-0 w-16 flex flex-col gap-1 py-2 pr-2 bg-gray-300" style={{ zIndex: 100 }}>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleNavigation(e, item.href, item.color, item.label)}
          className="flex-1 transition-all hover:w-20 group relative rounded-r-xl w-12 flex items-center justify-center ml-0 cursor-pointer"
          style={{
            backgroundColor: item.color,
          }}
          title={item.label}
        >
          <span
            className="font-mono text-xs drop-shadow-md whitespace-nowrap"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              color: getTextColor(item.color)
            }}
          >
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
