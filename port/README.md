# Darshan Satbhai — Portfolio

Creative developer specializing in AI-augmented workflows, React/Framer Motion frontends, and cross-platform Flutter apps. Shipped products range from ultra-low-latency desktop control suites (WinDeck) to elegant music streaming clients (Echo Music).

## Tech Stack

**Frontend:** React · Vite · Framer Motion · GSAP · React Router · Lenis  
**Backend:** Express · MongoDB · Mongoose  
**Mobile:** Flutter  
**AI:** Prompt Engineering · AI Orchestration  

## Getting Started

```bash
git clone https://gitlab.com/darshansatbhai38-group/portfolio-vite.git
cd portfolio-vite
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

Configure environment variables:

```bash
cp .env.example .env
# Then fill in your values
```

## Features

- AI-augmented development workflow
- Framer Motion page transitions
- Spotlight mouse tracking effect
- Cipher text reveal animations
- Parallax scrolling backgrounds
- Mac-style dock
- Command palette (Cmd+K)
- Guestbook (full CRUD)
- Contact form
- Admin panel

## Project Structure

```
src/
  components/     # Reusable UI components
  pages/          # Route pages (Home, About, Projects, Contact, NotFound)
  hooks/          # Custom React hooks
  context/        # React context providers
  styles/         # Global CSS
server/
  routes/         # API endpoints
  models/         # MongoDB schemas
  middleware/     # Auth and other middleware
```

## Deployment

Frontend deploys to Vercel. Backend deploys separately (Railway, Render, Fly.io, etc.).

---

Built with AI-augmented workflows and a lot of caffeine.
