'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { projects, type Project } from '@/lib/data';
import { Stagger, StaggerItem } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

export function Projects() {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="section-light relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-light opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="absolute right-0 top-1/4 h-[320px] w-[400px] rounded-full bg-electric/10 blur-[130px]" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="03 — Projects"
          title="Selected work"
          description="A selection of projects I've built. Each card tilts toward your cursor with a moving spotlight."
        />

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);
  const spotX = useTransform(sx, (v) => `${v * 100}%`);
  const spotY = useTransform(sy, (v) => `${v * 100}%`);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
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
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      data-cursor="view"
      data-cursor-label="View"
      className="group preserve-3d relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/50 p-6 backdrop-blur-sm transition-colors hover:border-electric/40"
    >
      {/* Spotlight */}
      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [spotX, spotY],
              ([x, y]) =>
                `radial-gradient(420px circle at ${x} ${y}, rgba(82,107,255,0.12), transparent 60%)`
            ),
          }}
        />
      )}

      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-electric transition-transform group-hover:scale-110">
          <FolderGit2 size={20} />
        </div>
        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Repository"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 text-ink/60 transition-colors hover:border-electric hover:text-electric"
            >
              <Github size={16} />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 text-ink/60 transition-colors hover:border-electric hover:text-electric"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <h3 className="relative mb-2 text-lg font-semibold text-ink">
        {project.title}
      </h3>
      <p className="relative mb-5 text-sm leading-relaxed text-ink/60">
        {project.description}
      </p>

      <div className="relative mt-auto flex flex-wrap gap-2 pt-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-ink/10 bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/70"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-4 inline-flex items-center gap-1 text-sm font-medium text-electric opacity-0 transition-opacity group-hover:opacity-100"
        >
          View code <ArrowUpRight size={14} />
        </a>
      )}
    </motion.div>
  );
}
