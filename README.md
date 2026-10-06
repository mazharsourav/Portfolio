# Mazharul Islam Sourav — Portfolio

My personal portfolio: a single-page site with my background, projects, skills, achievements, a downloadable CV and a working contact form. I'm a full stack developer and Computer Science and Engineering graduate from the University of Asia Pacific, based in Dhaka, Bangladesh.

**Live:** [mazharsourav.me](https://mazharsourav.me)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/screenshots/home-dark.png">
  <img alt="Portfolio home page: Mazhar Sourav, Full-Stack Developer, with a code card" src=".github/screenshots/home-light.png">
</picture>

## Built with

- **[Next.js 16](https://nextjs.org)** (App Router), exported as a static site
- **TypeScript**
- **[Tailwind CSS 4](https://tailwindcss.com)**
- **[Framer Motion](https://motion.dev)** for entrance and scroll animations
- **[Lucide](https://lucide.dev)** icons
- **[Web3Forms](https://web3forms.com)** to deliver contact form messages without a backend
- **GitHub Actions + GitHub Pages** for deployment

## Features

- **Light and dark themes.** Follows the system setting, remembers your choice, and is applied before the page paints, so there's no flash.
- **Responsive** down to phone widths, with a mobile menu.
- **Projects grid** with tags, GitHub and live demo links, and a "Show More" toggle.
- **Draggable achievements row** with arrow buttons and certificate links.
- **One-click CV download** from the navbar and the About section.
- **Contact form** with loading, success and error states, plus a honeypot field against spam bots.
- **Search and sharing ready:**
  - title and description meta tags and a canonical URL
  - `sitemap.xml` and `robots.txt`
  - schema.org `Person` structured data
  - a preview card image for LinkedIn, WhatsApp, Facebook and X

## Running it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # static export into out/
npm run lint
```

## Project structure

```
.
├── app/
│   ├── layout.tsx                 root layout: fonts, SEO metadata, theme init script
│   ├── page.tsx                   the single page: assembles every section + structured data
│   ├── globals.css                light/dark theme colours and base styles
│   ├── sitemap.ts                 generates sitemap.xml at build time
│   ├── robots.ts                  generates robots.txt at build time
│   ├── opengraph-image.png        link preview card (1200×630)
│   ├── opengraph-image.alt.txt    alt text for the preview card
│   ├── icon.svg                   favicon ("ms" logo)
│   ├── favicon.ico                fallback favicon for older browsers
│   └── apple-icon.png             home-screen icon for iOS
│
├── components/
│   ├── Navbar.tsx                 sticky nav, active section, mobile menu, CV download
│   ├── Hero.tsx                   intro and animated code card
│   ├── About.tsx                  bio, education, experience, photo
│   ├── Projects.tsx               project grid with show more
│   ├── Skills.tsx                 skill categories
│   ├── Achievements.tsx           draggable horizontal row
│   ├── Contact.tsx                contact details and form
│   ├── Footer.tsx                 links and status bar
│   ├── Reveal.tsx                 scroll-into-view animation wrapper
│   ├── ScrollToTop.tsx            floating back-to-top button
│   └── ThemeToggle.tsx            light/dark switch
│
├── lib/
│   ├── data.ts                    ALL site content (see below)
│   └── styles.ts                  shared Tailwind class strings and link helpers
│
├── public/
│   ├── Mazharul_Islam_Sourav_Resume.pdf
│   ├── main-image.jpg             profile photo
│   └── projects/                  project thumbnails
│
└── .github/
    ├── workflows/deploy.yml       build and publish to GitHub Pages
    └── screenshots/               README screenshots
```

## Editing content

**All content lives in [`lib/data.ts`](lib/data.ts).** Components only handle layout and read everything from there, so updating the site rarely means touching a component.

| To change… | Edit |
|---|---|
| Name, title, bio, CGPA badge | `profile` |
| Site address and search description | `site` (also used by the sitemap, robots.txt and structured data) |
| Education, experience | `education`, `experience` |
| Projects | `projects`. Put the screenshot in `public/projects/` and set `image`. Use `live: "#"` to hide the Live button. |
| Skills, achievements | `skillCategories`, `achievements`. Leave out `link` to hide the certificate button. |
| Email, phone, location, contact form key | `contact` |
| How many projects show before "Show More" | `INITIAL_COUNT` in `components/Projects.tsx` |

**Other files to update by hand:**
- **CV:** replace `public/Mazharul_Islam_Sourav_Resume.pdf` with a file of the same name.
- **Preview card:** `app/opengraph-image.png` is a static image. If your name, title or photo changes, regenerate it.

## Deployment

Pushing to `main` runs [the GitHub Actions workflow](.github/workflows/deploy.yml). It builds the static export and publishes it to GitHub Pages. In the repository settings, set **Pages → Source** to **GitHub Actions**.

The site is built for a custom domain at the root (`mazharsourav.me`). To serve it from `username.github.io/<repo>` instead, add `basePath: "/<repo>"` to `next.config.ts`, otherwise images and the CV won't load.

After the first deploy, add the domain to [Google Search Console](https://search.google.com/search-console) and submit `sitemap.xml`.

## License

The code is released under the [MIT License](LICENSE), so you're welcome to learn from and reuse it. The content, photos, CV and personal details are mine, so please replace them with your own.
