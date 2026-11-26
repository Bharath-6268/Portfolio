'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, CalendarDays } from 'lucide-react';
import { about, personal } from '@/lib/data';
import { SplitText } from '@/components/split-text';
import { Reveal } from '@/components/motion';

export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="about" className="section-light relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-light opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -left-20 top-1/3 h-[300px] w-[300px] rounded-full bg-electric/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Eyebrow */}
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="h-px w-10 bg-electric/60" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-electric">
            {about.eyebrow}
          </span>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Left: editorial text */}
          <div className="space-y-8">
            <SplitText
              as="h2"
              text={about.heading}
              className="font-display text-5xl font-normal leading-[1] tracking-tight text-ink sm:text-6xl lg:text-7xl"
            />

            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="max-w-xl text-base leading-relaxed text-ink/70 sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Stats */}
            <Reveal delay={0.2} className="flex flex-wrap gap-8 pt-4">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-normal text-ink">
                    {s.value}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-ink/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Right: highlight cards + parallax visual */}
          <div className="space-y-4">
            <motion.div
              ref={ref}
              style={reduce ? undefined : { y }}
              className="relative mb-6 overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-ink to-ink-2 p-8 text-ivory"
            >
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="relative">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
                  Currently
                </span>
                <p className="mt-3 font-display text-2xl leading-tight">
                  Pursuing {personal.degree}
                </p>
                <p className="mt-2 text-sm text-steel">
                  Focused on software development, competitive programming,
                  and core CS fundamentals.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['C++', 'DSA', 'React', 'Problem Solving'].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-ivory/20 bg-ivory/5 px-3 py-1 font-mono text-xs text-ivory/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {about.highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.1 * i}>
                <HighlightCard label={h.label} value={h.value} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightCard({ label, value }: { label: string; value: string }) {
  const Icon =
    label === 'Degree' ? GraduationCap : label === 'CGPA' ? Award : CalendarDays;
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-ink/10 bg-white/40 p-4 backdrop-blur-sm transition-all hover:border-electric/40 hover:shadow-lg hover:shadow-electric/5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors group-hover:bg-electric/20">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-ink/50">
          {label}
        </p>
        <p className="text-lg font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
