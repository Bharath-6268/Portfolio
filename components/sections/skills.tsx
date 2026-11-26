'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Code2, Globe, Database, Wrench, Cpu, ArrowRight, type LucideIcon } from 'lucide-react';
import { skills, type SkillCategory } from '@/lib/data';
import { SectionHeading } from '@/components/section-heading';
import { Stagger, StaggerItem } from '@/components/motion';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Globe,
  Database,
  Wrench,
  Cpu,
};

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-[320px] w-[400px] rounded-full bg-electric/8 blur-[130px]" />
        <div className="absolute left-10 bottom-10 h-[260px] w-[300px] rounded-full bg-lime/6 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="02 — Skills"
          title="The toolkit"
          description="Categories I work in. Hover a card to flip it and see the stack. Replace these with your actual skills in the data file."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category) => (
            <StaggerItem key={category.title}>
              <FlipCard category={category} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FlipCard({ category }: { category: SkillCategory }) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const Icon = iconMap[category.icon] ?? Code2;

  return (
    <div
      className="group perspective-1000 h-72 cursor-pointer"
      data-cursor="hover"
      onMouseEnter={() => !reduce && setFlipped(true)}
      onMouseLeave={() => !reduce && setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <motion.div
        animate={reduce ? {} : { rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="preserve-3d relative h-full w-full"
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-2xl border border-steel/15 bg-gradient-to-br from-white/[0.06] to-transparent p-6 transition-colors group-hover:border-electric/40">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-electric/0 to-electric/0 opacity-0 transition-opacity duration-500 group-hover:from-electric/10 group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric transition-transform group-hover:scale-110">
              <Icon size={22} />
            </div>
            <span className="font-mono text-xs text-steel/50">
              {String(category.skills.length).padStart(2, '0')}
            </span>
          </div>
          <div className="relative">
            <h3 className="font-display text-2xl text-ivory">{category.title}</h3>
            <p className="mt-1 text-sm text-steel/70">{category.blurb}</p>
          </div>
          <div className="relative flex items-center gap-1.5 text-xs text-steel/50">
            <span className="font-mono uppercase tracking-wider">Hover to flip</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Back */}
        <div
          style={{ transform: 'rotateY(180deg)' }}
          className="backface-hidden absolute inset-0 flex flex-col rounded-2xl border border-electric/40 bg-gradient-to-br from-electric/10 to-ink p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Icon size={18} className="text-electric" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-electric">
              {category.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 content-start">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-steel/20 bg-white/5 px-3 py-1.5 text-sm font-medium text-ivory transition-colors hover:border-lime/50 hover:text-lime"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
