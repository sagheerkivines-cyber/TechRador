import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  // References for instant dot and smooth spring trailing ring
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device has a fine pointer (mouse / trackpad)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      !hasFinePointer;

    if (isTouchDevice) {
      setEnabled(false);
      return;
    }

    // Add class to body to replace system cursor with precision tech cursor
    document.body.classList.add('custom-cursor-enabled');

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Instantaneous zero-delay positioning for center dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Dynamic hover inspection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, textarea, select, [role="button"], [tabindex], article, .cursor-pointer'
      );

      if (interactive) {
        setIsHovered(true);
        // If it's a paper card, show subtle action hint
        if (interactive.tagName === 'ARTICLE' || interactive.closest('article')) {
          setCursorText('VIEW');
        } else if (interactive.tagName === 'BUTTON' && interactive.textContent?.toLowerCase().includes('paper')) {
          setCursorText('READ');
        } else {
          setCursorText(null);
        }
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth spring interpolation loop for the trailing targeting reticle
    const render = () => {
      const ease = 0.22; // snappy yet fluid follower
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Smooth Trailing Reticle / Ring */}
      <div
        ref={cursorRingRef}
        style={{ willChange: 'transform' }}
        className={`fixed -top-5 -left-5 transition-[width,height,opacity,border-color,background-color] duration-150 ease-out flex items-center justify-center rounded-full pointer-events-none ${
          isHovered
            ? 'w-14 h-14 -top-7 -left-7 border-2 border-yellow-400 bg-yellow-400/15 shadow-[0_0_28px_rgba(250,204,21,0.55)] backdrop-blur-[0.5px]'
            : isClicked
            ? 'w-8 h-8 -top-4 -left-4 border border-yellow-300 bg-yellow-400/30 scale-90'
            : 'w-10 h-10 -top-5 -left-5 border border-yellow-400/80 bg-emerald-400/5 shadow-[0_0_12px_rgba(250,204,21,0.25)]'
        }`}
      >
        {/* Cyber Crosshair Reticle Markers on Hover */}
        {isHovered && (
          <>
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-yellow-400 shadow-[0_0_6px_#facc15]" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-yellow-400 shadow-[0_0_6px_#facc15]" />
            <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0.5 h-2 bg-yellow-400 shadow-[0_0_6px_#facc15]" />
            <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-0.5 h-2 bg-yellow-400 shadow-[0_0_6px_#facc15]" />
            
            {cursorText && (
              <span className="text-[9px] font-mono font-bold tracking-widest text-yellow-300 uppercase scale-90">
                {cursorText}
              </span>
            )}
          </>
        )}
      </div>

      {/* Center Laser Precision Dot (Direct at exact mouse position) */}
      <div
        ref={cursorDotRef}
        style={{ willChange: 'transform' }}
        className={`fixed -top-1.5 -left-1.5 rounded-full pointer-events-none transition-all duration-75 ease-out ${
          isHovered
            ? 'w-3 h-3 -top-1.5 -left-1.5 bg-yellow-300 shadow-[0_0_14px_#fde047]'
            : isClicked
            ? 'w-2 h-2 -top-1 -left-1 bg-white scale-125'
            : 'w-2.5 h-2.5 -top-1.25 -left-1.25 bg-yellow-400 shadow-[0_0_8px_#facc15]'
        }`}
      />
    </div>
  );
};
