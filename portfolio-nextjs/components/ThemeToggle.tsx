'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  const getButtonStyle = () => {
    switch (mode) {
      case 'light':
        return { backgroundColor: '#FFFFFF', borderColor: 'rgba(0, 0, 0, 0.2)' };
      case 'dark':
        return { backgroundColor: '#000000', borderColor: 'rgba(255, 255, 255, 0.3)' };
      case 'manila':
        return { backgroundColor: '#FFE9A0', borderColor: 'rgba(74, 63, 42, 0.3)' };
      case 'finder':
        return { backgroundColor: '#C8DCF0', borderColor: 'rgba(26, 58, 82, 0.3)' };
    }
  };

  const getNextMode = () => {
    switch (mode) {
      case 'light': return 'dark';
      case 'dark': return 'manila';
      case 'manila': return 'finder';
      case 'finder': return 'light';
    }
  };

  const buttonStyle = getButtonStyle();

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 rounded-full transition-all duration-200 hover:scale-110"
      style={{
        backgroundColor: buttonStyle.backgroundColor,
        border: `1px solid ${buttonStyle.borderColor}`,
      }}
      aria-label="Toggle theme"
      title={`Switch to ${getNextMode()} mode`}
    />
  );
}
