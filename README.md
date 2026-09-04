# alyssatramnia.com

Personal portfolio of Tram Anh (Alyssa) Hoang, data analyst. Next.js 12 static export, hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run export     # static build -> ./out
```

Copy `.env.example` to `.env.local` for optional analytics and GitHub-stats settings.

## Deploy

- Preferred: push to `main`; `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
- Fallback (no Actions): `npm run deploy:branch` builds locally and pushes `out/` to the `gh-pages` branch.

Custom domain is set by `public/CNAME`.

## Content

All site data lives in `constants.ts` (metadata, nav, projects, skills, timeline, reads). Page copy for the About pages lives in `pages/aboutme/`.

## Credits

Built from the MIT-licensed template based on folio by Ayush Singh. See `LICENSE`.
