// Bright neon colors for light/dark themes

export const NAV_COLORS_BRIGHT = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#00FFFF',
  '#FF00FF',
  '#FFFF00',
] as const;

// Muted vintage colors for manila theme
export const NAV_COLORS_VINTAGE = [
  '#5B9AA0', // home (muted teal)
  '#A65E7B', // art (dusty rose)
  '#D4A574', // music (warm tan)
  '#7B9E6F', // projects (sage green)
  '#6B7FA8', // blog (dusty blue)
  '#B85D5D', // about (terra cotta)
] as const;

// Cool blues for finder theme
export const NAV_COLORS_FINDER = [
  '#FF6F61', // home (warm coral)
  '#FFB347', // art (soft orange)
  '#FFD700', // music (warm yellow)
  '#FF8C42', // projects (deep orange)
  '#FF5E5B', // blog (vivid red)
  '#FFB3B3', // about (light pink)
] as const;

// Default export for backward compatibility
export const NAV_COLORS = NAV_COLORS_BRIGHT;

export const PAGE_COLORS = {
  home: NAV_COLORS[0],
  art: NAV_COLORS[1],
  music: NAV_COLORS[2],
  projects: NAV_COLORS[3],
  blog: NAV_COLORS[4],
  about: NAV_COLORS[5],
} as const;

export interface Theme {
  name: string;
  mode: 'light' | 'dark' | 'manila' | 'finder';
  background: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  sidebar: {
    background: string;
  };
  border: string;
  card: string;
  navColors: readonly string[];
}

export const THEMES: Record<'light' | 'dark' | 'manila' | 'finder', Theme> = {
  light: {
    name: 'Light',
    mode: 'light',
    background: '#FFFFFF',
    text: {
      primary: '#111827', // gray-900
      secondary: '#525252ff', // gray-700
      tertiary: '#828282ff', // gray-500
    },
    sidebar: {
      background: '#D1D5DB', // gray-300
    },
    border: '#D1D5DB', // gray-300
    card: '#FFFFFF',
    navColors: NAV_COLORS_BRIGHT,
  },
  dark: {
    name: 'Dark',
    mode: 'dark',
    background: '#000000',
    text: {
      primary: '#F9FAFB', // gray-50
      secondary: '#E5E7EB', // gray-200
      tertiary: '#9CA3AF', // gray-400
    },
    sidebar: {
      background: '#1F2937', // gray-800
    },
    border: '#4e4e4eff', // gray-700
    card: '#111827', // gray-900
    navColors: NAV_COLORS_BRIGHT,
  },
  manila: {
    name: 'Manila',
    mode: 'manila',
    background: '#FFF9E6', // bright yellow like Windows folder
    text: {
      primary: '#4A3F2A', // dark brown
      secondary: '#6B5D42', // medium brown
      tertiary: '#9B8B6B', // lighter brown
    },
    sidebar: {
      background: '#FFE9A0', // yellow-tan
    },
    border: '#E8D4A0', // light tan
    card: '#FFF9E6',
    navColors: NAV_COLORS_VINTAGE,
  },
  finder: {
    name: 'Finder',
    mode: 'finder',
    background: '#E8F0F8', // light blue like macOS Finder
    text: {
      primary: '#1A3A52', // dark blue
      secondary: '#2E5373', // medium blue
      tertiary: '#5A7A94', // lighter blue
    },
    sidebar: {
      background: '#5A7A94', // blue-gray
    },
    border: '#A8C8E8', // light blue
    card: '#E8F0F8',
    navColors: NAV_COLORS_FINDER,
  },
};
