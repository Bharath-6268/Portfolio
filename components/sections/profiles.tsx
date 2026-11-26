'use client';

import { useRef, type MouseEvent } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { codingProfiles, type CodingProfile } from '@/lib/data';
import { Stagger, StaggerItem } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';
import {
  GithubIcon,
  LinkedinIcon,
  CodechefIcon,
  LeetcodeIcon,
} from '@/components/icons';

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  codechef: CodechefIcon,
  leetcode: LeetcodeIcon,
};

const accentMap: Record<CodingProfile['icon'], string> = {
  github: '#a6b6d9',
  linkedin: '#526bff',
  codechef: '#b7f36b',
  leetcode: '#b7f36b',
};

export function Profiles() {
  return (
    <section
      id="profiles"
      className="relative overflow-hidden bg-ink-2 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-[300px] w-[400px] rounded-full bg-electric/8 blur-[130px]" />
        <div className="absolute right-10 bottom-10 h-[260px] w-[300px] rounded-full bg-lime/6 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="06 — Profiles"
          title="Coding Profiles"
          description="Where I practice, build, and share my work."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {codingProfiles.map((profile) => (
            <StaggerItem key={profile.name}>
              <ProfileCard profile={profile} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ProfileCard({ profile }: { profile: CodingProfile }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const accent = accentMap[profile.icon];
  const Icon = iconMap[profile.icon];

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.a
      ref={ref}
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      data-cursor-label="Visit"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="group preserve-3d relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-2xl border border-steel/15 bg-gradient-to-br from-white/[0.06] to-transparent p-6 transition-colors duration-300 hover:border-electric/50"
    >
      {/* Glowing edge */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: accent }}
      />
      <div className="flex w-full items-center justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-steel/20 bg-white/5 transition-colors group-hover:border-transparent"
          style={{ color: accent }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <ArrowUpRight
          size={18}
          className="text-steel/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-ivory">{profile.name}</h3>
        <p className="font-mono text-sm text-steel/70">@{profile.handle}</p>
      </div>
    </motion.a>
  );
}
