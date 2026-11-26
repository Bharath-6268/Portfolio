'use client';

import { Reveal } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';
import { personal, socials } from '@/lib/data';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from '@/components/icons';

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[130px]" />
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-8 text-center glass sm:p-12">
          <SectionHeading
            eyebrow="08 — Contact"
            title="Let's build something"
            description="I'm actively seeking internship and full-time opportunities. Whether you have a question or just want to connect, my inbox is always open."
            className="mx-auto mb-8 text-center [&>div]:justify-center"
          />

          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            <MailIcon className="h-5 w-5" />
            {personal.email}
          </a>

          <div className="mt-8 flex items-center justify-center gap-4">
            <ContactLink href={socials.github} label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </ContactLink>
            <ContactLink href={socials.linkedin} label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </ContactLink>
            <ContactLink href={`mailto:${personal.email}`} label="Email">
              <MailIcon className="h-5 w-5" />
            </ContactLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactLink({
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
      className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary/40 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
    >
      {children}
    </a>
  );
}
