'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Splits text into word spans wrapped in overflow-hidden masks,
 * each animating upward on scroll-into-view via CSS transition.
 * Lightweight, SSR-safe, no external deps.
 */
export function SplitText({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
    if (!('IntersectionObserver' in window)) {
      words.forEach((w) => w.classList.add('split-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            words.forEach((w, i) => {
              w.style.transitionDelay = `${delay + i * 0.06}s`;
              w.classList.add('split-in');
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const words = text.split(' ');

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={reduce ? undefined : undefined}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em' }}
        >
          <span
            data-word
            className="inline-block will-change-transform"
            style={{
              transform: reduce ? 'none' : 'translateY(110%)',
              transition: reduce
                ? 'none'
                : 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
      <style>{`
        .split-in { transform: translateY(0) !important; }
      `}</style>
    </Tag>
  );
}
