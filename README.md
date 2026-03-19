# Cobility

**Step-by-step navigation for neurodivergent users.**

Cobility is a mobile-first web app that helps people with ADHD, autism, and other invisible disabilities navigate their day with less friction. Instead of overwhelming the user with a map, it breaks every journey into calm, one-step-at-a-time instructions — planned ahead, executed simply.

Live at **[cobility.vercel.app](https://cobility.vercel.app)**

Built in 12 hours for a Microsoft-sponsored invisible disability hackathon.

---

## The Problem

Navigation apps like Google Maps are built for neurotypical users. They show everything at once — the full route, all the decisions, all the complexity — and expect you to process it in real time. For someone with ADHD or autism, that cognitive load is the barrier, not the distance.

Cobility removes the noise. Plan once, then go one step at a time.

---

## How It Works

The app has two modes, chosen from the home screen.

### Plan Mode
Build your journey before you leave. Add a destination, add stops along the way, and see your full route as a timeline. Each stop shows a Google Street View preview so you know exactly what to look for when you arrive. Syncs with your calendar to surface upcoming trips automatically.

### Go Mode
Once you're ready to leave, Go Mode takes over. The screen shows only what matters right now: a live map, a directional arrow that rotates with your real GPS heading, and one instruction in large text. A progress bar and estimated arrival time keep you grounded. Tap "Next step" to advance through your route.

---

## Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Frontend | React + Vite | Free |
| Styling | Tailwind CSS | Free |
| Routing | React Router | Free |
| Maps | Google Maps Embed API | Free tier |
| Geolocation | Browser Geolocation API | Free |
| Calendar | Microsoft Graph API (Outlook) | Free |
| AI Assistant | Groq API (llama3-70b) | Free |
| Hosting | Vercel | Free |
| Design | Figma | Free |

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
VITE_GOOGLE_MAPS_KEY=your_google_maps_key
VITE_GROQ_API_KEY=your_groq_key
VITE_AZURE_CLIENT_ID=your_azure_client_id
VITE_AZURE_TENANT_ID=your_azure_tenant_id
```

- Google Maps key: [console.cloud.google.com](https://console.cloud.google.com) — enable Maps Embed API (free tier)
- Groq key: [console.groq.com](https://console.groq.com) — free, no credit card
- Azure keys: [portal.azure.com](https://portal.azure.com) — register an app, add `Calendars.Read` + `User.Read` under Microsoft Graph

---

## Project Structure

```
src/
├── pages/
│   ├── PlanMode.jsx          # Journey builder with timeline + street view
│   └── GoMode.jsx            # Real-time step-by-step navigation
├── components/
│   ├── ModeSelector.jsx      # Home screen — Plan vs Go
│   ├── RouteBuilder.jsx      # Destination + stop input
│   ├── JourneyTimeline.jsx   # Visual step sequence
│   ├── LockedRouteCard.jsx   # Saved route summary
│   ├── CalendarSync.jsx      # Outlook calendar integration
│   ├── AIChatBubble.jsx      # Floating AI assistant
│   └── Navbar.jsx            # Top navigation bar
└── context/
    └── CobilityContext.jsx   # Global state: route, steps, current step
```

---

## Features

- [x] Two-mode UX: Plan ahead, then go
- [x] Journey timeline with Google Street View previews per stop
- [x] Real-time GPS tracking with rotating direction arrow
- [x] Step-by-step instructions in large, calm typography
- [x] Progress bar with estimated arrival time
- [x] Calendar sync — surfaces next trip on home screen
- [x] Floating AI chat assistant in Plan Mode
- [ ] Offline mode
- [ ] Time estimates based on personal route history
- [ ] Native app (React Native / Expo)

---

## Team

- **Yasminek0** — Dev + AI integration
- **TheOfficialPetereo** — Dev + maps + calendar integration

---

## Why "Cobility"

**Co** (together) + **mobility** — because navigating the world shouldn't be something you have to figure out alone.
