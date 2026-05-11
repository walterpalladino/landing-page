# Meridian Studio — Landing Page

A production-ready landing page built with **React 19** and **Vite**, featuring a modern feature-based folder structure, client-side routing, a full Vitest test suite, and one-command deployment to **GitHub Pages**.

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| React | 19.2.6 | UI library |
| React Router | 7.15.0 | Client-side routing |
| Vite | 8.0.10 | Build tool & dev server |
| Vitest | 4.1.5 | Unit & integration testing |
| Testing Library | 16.3.2 | Component test utilities |
| gh-pages | 4.0.0 | GitHub Pages deployment |

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page with Hero, Services, Clients, and Contact sections |
| `/services/:slug` | `ServiceDetailPage` | Full detail page for each service |
| `/appointment` | `AppointmentPage` | Appointment booking form |

### Service slugs

| Slug | Service |
|---|---|
| `brand-strategy` | Brand Strategy |
| `digital-experience` | Digital Experience |
| `motion-film` | Motion & Film |
| `growth-marketing` | Growth Marketing |
| `systems-tech` | Systems & Tech |
| `editorial-content` | Editorial Content |

---

## Project Structure

```
src/
├── __tests__/                  # App-level integration tests
├── assets/                     # Global images, fonts, icons
├── components/
│   ├── common/                 # Layout components
│   │   ├── __tests__/
│   │   ├── Navbar.jsx          # Fixed nav bar with transparent/solid states
│   │   ├── Footer.jsx          # Footer with social links and contact info
│   │   └── ScrollToTop.jsx     # Resets scroll position on every route change
│   └── ui/                     # Atomic / reusable components
│       ├── __tests__/
│       ├── Button.jsx          # Renders <Link>, <a>, or <button> by variant
│       ├── Input.jsx
│       ├── Select.jsx
│       ├── Textarea.jsx
│       └── DatePicker.jsx
├── features/                   # Business-logic domains (auth, etc.)
├── hooks/                      # Reusable custom hooks
│   ├── __tests__/
│   ├── useScrolled.js          # Tracks scroll position for Navbar
│   ├── useScrollToTop.js       # Scrolls to top on route change
│   └── useForm.js              # Controlled-form state management
├── pages/
│   ├── Home/                   # HomePage + four page sections
│   │   ├── sections/
│   │   │   ├── __tests__/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── ClientsSection.jsx
│   │   │   └── ContactSection.jsx
│   │   └── __tests__/
│   ├── ServiceDetail/          # Service detail page
│   │   ├── __tests__/
│   │   └── ServiceDetailPage.jsx
│   └── Appointment/            # Appointment booking page
│       ├── __tests__/
│       └── AppointmentPage.jsx
├── services/                   # Static content & data access
│   ├── __tests__/
│   └── contentService.js       # All copy, SERVICES, CLIENTS, getServiceBySlug()
├── store/                      # Global state (Zustand / Redux / Context)
├── utils/                      # Pure helpers
│   ├── __tests__/
│   ├── formatters.js
│   └── validators.js
├── App.jsx                     # BrowserRouter wrapper
├── AppRoutes.jsx               # Route definitions
├── main.jsx
└── index.css                   # CSS custom properties & global styles
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The output is written to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

---

## Testing

```bash
# Run all tests once
npm test

# Watch mode (re-runs on file changes)
npm run test:watch

