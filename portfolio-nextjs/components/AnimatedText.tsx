'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const [colorIndices, setColorIndices] = useState<Record<number, number>>({});
  const intervalRefs = useRef<Record<number, NodeJS.Timeout>>({});
  const { theme } = useTheme();

  const startColorCycle = (charIndex: number) => {
    // Clear any existing interval
    if (intervalRefs.current[charIndex]) {
      clearInterval(intervalRefs.current[charIndex]);
    }

    let currentColorIndex = 0;

    intervalRefs.current[charIndex] = setInterval(() => {
      currentColorIndex = (currentColorIndex + 1) % theme.navColors.length;
      setColorIndices(prev => ({ ...prev, [charIndex]: currentColorIndex }));
    }, 150); // Cycle through colors every 150ms
  };

  const stopColorCycle = (charIndex: number) => {
    if (intervalRefs.current[charIndex]) {
      clearInterval(intervalRefs.current[charIndex]);
      delete intervalRefs.current[charIndex];
    }
    // Reset to black
    setColorIndices(prev => {
      const newIndices = { ...prev };
      delete newIndices[charIndex];
      return newIndices;
    });
  };

  useEffect(() => {
    // Cleanup intervals on unmount
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  return (
    <div className={`inline-block ${className}`} style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      {text.split('').map((char, index) => {
        const colorIndex = colorIndices[index];
        const color = colorIndex !== undefined ? theme.navColors[colorIndex] : theme.text.primary;

        return (
          <span
            key={index}
            onMouseEnter={() => startColorCycle(index)}
            onMouseLeave={() => stopColorCycle(index)}
            className="inline-block transition-colors duration-150 cursor-default"
            style={{
              color,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
}
