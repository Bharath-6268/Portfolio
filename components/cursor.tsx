'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Refined custom cursor for desktop (pointer: fine).
 * Hidden on touch devices. Renders a small dot + outer ring that
 * expands over interactive elements and shows contextual labels.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'view'>('default');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (reduce) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-none-desktop');

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement;
      const interactive = t.closest(
        'a, button, [data-cursor], input, textarea, [role="button"]'
      ) as HTMLElement | null;
      if (interactive) {
        const c = interactive.getAttribute('data-cursor');
        if (c === 'view') {
          setVariant('view');
          setLabel(interactive.getAttribute('data-cursor-label') || 'View');
        } else {
          setVariant('hover');
          setLabel('');
        }
      } else {
        setVariant('default');
        setLabel('');
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-none-desktop');
    };
  }, [reduce]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-electric"
      />
      <motion.div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] flex items-center justify-center rounded-full border border-electric/60"
        animate={{
          width: variant === 'view' ? 88 : variant === 'hover' ? 48 : 32,
          height: variant === 'view' ? 88 : variant === 'hover' ? 48 : 32,
          backgroundColor:
            variant === 'view'
              ? 'rgba(82,107,255,0.9)'
              : 'rgba(82,107,255,0)',
          borderColor:
            variant === 'view' ? 'rgba(82,107,255,0)' : 'rgba(82,107,255,0.6)',
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <AnimatePresence>
          {variant === 'view' && label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ivory"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
