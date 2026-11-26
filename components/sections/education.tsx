'use client';

import { GraduationCap } from 'lucide-react';
import { education } from '@/lib/data';
import { Stagger, StaggerItem } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="05 — Education" title="Education" />

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border sm:left-[23px]" />

          <Stagger className="space-y-6">
            {education.map((edu) => (
              <StaggerItem key={edu.degree}>
                <div className="relative pl-14 sm:pl-16">
                  <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-primary sm:h-12 sm:w-12">
                    <GraduationCap size={18} />
                  </div>
                  <div className="rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-medium text-primary">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                        {edu.period}
                      </span>
                    </div>

                    {edu.details.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-3">
                        {edu.details.map((d) => (
                          <div
                            key={d.label}
                            className="rounded-xl border border-border bg-secondary/30 px-4 py-2"
                          >
                            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                              {d.label}
                            </p>
                            <p className="text-base font-semibold text-foreground">
                              {d.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {edu.description && (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {edu.description}
                      </p>
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
