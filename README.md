# Iqram Patel — Portfolio (Next.js)

A modern, dark-themed Data Science & Full-Stack Developer portfolio built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features
- Typewriter hero with animated roles
- Scroll-triggered section reveals
- Animated skill progress bars (Full-Stack + Data Science)
- Project cards with category filters
- DS Bootcamp highlight card with progress bar
- Experience timeline
- Contact form
- Fully responsive (mobile-first)
- Custom scrollbar & smooth transitions

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## 🏗️ Project Structure

```
iqram-portfolio/
├── app/
│   ├── globals.css       # Global styles + Tailwind
│   ├── icon.png
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page (assembles sections)
├── components/
│   ├── Navbar.tsx        # Fixed nav with active-section tracking
│   ├── Hero.tsx          # Typewriter hero + avatar card
│   ├── About.tsx         # About + stats
│   ├── Skills.tsx        # Animated skill bars (Dev + DS)
│   ├── Projects.tsx      # Filterable project cards
│   ├── Education.tsx     # Timeline + DS Bootcamp card
│   ├── Contact.tsx       # Contact info + form
│   └── Footer.tsx
├── hooks/
│   └── useInView.ts      # IntersectionObserver for scroll animations
├── public/
│   └── img.jpg
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## 🎨 Design Tokens
- **Background:** `#0A0F1C`
- **Surface:**    `#0F1629`
- **Accent:**     `#00C9B1` (teal)
- **Font:**       Outfit (body) + Syne (headings)

## 📦 Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Icons
- Framer Motion (optional — remove from package.json if not needed)

