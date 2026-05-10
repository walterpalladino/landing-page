# Meridian Studio — Landing Page

A production-ready landing page built with **React 19** and **Vite**, featuring a modern feature-based folder structure, a full Vitest test suite, and one-command deployment to **GitHub Pages**.

---

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| React | 19.2.6 | UI library |
| Vite | 8.0.10 | Build tool & dev server |
| Vitest | 4.1.5 | Unit & integration testing |
| Testing Library | 16.3.2 | Component test utilities |
| gh-pages | 4.0.0 | GitHub Pages deployment |

---

## Project Structure

```
src/
├── __tests__/              # App-level integration tests
├── assets/                 # Global images, fonts, icons
├── components/
│   ├── common/             # Layout components (Navbar, Footer)
│   │   └── __tests__/
│   └── ui/                 # Atomic components (Button, Input, Select, Textarea)
│       └── __tests__/
├── features/               # Business-logic domains (auth, etc.)
├── hooks/                  # Reusable custom hooks (useScrolled, useForm)
│   └── __tests__/
├── pages/
│   └── Home/               # HomePage view + four page sections
│       ├── sections/
│       │   └── __tests__/
│       └── __tests__/
├── services/               # API calls & static content (contentService.js)
│   └── __tests__/
├── store/                  # Global state (Zustand / Redux / Context)
├── utils/                  # Pure helpers (formatters, validators)
│   └── __tests__/
├── App.jsx
├── main.jsx
└── index.css
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

The suite contains **121 tests across 17 files**, co-located with their source under `__tests__/` folders.

---

## Deploying to GitHub Pages

### 1. Fork / clone this repo and push it to GitHub

Make sure your remote is set to your own GitHub account:

```bash
git remote set-url origin https://github.com/<your-username>/landing-page.git
```

### 2. Set the `homepage` in `package.json`

At the **top** of `package.json`, set the `homepage` field to match your GitHub username:

```json
{
  "homepage": "https://<your-username>.github.io/landing-page",
  ...
}
```

> The file already contains `https://walterpalladino.github.io/landing-page` as the default.  
> Replace `walterpalladino` with your own GitHub username.

### 3. Set the `base` in `vite.config.js`

The `base` option tells Vite the sub-path where the app will be served.  
It must match the repository name:

```javascript
export default defineConfig({
  base: '/landing-page/',   // ← must match your repo name
  ...
})
```

> If your repository is named differently, update both `homepage` (step 2) and `base` to use that name.

### 4. Enable GitHub Pages in your repository settings

1. Go to your repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Branch**, select `gh-pages` and click **Save**.

> The `gh-pages` branch is created automatically by the deploy command below.

### 5. Deploy

```bash
npm run deploy
```

This runs two commands in sequence:

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

## Customisation

| What to change | Where |
|---|---|
| Content (text, images, links) | `src/services/contentService.js` |
| Global colours & fonts | `src/index.css` (CSS custom properties) |
| Navigation links | `NAV_LINKS` in `contentService.js` |
| Services | `SERVICES` array in `contentService.js` |
| Clients | `CLIENTS` array in `contentService.js` |
| Stats row | `STATS` array in `contentService.js` |
| Social links | `SOCIAL_LINKS` array in `contentService.js` |
