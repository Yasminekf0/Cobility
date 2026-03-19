# Cobility

**Navigation and daily planning for neurodivergent users.**

Cobility is a mobile-first web app that helps people with ADHD, autism, and other invisible disabilities move through their day with less friction. It combines AR-guided navigation, calendar planning, and an AI copilot into one calm, personalized experience.

Built in 12 hours for a Microsoft-sponsored invisible disability hackathon.

---

## The Problem

1 in 7 people are neurodivergent. For many of them, navigating a new building, managing a packed schedule, or recovering from sensory overwhelm isn't just inconvenient — it's exhausting in ways that are invisible to everyone around them. Existing tools are built for neurotypical users and offer no accommodation for executive function, sensory load, or energy management.

---

## What It Does

**AR Navigation** — Point your camera and follow a guided path to your destination. Choose between a classic blue line or a character companion (Leo 🦁, Benny 🐻, Finn 🦊) depending on what works for you.

**Daily Planner** — Syncs with your Outlook or Google Calendar and shows your day as a prioritized task list, each task tagged with an estimated energy cost so you can pace yourself.

**AI Copilot** — A conversational assistant that knows your schedule and adapts to how you're feeling. Tell it you're overwhelmed and it'll simplify your afternoon. Ask what's next and it'll offer to navigate you there.

**Time Estimates** — Learns your personal commute times over multiple sessions and shows you realistic estimates based on your own history, not a generic average.

**Personalization** — Every visual, color, and interaction adapts to your chosen companion and accessibility preferences. Reduce motion, high contrast, break reminders — all configurable.

---

## Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Frontend | React + Vite + TypeScript | Free |
| Styling | Tailwind CSS | Free |
| AI Copilot | Groq API (llama3-70b) | Free |
| Calendar | Microsoft Graph API | Free |
| AR / Camera | Browser `getUserMedia()` + Canvas | Free |
| Routing | React Router | Free |
| Hosting | Vercel | Free |
| Design System | Figma | Free |

**Total infrastructure cost: €0**

---

## Running Locally

```bash
git clone https://github.com/Yasminek0/Cobility.git
cd Cobility
npm install
npm run dev
```

Create a `.env` file in the root:

```
VITE_GROQ_API_KEY=your_groq_key
VITE_AZURE_CLIENT_ID=your_azure_client_id
VITE_AZURE_TENANT_ID=your_azure_tenant_id
```

Get your free Groq API key at [console.groq.com](https://console.groq.com).  
Register an Azure app (free) at [portal.azure.com](https://portal.azure.com) — you need `Calendars.Read` and `User.Read` permissions under Microsoft Graph.

---

## Project Structure

```
src/
├── components/
│   ├── TaskCard.tsx        # Daily task with energy dots + location
│   ├── CompanionCard.tsx   # Companion selector (Leo, Benny, Finn, Line)
│   ├── BottomTabBar.tsx    # Tab navigation
│   └── ARView.tsx          # Camera + canvas AR overlay
├── context/
│   └── CompanionContext.tsx # Global companion + theme state
├── api/
│   ├── chat.ts             # Groq API integration
│   └── calendar.ts         # MS Graph calendar fetch
├── utils/
│   └── energy.ts           # Local energy scoring model
└── styles/
    └── theme.css           # Design tokens
```

---

## Features Roadmap

- [x] Companion personalization system
- [x] Energy cost per task
- [x] AR camera overlay with guided navigation
- [x] AI copilot with contextual responses
- [ ] MS Graph calendar sync
- [ ] Route time learning (localStorage history)
- [ ] Google Calendar support
- [ ] Offline mode
- [ ] Native app (React Native / Expo)

---

## Team

- **Yasminek0** — Dev + AI integration
- **TheOfficialPetereo** — Dev + calendar integration

---

## Why "Cobility"

**Co** (together) + **mobility** — because navigating the world shouldn't be something you have to figure out alone.
