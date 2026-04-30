# Rahool Gir Portfolio

[![Deploy portfolio to GitHub Pages](https://github.com/Rahul-AlPHA1/RahoolPortfolio.com/actions/workflows/deploy.yml/badge.svg)](https://github.com/Rahul-AlPHA1/RahoolPortfolio.com/actions/workflows/deploy.yml)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=06131c)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Build-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-24292f?logo=github&logoColor=white)](https://pages.github.com/)

Advanced 3D portfolio for Rahool Gir, built around real resume data, production engineering experience, live AI products, certifications, and recruiter-friendly contact flows.

```text
Live site after deployment:
https://rahul-alpha1.github.io/RahoolPortfolio.com/
```

## Overview

This portfolio is designed as a modern developer profile instead of a basic resume page. It combines a Three.js hero character, smooth GSAP section transitions, a structured resume hub, live project previews, and direct contact actions.

The old static `index.html` portfolio has been replaced with a root-level Vite application. GitHub Pages now builds the app through GitHub Actions and serves the generated `dist` output.

## Feature Set

- Interactive 3D hero character with custom skin tone and black suit styling.
- Profile summary, CTA buttons, stats, and quick resume access in the first viewport.
- Working `View Work` action that scrolls to the live project section.
- Working `Download Resume` action that opens/downloads the current PDF resume.
- Resume-based sections for experience, education, skills, availability, and certifications.
- Live project theater for deployed apps such as LendLedger and FakeShield.
- Text-first project cards for easy scanning by recruiters and hiring managers.
- Contact section with email, phone, LinkedIn, GitHub, resume, and footer links.
- GitHub Pages workflow for automatic deployment on every push.

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Motion | GSAP, ScrollTrigger, ScrollSmoother |
| 3D | Three.js, React Three Fiber, Draco assets |
| UI | CSS by section, responsive layout, custom cursor |
| Deployment | GitHub Actions, GitHub Pages |

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── Rahool_Gir_Updated_Resume.pdf
│   ├── draco/
│   ├── images/
│   └── models/
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   │   └── portfolioData.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Local Setup

Use Node.js LTS.

```bash
npm install
```

Run the portfolio locally:

```bash
npm run dev
```

Build production files:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Push Procedure

From the project root:

```bash
git status
git add .
git commit -m "Build advanced React portfolio"
git push origin master
```

If your GitHub default branch is `main`, use:

```bash
git push origin main
```

If Git asks for login, use your GitHub username and a Personal Access Token instead of your password.

## GitHub Pages Deployment Procedure

This repository already includes:

```text
.github/workflows/deploy.yml
```

That workflow installs dependencies, runs the production build, uploads `dist`, and deploys it to GitHub Pages.

One-time GitHub setup:

1. Open the repository on GitHub.
2. Go to `Settings`.
3. Open `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Push changes to `master` or `main`.
6. Go to the `Actions` tab.
7. Open `Deploy portfolio to GitHub Pages`.
8. Wait until the job is green.
9. Open the deployed site:

```text
https://rahul-alpha1.github.io/RahoolPortfolio.com/
```

## Why This Needs GitHub Actions

The old portfolio was plain HTML, so GitHub Pages could serve `index.html` directly.

This portfolio is a Vite React app. It must be built first:

```bash
npm run build
```

The build creates:

```text
dist/
```

GitHub Pages then serves the files inside `dist`. The workflow handles this automatically after every push.

## Vite Base Path

GitHub Pages project sites use this URL shape:

```text
https://username.github.io/repository-name/
```

Because this repo deploys at:

```text
/RahoolPortfolio.com/
```

`vite.config.ts` automatically sets the correct base path during GitHub Actions builds. This prevents broken CSS, JS, model, image, and resume links after deployment.

## Custom Domain Setup

If you later connect:

```text
rahoolportfolio.com
```

then GitHub Pages should use `/` as the base path.

Steps:

1. Create `public/CNAME`.
2. Put only this inside it:

```text
rahoolportfolio.com
```

3. In `.github/workflows/deploy.yml`, add this to the `Build` step:

```yaml
env:
  VITE_SITE_BASE: /
```

4. In GitHub, go to `Settings` -> `Pages`.
5. Add the custom domain.
6. Configure DNS records in your domain provider.
7. Wait for DNS and HTTPS checks to complete.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Blank page after deploy | Confirm Pages source is `GitHub Actions` and workflow is green. |
| CSS/JS 404 errors | Check `vite.config.ts` base path and rebuild. |
| Resume link fails | Confirm `public/Rahool_Gir_Updated_Resume.pdf` exists. |
| 3D model does not load | Confirm `public/models/character.enc` and `public/draco/` exist. |
| Deploy does not start | Push to `master` or `main`, or run workflow manually from Actions. |

## Main Links

| Type | Link |
| --- | --- |
| GitHub | https://github.com/Rahul-AlPHA1 |
| LinkedIn | https://www.linkedin.com/in/rahool-g-4b055a126/ |
| LendLedger | https://lend-ledger-one.vercel.app/ |
| FakeShield | https://fake-shield-all-in-one-fake-news-de.vercel.app/ |

## Credits

Portfolio content, resume data, profile information, project descriptions, certificates, and personal assets belong to Rahool Gir.

The portfolio was customized from a public 3D portfolio codebase by Moncy Yohannan. Keep upstream attribution where required by the original source/license.
