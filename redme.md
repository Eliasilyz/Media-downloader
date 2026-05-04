# SaveFlow

## Overview

Single-repo React + Vite app using TypeScript. **SaveFlow** adalah website media downloader multi-platform untuk domain `tools.farelhanafi.my.id`.

## Project: SaveFlow

**Media Downloader** untuk TikTok, Instagram, Facebook, Twitter, dan YouTube.

## Structure

```
media-downloader/
├── src/
│   ├── components/
│   ├── pages/
│   └── lib/
│       └── api.ts        — stub hooks (ganti dengan fetch ke API server)
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .env
```

## Frontend Routes

- `/` — Homepage with smart URL detector, platform grid, features, SEO content, FAQ
- `/dl/tiktok` — TikTok downloader (HD no watermark, slide photos, MP3)
- `/dl/instagram` — Instagram downloader (Reel, carousel, photos)
- `/dl/facebook` — Facebook downloader (HD/SD video)
- `/dl/twitter` — Twitter/X downloader (multi-quality video)
- `/dl/youtube` — YouTube downloader (up to 1080p, MP3 converter)

## API Endpoints (server terpisah, port 8080)

- `POST /api/download` — generic auto-detect downloader
- `POST /api/download/tiktok` — TikTok via tikwm.com
- `POST /api/download/instagram` — Instagram via instanavigation.com
- `POST /api/download/facebook` — Facebook via getfvid.com
- `POST /api/download/twitter` — Twitter/X via twitsave.com
- `POST /api/download/youtube` — YouTube via y2mate.guru

## Key Components

- `src/components/Navbar.tsx` — Fixed navbar with platform links
- `src/components/Footer.tsx` — Multi-column footer with links
- `src/components/AdSense.tsx` — Google AdSense slots
- `src/components/DownloaderForm.tsx` — URL input with platform validation
- `src/components/MediaResult.tsx` — Download results with video/audio/image options
- `src/components/HistoryPanel.tsx` — localStorage download history (10 items)
- `src/components/PageSeo.tsx` — react-helmet-async SEO metadata
- `src/pages/DownloaderPage.tsx` — Shared downloader page template

## Design System

| Token      | Value                  |
|------------|------------------------|
| Background | `#111827` (gray-900)   |
| Card       | `#1F2937` (gray-800)   |
| Accent     | `#3B82F6` (blue-500)   |
| Text       | `#F9FAFB` (gray-50)    |
| Muted      | `#9CA3AF` (gray-400)   |
| Border     | `#374151` (gray-700)   |
| Font       | Inter (Google Fonts)   |
| Animation  | Framer Motion          |

> Theme: **always dark**, no light mode.

## Key Libraries

- `wouter` — client-side routing
- `react-helmet-async` — SEO metadata
- `framer-motion` — animations
- `react-icons` — platform icons (SiTiktok, SiInstagram, dll)
- `sonner` — toast notifications
- `@tanstack/react-query` — API state management
- `tailwindcss` v4 + `@tailwindcss/vite` — styling

## Environment Variables

Buat file `.env` di root project:

```env
VITE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
```

## Stack

- **Node.js**: 24
- **Package manager**: npm
- **TypeScript**: 5.x
- **Build tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Validation**: Zod v3

## Commands

```bash
npm i            # install dependencies
npm run dev      # dev server (default port 5173)
npm run build    # production build → dist/public
npm run serve    # preview production build
npm run typecheck  # TypeScript check tanpa emit
```