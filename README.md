# Lantonium · Luis Gonzalez

Personal portfolio of Luis Gonzalez, a software developer in Bogotá, Colombia. The site brings the portfolio, profile, project case studies, galleries, privacy policy, and license information together in one place.

- **Live site:** [lantonium.com](https://lantonium.com/)
- **English version:** [lantonium.com/en/](https://lantonium.com/en/)
- **Contact:** [lantonium@gmail.com](mailto:lantonium@gmail.com)

The interface is available in Latin American Spanish and English. Use the Colombian flag to switch to Spanish and the United Kingdom flag to switch to English. Dark mode is the default; the icon-only theme control switches between dark and light modes.

## Sitio en español

### Secciones y páginas

- `/` — portada, perfil profesional y fichas interactivas de proyectos.
- `/proyectos` — textos completos, tecnologías, enlaces y galerías de los proyectos.
- `/privacy` — política global de privacidad para el sitio y los proyectos.
- `/license` — derechos de autor y condiciones de uso generales.
- `/en/`, `/en/projects`, `/en/privacy` y `/en/license` — versión equivalente en inglés.

El sitio es personal, no corporativo. El perfil destaca el desarrollo de software, la formación tecnológica en el SENA y los estudios de Ingeniería de Software; LinkedIn aporta contexto y no se presenta como una cronología laboral extensa.

### Proyectos

El catálogo conserva este orden en el sitio:

1. Cóndor
2. VeriPago
3. SEVETCO
4. Pixelados
5. OFUserControlApp
6. DocuSheetBot
7. LocalTranscriptor
8. PayTollApp
9. PDF+
10. Video to Frames
11. Imbalances
12. PDF a PNG Móvil
13. YT Downloader - Clipper
14. YT2MP3
15. AppSistemaClientes

Las fichas muestran descripción, reseña, funcionalidades, tecnologías, enlaces, videos y las galerías disponibles. VeriPago y SEVETCO tienen galerías independientes para web y Android. AppSistemaClientes incluye capturas de la aplicación y diagramas de arquitectura; las capturas usan registros de demostración.

### Privacidad y derechos

La política explica el uso de datos según cada proyecto, incluido el inicio de sesión con Google y los servicios Firebase. Describe medidas de resguardo y los derechos aplicables bajo el marco colombiano de protección de datos, incluida la Ley 1581 de 2012 y su reglamentación. No promete seguridad absoluta: cada aplicación puede tener detalles y avisos propios.

La licencia general reserva los derechos de autor. Una licencia explícita de un proyecto y las licencias de materiales de terceros prevalecen en su ámbito; por ejemplo, se respeta la licencia CC BY 4.0 de PDF a PNG Móvil. Esta página no cambia licencias en otros repositorios.

## English version

### Pages

- `/` — Spanish home page, professional profile, and interactive project details.
- `/projects` — full project descriptions, technologies, links, and galleries.
- `/privacy` — global privacy policy for the website and projects.
- `/license` — copyright and general use terms.
- `/en/`, `/en/projects`, `/en/privacy`, and `/en/license` — English pages.

This is a personal portfolio, not a corporate website. The profile focuses on software development, SENA technology training, and Software Engineering studies. LinkedIn provides professional context without presenting an extensive employment timeline.

The English catalog follows the same order: Condor, VeriPago, SEVETCO, Pixelados, OFUserControlApp, DocuSheetBot, LocalTranscriptor, PayTollApp, PDF+, Video to Frames, Imbalances, PDF to PNG Mobile, YT Downloader - Clipper, YT2MP3, and AppSistemaClientes.

Project details include the available descriptions, reviews, features, technology stacks, links, videos, and image galleries. VeriPago and SEVETCO keep separate web and Android galleries. AppSistemaClientes includes application screenshots and architecture diagrams; its screenshots use demonstration records.

The privacy policy covers project-specific data handling, Google sign-in, Firebase services, safeguards, and applicable Colombian privacy rights. The general copyright notice is All Rights Reserved, subject to explicit project licenses and third-party terms. It does not alter licenses in other repositories.

## Desarrollo y verificación / Development and checks

### Requisitos / Requirements

- Node.js 22 or later and npm.
- Python 3 for the SEO audit.
- Microsoft Edge for local browser tests on Windows. CI uses Playwright Chromium; install it there with `npx playwright install --with-deps chromium`.

### Comandos / Commands

```powershell
npm ci --ignore-scripts
npm run build
npm test
npm run test:browser
python scripts/seo_audit.py
npm run preview
```

`npm run build` regenerates the Spanish home and content pages, then builds the English home, project directory, privacy policy, and license pages. `npm run preview` serves the local site at `http://127.0.0.1:4173`, including clean URLs, nested English routes, legacy redirects, video byte ranges, and the 404 page. Preview does not deploy anything.

### Entrega y mantenimiento / Release and maintenance

El sitio público está disponible en [lantonium.com](https://lantonium.com/). Revisa la compilación y las rutas antes de cada publicación. Los detalles internos de infraestructura y publicación no se documentan aquí.

The public site is available at [lantonium.com](https://lantonium.com/). Review the generated pages and routes before each release. Internal infrastructure and release details are intentionally not documented here.

The Git branches `main` and `developer` are synchronized after merging the portfolio integration. For future work, develop and verify changes on `developer`, then merge the reviewed result into `main` and synchronize `developer` with `main`.

## Fuentes de contenido / Content sources

| File | Purpose |
| --- | --- |
| `content/projects.json` | Spanish project order, copy, technologies, links, and media |
| `content/projects.en.json` | English project names, copy, features, and localized media labels |
| `content/pages.json` | Spanish privacy and license copy |
| `scripts/build-portfolio.cjs` | Generates the Spanish project cards and embedded catalog |
| `scripts/build-pages.cjs` | Generates Spanish legal pages, `/proyectos`, 404, and review copy |
| `scripts/build-english.cjs` | Generates English pages and the localized project catalog |
| `assets/js/portfolio-ai.js` | Portfolio navigation, themes, filters, search, and project details |
| `assets/js/project-media.js` | Project galleries and video demonstrations |
| `assets/img/` and `assets/mp4/` | Local image galleries and videos |
| `docs/contenidos-proyectos.md` | Generated Spanish copy review document |
| `docs/entrega-integracion.md` | Bilingual integration and delivery notes |
| `scripts/seo_audit.py` | SEO metadata audit |

Edit the content sources, run `npm run build`, and review the generated HTML. Do not edit generated project cards or `docs/contenidos-proyectos.md` by hand.