# Generate a coverage report
npm run test:coverage
```

The suite contains **193 tests across 22 files**, co-located with their source under `__tests__/` folders.

### Test coverage by area

| Area | Files | What's tested |
|---|---|---|
| App routes | 1 | Home, `/services/:slug`, `/appointment`, 404 |
| `ServiceDetailPage` | 1 | All 6 slugs, hero, highlights, deliverables, gallery, related cards, 404 fallback |
| `HomePage` | 1 | All four sections present |
| Home sections | 4 | Hero CTAs, service links, client stats, contact form flow |
| `AppointmentPage` | 1 | Form fields, submission, success state, reset |
| Common components | 3 | Navbar (scroll, mobile menu), Footer, ScrollToTop |
| UI components | 5 | Button (all variants + `to`/`href`/`onClick`), Input, Select, Textarea, DatePicker |
| Hooks | 3 | `useScrolled`, `useForm`, `useScrollToTop` |
| Services | 1 | `contentService` data shape, `getServiceBySlug` |
| Utils | 2 | `validators`, `formatters` |

---

## Service Detail Page

Each service card on the home page links to a full detail page at `/services/:slug`.

### Page sections

| Section | Content |
|---|---|
| **Hero banner** | Full-bleed image, service title, italic tagline, Back button |
| **Overview** | Long-form description beside a split image, "Book a consultation" CTA |
| **Scope & capabilities** | Two-column checklist of all service highlights |
| **Deliverables** | Four numbered cards (dark background) — label and description |
| **Gallery** | Three-image strip with hover colour-reveal effect |
| **CTA band** | Accent-coloured band with "Set an Appointment" and "Send a message" |
| **Related services** | Three cards linking to other service pages |

### Adding or editing a service

All service content lives in `src/services/contentService.js` inside the `SERVICES` array. Each entry follows this shape:

```js
{
  id:              1,                          // unique integer
  slug:            "brand-strategy",           // URL segment — lowercase, hyphens only
  title:           "Brand Strategy",
  tagline:         "Identity that outlasts trends.",
  description:     "Short card description shown on the home page.",
  longDescription: "Full paragraph shown in the Overview section.",
  highlights:      ["Bullet one", "Bullet two", ...],   // shown in Scope section
  deliverables: [                                        // exactly 4
    { label: "Deliverable Name", desc: "Short description." },
    ...
  ],
  icon:        "◈",                            // decorative glyph
  image:       "https://picsum.photos/...",    // hero banner image
  imageSplit:  "https://picsum.photos/...",    // overview split image
  imageGallery: [                              // exactly 3
    "https://picsum.photos/...",
    ...
  ],
}
```

To look up a service by slug in code, use the exported helper:

```js
import { getServiceBySlug } from "./services/contentService";
const service = getServiceBySlug("brand-strategy"); // returns the object or undefined
```

---

## Scroll behaviour

`ScrollToTop` (`src/components/common/ScrollToTop.jsx`) is mounted once inside `AppRoutes`. It watches `pathname` via `useLocation` and fires `window.scrollTo({ top: 0, behavior: "instant" })` on every navigation, ensuring every page opens at the top regardless of where the user was before.

---

## Deploying to GitHub Pages

### 1. Fork / clone this repo and push it to GitHub

```bash
git remote set-url origin https://github.com/<your-username>/landing-page.git
```

### 2. Set the `homepage` in `package.json`

At the **top** of `package.json`, replace the default username:

```json
{
  "homepage": "https://<your-username>.github.io/landing-page",
  ...
}
```

### 3. Set the `base` in `vite.config.js`

```javascript
export default defineConfig({
  base: '/landing-page/',   // ← must match your repository name
  ...
})
```

> If your repository has a different name, update both `homepage` and `base` to match.

### 4. Enable GitHub Pages in your repository settings

1. Go to your repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Branch**, select `gh-pages` and click **Save**.

> The `gh-pages` branch is created automatically on first deploy.

### 5. Deploy

```bash
npm run deploy
```

| Script | What it does |
|---|---|
| `predeploy` | Runs `npm run build` to produce the `dist/` folder |
| `deploy` | Runs `gh-pages -d dist` to publish `dist/` to the `gh-pages` branch |

Your site will be live at:

```
https://<your-username>.github.io/landing-page
```

> GitHub Pages can take 1–2 minutes to reflect the new deployment.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the full test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests and generate a coverage report |
| `npm run deploy` | Build and publish to GitHub Pages |

---

## Customisation quick-reference

| What to change | Where |
|---|---|
| Home page copy & images | `src/services/contentService.js` |
| Service cards (home) | `SERVICES[].title`, `.description`, `.image` in `contentService.js` |
| Service detail content | `SERVICES[].longDescription`, `.highlights`, `.deliverables`, `.imageGallery` |
| Add a new service | Add an entry to the `SERVICES` array — the route and card are generated automatically |
| Remove a service | Remove the entry from `SERVICES` — the route and card disappear automatically |
| Client logos | `CLIENTS` array in `contentService.js` |
| Stats row | `STATS` array in `contentService.js` |
| Social links | `SOCIAL_LINKS` array in `contentService.js` |
| Navigation links | `NAV_LINKS` array in `contentService.js` |
| Global colours & fonts | CSS custom properties in `src/index.css` |
