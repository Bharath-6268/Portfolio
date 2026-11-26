'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { personal, socials, about } from '@/lib/data';
import { GithubIcon, LinkedinIcon, MailIcon } from '@/components/icons';
import { Magnetic } from '@/components/magnetic';

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const portraitX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const portraitY = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const haloX = useTransform(sx, [-0.5, 0.5], [30, -30]);
  const haloY = useTransform(sy, [-0.5, 0.5], [30, -30]);

  useEffect(() => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mx, my, reduce]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.2 },
    },
  };
  const item = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-ink-2 pt-28 pb-16"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <motion.div
          style={{ x: haloX, y: haloY }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-[130px] animate-pulse-glow"
        />
        <div className="absolute bottom-10 right-10 h-[300px] w-[300px] rounded-full bg-lime/8 blur-[120px]" />
      </div>

      {/* Floating particles */}
      {!reduce && <Particles />}

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={item}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1.5 text-xs font-medium text-electric"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Available for internship & full-time opportunities
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              variants={item}
              transition={{ duration: 0.8 }}
              className="font-display text-5xl font-normal leading-[0.95] tracking-tight text-ivory sm:text-6xl lg:text-7xl"
            >
              {personal.heroHeadline.split(' ').map((word, i) => (
                <span key={i} className="inline-block">
                  {word === "I'M" ? (
                    <span className="text-stroke text-ivory">{word}</span>
                  ) : (
                    word
                  )}{' '}
                </span>
              ))}
            </motion.h1>
            <motion.p
              variants={item}
              className="font-sans text-lg font-medium text-steel sm:text-xl"
            >
              {personal.heroSub}
            </motion.p>
          </div>

          <motion.p
            variants={item}
            className="max-w-lg text-sm leading-relaxed text-steel/80 sm:text-base"
          >
            {personal.intro}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
            <Magnetic as="a" href="#projects" strength={0.4}>
              <span className="group inline-flex items-center gap-2 rounded-xl bg-electric px-5 py-3 text-sm font-semibold text-ivory transition-shadow hover:shadow-lg hover:shadow-electric/30">
                Explore My Work
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </span>
            </Magnetic>
            <Magnetic as="a" href={personal.resumePath} strength={0.4} aria-label="Download Resume">
              <span className="group inline-flex items-center gap-2 rounded-xl border border-steel/30 bg-white/5 px-5 py-3 text-sm font-semibold text-ivory backdrop-blur-sm transition-colors hover:border-lime/50 hover:text-lime">
                <Download size={16} />
                Download Resume
              </span>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-4 pt-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-steel/60">
              Connect
            </span>
            <span className="h-px w-8 bg-steel/30" />
            <div className="flex items-center gap-3">
              <SocialLink href={socials.github} label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={socials.linkedin} label="LinkedIn">
                <LinkedinIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href={`mailto:${personal.email}`} label="Email">
                <MailIcon className="h-5 w-5" />
              </SocialLink>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: 3D portrait */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="perspective-2000 relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, x: portraitX, y: portraitY }}
            className="preserve-3d relative h-full w-full"
          >
            {/* Gradient halo */}
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-electric via-lime/40 to-electric/20 blur-2xl" />
            <div className="absolute inset-4 -z-10 rounded-full bg-gradient-to-tr from-electric/30 to-lime/20 blur-xl" />

            {/* Orbital rings */}
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-electric/20" />
            <div className="absolute inset-6 animate-spin-reverse rounded-full border border-lime/15" />
            <div className="absolute inset-12 animate-spin-slow rounded-full border border-steel/15" />

            {/* Orbital nodes */}
            <OrbitNode className="left-1/2 top-0 -translate-x-1/2" icon={<Sparkles size={14} />} />
            <OrbitNode
              className="right-0 top-1/2 -translate-y-1/2"
              label="C++"
              accent="text-lime"
            />
            <OrbitNode
              className="bottom-0 left-1/2 -translate-x-1/2"
              label="DS"
              accent="text-electric"
            />
            <OrbitNode
              className="left-0 top-1/2 -translate-y-1/2"
              label="JS"
              accent="text-steel"
            />

            {/* Portrait */}
            <div className="absolute inset-12 overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-transparent">
              {personal.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                  <span className="font-display text-7xl font-normal text-ivory">
                    {personal.firstName[0]}
                    {personal.lastName[0]}
                  </span>
                  <span className="font-mono text-[10px] text-steel/70">
                    add photo in lib/data.ts
                  </span>
                </div>
              )}
            </div>

            {/* Floating identity labels */}
            <FloatLabel
              className="-left-8 top-10"
              text={about.identityLabels[0]}
              delay={0}
            />
            <FloatLabel
              className="-right-6 top-24"
              text={about.identityLabels[1]}
              delay={1.5}
            />
            <FloatLabel
              className="-left-4 bottom-16"
              text={about.identityLabels[2]}
              delay={0.8}
            />
            <FloatLabel
              className="-right-10 bottom-8"
              text={about.identityLabels[3]}
              delay={2.2}
            />

            {/* Status badge */}
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-ink-2/80 px-4 py-2 text-xs font-medium text-ivory backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Open to work
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-steel/60 transition-colors hover:text-electric sm:flex"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </a>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-steel/20 bg-white/5 text-steel transition-all hover:border-electric/50 hover:text-electric"
    >
      {children}
    </a>
  );
}

function OrbitNode({
  className,
  icon,
  label,
  accent = 'text-electric',
}: {
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  accent?: string;
}) {
  return (
    <div
      className={`absolute flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-2/80 text-xs font-mono font-semibold backdrop-blur-md ${accent} ${className}`}
    >
      {icon || label}
    </div>
  );
}

function FloatLabel({
  className,
  text,
  delay,
}: {
  className?: string;
  text: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? {} : { y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
      className={`absolute rounded-lg border border-white/10 bg-ink-2/70 px-2.5 py-1 font-mono text-[10px] font-medium text-ivory backdrop-blur-md ${className}`}
    >
      {text}
    </motion.div>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 2 + (i % 3);
        const dur = 8 + (i % 5) * 2;
        const delay = (i % 6) * 0.7;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-electric/40"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        );
      })}
    </div>
  );
}
