import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { personal, socials } from '@/lib/data';

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = 'https://bharath-taninki.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — Building ideas into digital experiences`,
    template: `%s | ${personal.name}`,
  },
  description: personal.tagline,
  keywords: [
    'Bharath Taninki',
    'Computer Science',
    'Software Developer',
    'B.Tech CSE',
    'Portfolio',
    'Competitive Programming',
    'Web Developer',
    'Campus Placements',
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${personal.name} — Building ideas into digital experiences`,
    description: personal.tagline,
    siteName: `${personal.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personal.name} — Building ideas into digital experiences`,
    description: personal.tagline,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  jobTitle: 'Computer Science Student & Developer',
  email: `mailto:${personal.email}`,
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'B.Tech Computer Science and Engineering',
  },
  sameAs: [socials.github, socials.linkedin, socials.codechef, socials.leetcode],
  knowsAbout: [
    'Software Development',
    'Competitive Programming',
    'Data Structures',
    'Algorithms',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
