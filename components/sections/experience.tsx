'use client';

import { Briefcase, CheckCircle2 } from 'lucide-react';
import { experiences } from '@/lib/data';
import { Stagger, StaggerItem } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

export function Experience() {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="04 — Experience"
          title="Experience"
          description="Internships, roles, and responsibilities. This section is hidden when empty."
        />

        <div className="relative">
          {/* timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border sm:left-[23px]" />

          <Stagger className="space-y-6">
            {experiences.map((exp) => (
              <StaggerItem key={`${exp.role}-${exp.company}`}>
                <div className="relative pl-14 sm:pl-16">
                  <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-primary sm:h-12 sm:w-12">
                    <Briefcase size={18} />
                  </div>
                  <div className="rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {exp.company}
                        </p>
                      </div>
                      <span className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    )}
                    {exp.achievements.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {exp.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2
                              size={16}
                              className="mt-0.5 shrink-0 text-primary/70"
                            />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
