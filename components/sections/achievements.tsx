'use client';

import { Award, Trophy, Medal, GraduationCap, ExternalLink } from 'lucide-react';
import { achievements, type Achievement } from '@/lib/data';
import { Stagger, StaggerItem } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

const typeIcon: Record<Achievement['type'], typeof Award> = {
  Certification: Award,
  Hackathon: Trophy,
  Achievement: Medal,
  Workshop: GraduationCap,
};

const typeColor: Record<Achievement['type'], string> = {
  Certification: 'text-sky-400 bg-sky-400/10',
  Hackathon: 'text-amber-400 bg-amber-400/10',
  Achievement: 'text-emerald-400 bg-emerald-400/10',
  Workshop: 'text-violet-400 bg-violet-400/10',
};

export function Achievements() {
  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="07 — Achievements"
          title="Certifications & Achievements"
          description="Certifications, hackathons, and milestones. Replace the placeholders with your real accomplishments."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => {
            const Icon = typeIcon[item.type];
            return (
              <StaggerItem key={`${item.title}-${item.date}`}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 transition-colors duration-300 hover:border-primary/40">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${typeColor[item.type]}`}
                    >
                      <Icon size={13} />
                      {item.type}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-primary">
                    {item.issuer}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                    >
                      View credential <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
