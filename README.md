# 🌾 Village Portfolio — Debasis Sahoo

A scroll-driven, SVG-illustrated village portfolio built with **React + Vite + React Router**.

---

## ✨ Features

- **10-layer parallax hero** — sky, stars, sun, clouds, birds, far mountains, near mountains, rolling hills, village silhouette, foreground — all moving at different speeds
- **Clickable project houses** on a village road — each navigates to a full detail page
- **React Router** — clean `/project/:slug` URLs per project, browser back button works
- **All project data in `src/data/projects.json`** — edit one file to update everything
- **Scroll-triggered animations** — every section fades/slides in as you reach it
- **Warm sunset SVG art style** — amber/orange/brown palette throughout

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
village-portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                    ← ReactDOM + BrowserRouter entry
    ├── App.jsx                     ← Routes: / and /project/:slug
    ├── data/
    │   └── projects.json           ← ⭐ Edit this to update projects
    ├── hooks/
    │   └── useParallax.js          ← useScrollY, useInView hooks
    └── components/
        ├── Hero/
        │   ├── Hero.jsx            ← 10-layer parallax SVG village scene
        │   └── Hero.module.css
        ├── Nav/
        │   ├── Nav.jsx             ← Fixed nav, zone-named links
        │   └── Nav.module.css
        ├── VillageMap/
        │   ├── VillageMap.jsx      ← Clickable SVG project houses on road
        │   └── VillageMap.module.css
        ├── ProjectPage/
        │   ├── ProjectPage.jsx     ← Full detail page per project
        │   └── ProjectPage.module.css
        └── sections/
            ├── Sections.jsx        ← About, Skills, Experience, Education,
            │                         Achievements, Contact, Footer
            └── Sections.module.css
```

---

## 🏠 Adding / Editing a Project

Open `src/data/projects.json` and add a new object:

```json
{
  "id": "my-project",
  "name": "My Project",
  "slug": "my-project",
  "tagline": "One line description",
  "icon": "🔥",
  "color": "#ffd880",
  "company": "Company Name",
  "period": "2025",
  "houseType": "hut",
  "description": "Full paragraph description...",
  "highlights": [
    "Key achievement one",
    "Key achievement two"
  ],
  "stack": ["Python", "FastAPI", "Redis"],
  "category": "AI / Backend",
  "status": "Production",
  "role": "Software Engineer"
}
```

**`houseType` options:** `hut` | `temple` | `tower` | `school`

The house will automatically appear in the village map and get its own page at `/project/my-project`.

---

## 🎨 Customization

| What | Where |
|------|-------|
| Your name / role / bio | `src/components/sections/Sections.jsx` → `About` |
| Skills list | `src/components/sections/Sections.jsx` → `skillGroups` |
| Work experience | `src/components/sections/Sections.jsx` → `jobs` |
| Education | `src/components/sections/Sections.jsx` → `edu` |
| Achievements | `src/components/sections/Sections.jsx` → `achievements` |
| Contact links | `src/components/sections/Sections.jsx` → `Contact` |
| Color palette | CSS variables in each `*.module.css` file |

---

## 🌐 Deployment

Works on **Vercel**, **Netlify**, or any static host.

For React Router to work on Netlify, add a `public/_redirects` file:
```
/* /index.html 200
```

For Vercel, add a `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
