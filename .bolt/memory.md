# Project memory

## Product intent & audience

- Personal portfolio website for Bharath Taninki, B.Tech CSE student (graduation 2028, CGPA 8.13) preparing for campus placements.
- Audience: technical recruiters and placement officers; must look like a premium software developer's personal site.

## Brand personality & voice

- Professional, developer-focused, premium, not generic.
- Clear and concise; suitable for competitive campus placement context.

## Visual design & UX direction

- Elegant dark theme; near-black background with subtle gradients.
- Modern typography with generous spacing; glassmorphism used sparingly.
- Framer Motion for staggered hero entrance, scroll-triggered section reveals, project card hover effects, animated navbar, subtle background gradients.
- `prefers-reduced-motion` respected.
- Fully responsive across all screen sizes; accessible color contrast.
- Inline SVG icons used for coding-platform profile cards (GitHub, LinkedIn, CodeChef, LeetCode) for reliable rendering.
- Layout: ten sections — Hero, About, Skills, Projects, Experience (auto-hidden if empty), Education timeline, Coding Profiles, Certifications & Achievements, Contact, Footer with back-to-top.

## Decisions, constraints & rationale

- Stack: Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React; deployment target Vercel.
- All editable content centralized in `lib/data.ts` so sections update without touching components.
- Projects, experiences, and certifications use clearly marked placeholders — no fabricated skills, projects, internships, or achievements.
- LeetCode profile URL left as configurable placeholder.
- Resume download links to a placeholder PDF in `public/` to be replaced by the real file.
- Profile image is a placeholder in `public/` pending real photo.
- SEO: metadata in layout, JSON-LD structured data, semantic markup.
- Reusable React components for section composition.

## Open questions & assumptions

- Real LeetCode public profile URL still needed.
- Actual projects, internships/experiences, certifications, and skills yet to be provided by user.
- Real profile photo and `resume.pdf` file need to be dropped into `public/`.
- Proficiency levels for skills not specified by user; placeholders remain editable.