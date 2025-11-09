'use client';

import { useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface Ripple {
  x: number;
  y: number;
  time: number;
  speed: number;
  height: number;
  wavelength: number;
  thickness: number;
  opacity: number;
}

interface Position {
  x: number;
  y: number;
}

const NUM_SEGMENTS = 10;
const SEGMENT_LENGTH = 15;
const FISH_CHAR_SET = "-∘◦•○◎◍●◉⬤";
const TARGET_INTERVAL = 1; // seconds

export default function RippleCanvas() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const fishPositionsRef = useRef<Position[]>([]);
  const fishSizesRef = useRef<number[]>([]);
  const followCursorRef = useRef(false);
  const targetPointRef = useRef<Position | null>(null);
  const lastTargetTimeRef = useRef(0);
  const mousePositionRef = useRef<Position>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastFrameTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Initialize canvas size and fish
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeFish();
    };

    const initializeFish = () => {
      fishPositionsRef.current = [];
      for (let i = 0; i < NUM_SEGMENTS; i++) {
        fishPositionsRef.current.push({ x: canvas.width / 2, y: canvas.height / 2 });
      }

      fishSizesRef.current = [];
      const halfLength = (NUM_SEGMENTS - 1) / 2;
      for (let i = 0; i < NUM_SEGMENTS; i++) {
        let size;
        if (i <= halfLength) {
          size = Math.floor((i / halfLength) * (FISH_CHAR_SET.length - 1));
        } else {
          size = Math.floor(((NUM_SEGMENTS - 1 - i) / halfLength) * (FISH_CHAR_SET.length - 1));
        }
        fishSizesRef.current.push(size);
      }
    };

    const generateRandomTarget = () => {
      const cellWidth = 10;
      const cellHeight = 20;
      const cols = Math.floor(canvas.width / cellWidth);
      const rows = Math.floor(canvas.height / cellHeight);
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      targetPointRef.current = {
        x: col * cellWidth + cellWidth / 2,
        y: row * cellHeight + cellHeight / 2,
      };
    };

    const updateFishPositions = (deltaTime: number) => {
      const currentTime = performance.now() / 1000;
      let targetX: number, targetY: number;

      if (followCursorRef.current) {
        targetX = mousePositionRef.current.x;
        targetY = mousePositionRef.current.y;
      } else {
        if (targetPointRef.current === null || currentTime - lastTargetTimeRef.current >= TARGET_INTERVAL) {
          generateRandomTarget();
          lastTargetTimeRef.current = currentTime;
        }
        targetX = targetPointRef.current!.x;
        targetY = targetPointRef.current!.y;
      }

      // Update head position
      let headX = fishPositionsRef.current[0].x;
      let headY = fishPositionsRef.current[0].y;

      const dx = targetX - headX;
      const dy = targetY - headY;
      const distance = Math.hypot(dx, dy);

      if (distance > 1) {
        const speed = 600; // pixels per second (doubled for faster movement!)
        const moveDistance = speed * deltaTime; // move based on elapsed time
        const moveX = (dx / distance) * moveDistance;
        const moveY = (dy / distance) * moveDistance;
        headX += moveX;
        headY += moveY;
        fishPositionsRef.current[0] = { x: headX, y: headY };
      }

      // Update other segments to follow
      for (let i = 1; i < NUM_SEGMENTS; i++) {
        const prevPos = fishPositionsRef.current[i - 1];
        const currentPos = fishPositionsRef.current[i];

        const dx = prevPos.x - currentPos.x;
        const dy = prevPos.y - currentPos.y;
        const dist = Math.hypot(dx, dy);

        if (dist > SEGMENT_LENGTH) {
          const angle = Math.atan2(dy, dx);
          fishPositionsRef.current[i] = {
            x: prevPos.x - Math.cos(angle) * SEGMENT_LENGTH,
            y: prevPos.y - Math.sin(angle) * SEGMENT_LENGTH,
          };
        }
      }
    };

    const amplitudeToColor = (amplitude: number): string => {
      let normalizedValue = (amplitude + 1) / 2; // 0 to 1

      if (theme.mode === 'dark') {
        // For dark mode: 0-128 (dark to mid grays)
        let colorValue = Math.floor(normalizedValue * 128);
        colorValue = Math.max(0, Math.min(128, colorValue));
        return `rgba(${colorValue}, ${colorValue}, ${colorValue}, ${Math.abs(amplitude)})`;
      } else if (theme.mode === 'manila') {
        // For manila mode: use warm yellowish-brown tones
        let r = Math.floor(normalizedValue * 100 + 120); // 120-220
        let g = Math.floor(normalizedValue * 80 + 90); // 90-170
        let b = Math.floor(normalizedValue * 40 + 40); // 40-80
        return `rgba(${r}, ${g}, ${b}, ${Math.abs(amplitude)})`;
      } else if (theme.mode === 'finder') {
        // For finder mode: use cool blue tones
        let r = Math.floor(normalizedValue * 80 + 100); // 100-180
        let g = Math.floor(normalizedValue * 90 + 140); // 140-230
        let b = Math.floor(normalizedValue * 70 + 180); // 180-250
        return `rgba(${r}, ${g}, ${b}, ${Math.abs(amplitude)})`;
      } else {
        // For light mode: 127-255 (light grays)
        let colorValue = Math.floor(normalizedValue * 255);
        colorValue = Math.max(127, Math.min(255, colorValue));
        return `rgba(${colorValue}, ${colorValue}, ${colorValue}, ${Math.abs(amplitude)})`;
      }
    };

    const updateCanvas = (timestamp: number) => {
      // Calculate delta time in seconds
      const currentTime = timestamp / 1000;
      const deltaTime = lastFrameTimeRef.current === 0 ? 0 : currentTime - lastFrameTimeRef.current;
      lastFrameTimeRef.current = currentTime;

      context.clearRect(0, 0, canvas.width, canvas.height);
      const cellWidth = 10;
      const cellHeight = 20;
      const cols = Math.floor(canvas.width / cellWidth);
      const rows = Math.floor(canvas.height / cellHeight);
      const charSet = "-∘◦•○◎◍●◉⬤";

      updateFishPositions(deltaTime);

      context.font = '12px Courier';

      // Render ripples only (no fish check)
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const cellX = col * cellWidth + cellWidth / 2;
          const cellY = row * cellHeight + cellHeight / 2;

          let totalAmplitude = 0;

          for (const ripple of ripplesRef.current) {
            const dx = cellX - ripple.x;
            const dy = cellY - ripple.y;
            const distance = Math.hypot(dx, dy);
            const elapsed = currentTime - ripple.time / 1000; // ripple.time is in ms

            const phase = (distance - ripple.speed * elapsed) * (2 * Math.PI / ripple.wavelength);
            let amplitude = ripple.height * Math.cos(phase) * (1 / (1 + elapsed)) * ripple.opacity;

            if (Math.abs(distance - ripple.speed * elapsed) < ripple.thickness) {
              totalAmplitude += amplitude;
            }
          }

          if (Math.abs(totalAmplitude) >= 0.01) {
            let normalizedAmplitude = Math.tanh(totalAmplitude);
            normalizedAmplitude = (normalizedAmplitude + 1) / 2;
            let index = Math.floor(normalizedAmplitude * (charSet.length - 1));
            index = Math.max(0, Math.min(charSet.length - 1, index));
            const char = charSet.charAt(index);

            const color = amplitudeToColor(totalAmplitude);
            context.fillStyle = color;
            context.fillText(char, cellX, cellY);
          }
        }
      }

      // Draw fish on top (snap to grid for crisp rendering)
      context.fillStyle = "#FF6666";
      for (let i = 0; i < fishPositionsRef.current.length; i++) {
        const pos = fishPositionsRef.current[i];
        const char = FISH_CHAR_SET.charAt(fishSizesRef.current[i]);
        // Snap to grid for crisp rendering like ripples
        const snappedX = Math.floor(pos.x / cellWidth) * cellWidth + cellWidth / 2;
        const snappedY = Math.floor(pos.y / cellHeight) * cellHeight + cellHeight / 2;
        context.fillText(char, snappedX, snappedY);
      }

      // Draw cursor indicator in follow mode
      if (followCursorRef.current) {
        const cursorCol = Math.floor(mousePositionRef.current.x / cellWidth);
        const cursorRow = Math.floor(mousePositionRef.current.y / cellHeight);
        const cursorX = cursorCol * cellWidth + cellWidth / 2;
        const cursorY = cursorRow * cellHeight + cellHeight / 2;
        context.fillStyle = "#ffa07a";
        context.fillText('◓', cursorX, cursorY);
      }

      // Clean up old ripples
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        return (currentTime - ripple.time / 1000) * ripple.speed < Math.max(canvas.width, canvas.height) * 1.5;
      });

      animationFrameRef.current = requestAnimationFrame(updateCanvas);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Toggle mode
      followCursorRef.current = !followCursorRef.current;

      // Add ripple
      ripplesRef.current.push({
        x,
        y,
        time: performance.now(), // store in milliseconds
        speed: 200 + Math.random() * 100,
        height: 1 + Math.random(),
        wavelength: 50 + Math.random() * 50,
        thickness: 100 + Math.random() * 50,
        opacity: 0.8 + Math.random() * 0.2,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);

    animationFrameRef.current = requestAnimationFrame(updateCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, backgroundColor: theme.background }}
    />
  );
}
