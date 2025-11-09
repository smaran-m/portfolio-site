# sammish Portfolio

Modern portfolio website built with Next.js featuring art gallery, music player, and blog.

## Features

- **Interactive Canvas Animation**: Click-responsive ripple effects with animated fish creature
- **Art Gallery**: Modal-based image viewer with keyboard navigation
- **Music Player**: Web Audio API visualizer with ASCII rendering
- **Blog System**: Markdown-based posts with tags and GitHub Issues comments (Utterances)
- **Static Export**: Fully static site that can be hosted anywhere

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS v4**
- **Gray-matter** for frontmatter parsing
- **Remark** for markdown processing
- **Feed** for RSS generation

## Design Philosophy

- Greyscale palette with #ffa07a salmon accent
- Clean technical/editorial aesthetic
- ASCII art as subtle decorative elements
- Minimalist, readable information design

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

This creates a static export in the `out/` directory.

## Project Structure

```
portfolio-nextjs/
├── app/                # Next.js App Router pages
│   ├── art/           # Art gallery
│   ├── music/         # Music player
│   ├── blog/          # Blog system
│   ├── about/         # About page
│   └── page.tsx       # Home page
├── components/        # React components
├── content/           # Blog posts (Markdown)
│   └── posts/
├── lib/               # Utilities
├── public/            # Static assets
│   └── assets/
└── next.config.ts     # Next.js config
```

## Writing Blog Posts

Create a new `.md` file in `content/posts/`:

```markdown
---
title: "Your Post Title"
date: "2024-11-08"
tags: ["tag1", "tag2"]
description: "Brief description"
author: "Your Name"
---

# Your Content Here

Write your post in Markdown...
```

## Enabling Comments

1. Create a public GitHub repository for comments
2. Install Utterances app on that repository
3. Edit `app/blog/[slug]/page.tsx`
4. Uncomment the `<Comments>` component and add your repo:
   ```tsx
   <Comments repo="username/repo" />
   ```

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Build settings are already configured in `netlify.toml`
4. Deploy!

### Cloudflare Pages

1. Push your code to GitHub
2. Create new Cloudflare Pages project
3. Build command: `npm run build`
4. Build output directory: `out`
5. Deploy!

## Customization

### Colors

Edit `app/globals.css` to change the color palette.

### Site Metadata

Update `app/layout.tsx` and `lib/rss.ts` with your information.

## Author

Smaran (sammish)
- Bluesky: [@sammi.sh](https://bsky.app/profile/sammi.sh)
- YouTube: [@sammish](https://www.youtube.com/@sammish/)
