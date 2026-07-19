# Noumi Portfolio

Personal portfolio site for **Israt Moyeen** — Full-Stack Web Developer & AI Engineer.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deployed as a static site to **GitHub Pages** via GitHub Actions.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build   # produces static export in ./out
```

## Deploy

This project deploys to:

`https://isratnoumi.github.io/Noumi-portfolio/`

1. Create a public repository named `Noumi-portfolio` under the `isratNoumi`
	GitHub account. Do not initialize it with a README or `.gitignore.
2. In the repository, open **Settings → Pages** and set **Source** to
	**GitHub Actions**.
3. Under **Settings → Secrets and variables → Actions → Variables**, add:
	- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
	- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
	- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
4. Push the local `main` branch. `.github/workflows/deploy.yml` builds the
	static export and publishes it to GitHub Pages.

```bash
git add .
git commit -m "Deploy portfolio to GitHub Pages"
git push -u origin main
```

The workflow receives the Pages base path from GitHub, so assets and internal
links work correctly under `/Noumi-portfolio/`.

## Structure

```
src/
├─ app/            # Next.js App Router
├─ components/     # UI + section components (added in later phases)
├─ content/        # Data-driven content (projects, experience, skills)
└─ lib/            # Utilities
```
