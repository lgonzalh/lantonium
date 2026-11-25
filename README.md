# Español

## Lantonium — portafolio personal de Luis Gonzalez

Portafolio personal de Luis Gonzalez, desarrollador de software en Bogotá, Colombia. El sitio reúne el perfil profesional, los proyectos, sus fichas, galerías, la política de privacidad y la licencia.

- **Sitio en vivo:** [lantonium.com](https://lantonium.com/)
- **Versión en inglés:** [lantonium.com/en/](https://lantonium.com/en/)
- **Contacto:** [lantonium@gmail.com](mailto:lantonium@gmail.com)

La interfaz ofrece español latinoamericano e inglés. Usa la bandera de Colombia para cambiar a español y la del Reino Unido para cambiar a inglés. El modo oscuro es el predeterminado; el control de tema permite cambiar entre oscuro y claro.

## Secciones y páginas

- `/` — portada, perfil profesional y fichas interactivas de proyectos.
- `/proyectos` — descripciones completas, tecnologías, enlaces y galerías.
- `/privacy` — política global de privacidad del sitio y sus proyectos.
- `/license` — derechos de autor y condiciones generales de uso.
- `/en/`, `/en/projects`, `/en/privacy` y `/en/license` — páginas equivalentes en inglés.

El sitio es personal, no corporativo. El perfil destaca el desarrollo de software, la formación tecnológica en el SENA y los estudios de Ingeniería de Software. LinkedIn aporta contexto profesional, sin presentarse como una cronología laboral extensa.

## Proyectos

El catálogo conserva este orden:

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

Las fichas incluyen descripciones, reseñas, funcionalidades, tecnologías, enlaces, videos y galerías disponibles. VeriPago y SEVETCO tienen galerías independientes para sus versiones web y Android. AppSistemaClientes incluye capturas y diagramas de arquitectura; las capturas usan registros de demostración.

## Privacidad y derechos de autor

La política explica el tratamiento de datos según cada proyecto, incluido el inicio de sesión con Google y los servicios Firebase. Describe las medidas de resguardo y los derechos aplicables bajo la legislación colombiana de protección de datos, incluida la Ley 1581 de 2012 y su reglamentación. Cada aplicación puede tener detalles y avisos propios.

La licencia general reserva los derechos de autor. Las licencias expresas de proyectos y las licencias de materiales de terceros prevalecen para el contenido que cubren; por ejemplo, se respeta la licencia CC BY 4.0 de PDF a PNG Móvil. Este aviso no modifica las licencias de otros repositorios.

El archivo [`LICENSE.md`](LICENSE.md) contiene el aviso general de derechos reservados en español e inglés.

## Desarrollo y mantenimiento

### Requisitos

- Node.js 22 o posterior y npm.
- Python 3 para la auditoría SEO.
- Microsoft Edge para las pruebas locales de navegador en Windows. En CI se usa Playwright con Chromium; se instala con `npx playwright install --with-deps chromium`.

### Comandos

```powershell
npm ci --ignore-scripts
npm run build
npm test
npm run test:browser
python scripts/seo_audit.py
npm run preview
```

`npm run build` regenera la portada y las páginas en español, y después crea la portada, el catálogo de proyectos y las páginas legales en inglés. `npm run preview` sirve el sitio local en `http://127.0.0.1:4173`, incluidas las rutas limpias, las páginas en inglés, las redirecciones heredadas, los rangos de video y la página 404. La vista previa no publica el sitio.

Antes de cada publicación, revisa la compilación y las rutas generadas. Los detalles internos de infraestructura y publicación se mantienen fuera de este archivo.

Después de integrar cambios, mantén sincronizadas las ramas `main` y `developer`. Para el trabajo futuro, desarrolla y revisa los cambios en `developer`, intégralos en `main` y sincroniza nuevamente `developer` con `main`.

## Archivos de referencia

| Archivo | Función |
| --- | --- |
| `content/projects.json` | Orden, textos, tecnologías, enlaces y medios de los proyectos en español |
| `content/projects.en.json` | Nombres, textos, funcionalidades y etiquetas de medios en inglés |
| `content/pages.json` | Contenido en español de privacidad y licencia |
| `LICENSE.md` | Aviso de derechos reservados del repositorio en ambos idiomas |
| `scripts/build-portfolio.cjs` | Genera las fichas y el catálogo incrustado de proyectos en español |
| `scripts/build-pages.cjs` | Genera las páginas legales, `/proyectos`, la página 404 y el documento de revisión en español |
| `license/index.html` | Página de licencia en español generada para la ruta `/license` |
| `scripts/build-english.cjs` | Genera las páginas en inglés y el catálogo localizado |
| `assets/js/portfolio-ai.js` | Navegación, temas, filtros, búsqueda y fichas de proyectos |
| `assets/js/project-media.js` | Galerías de imágenes y demostraciones en video |
| `assets/img/` y `assets/mp4/` | Galerías de imágenes y videos locales |
| `docs/contenidos-proyectos.md` | Documento generado para revisar los textos de proyectos en español |
| `docs/entrega-integracion.md` | Notas de integración y entrega |
| `scripts/seo_audit.py` | Auditoría de metadatos SEO |

Edita las fuentes de contenido, ejecuta `npm run build` y revisa el HTML generado. No edites manualmente las fichas generadas ni `docs/contenidos-proyectos.md`.

---

# English

## Lantonium — Luis Gonzalez’s personal portfolio

Personal portfolio of Luis Gonzalez, a software developer in Bogotá, Colombia. The site brings together his professional profile, projects, project details, galleries, privacy policy, and license.

- **Live site:** [lantonium.com](https://lantonium.com/)
- **Spanish version:** [lantonium.com](https://lantonium.com/)
- **Contact:** [lantonium@gmail.com](mailto:lantonium@gmail.com)

The interface is available in Latin American Spanish and English. Use the Colombian flag to switch to Spanish and the United Kingdom flag to switch to English. Dark mode is the default; the theme control switches between dark and light modes.

## Sections and pages

- `/` — Spanish home page, professional profile, and interactive project details.
- `/proyectos` — full project descriptions, technologies, links, and galleries in Spanish.
- `/privacy` — global privacy policy for the website and its projects in Spanish.
- `/license` — copyright and general terms of use in Spanish.
- `/en/`, `/en/projects`, `/en/privacy`, and `/en/license` — English pages.

This is a personal portfolio, not a corporate website. The profile focuses on software development, SENA technology training, and Software Engineering studies. LinkedIn provides professional context without presenting an extensive employment timeline.

## Projects

The English catalog follows the same order:

1. Condor
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
12. PDF to PNG Mobile
13. YT Downloader - Clipper
14. YT2MP3
15. AppSistemaClientes

Project details include available descriptions, reviews, features, technology stacks, links, videos, and image galleries. VeriPago and SEVETCO have separate galleries for their web and Android versions. AppSistemaClientes includes application screenshots and architecture diagrams; its screenshots use demonstration records.

## Privacy and copyright

The privacy policy explains project-specific data handling, including Google sign-in and Firebase services. It describes safeguards and rights under Colombian data protection law, including Law 1581 of 2012 and its regulations. Individual applications may include additional details and notices.

The general license reserves copyright. Explicit project licenses and third-party licenses take precedence for the materials they cover; for example, the CC BY 4.0 license for PDF to PNG Mobile is respected. This notice does not change licenses in other repositories.

The repository’s [`LICENSE.md`](LICENSE.md) contains the general All Rights Reserved notice in English and Spanish.

## Development and maintenance

### Requirements

- Node.js 22 or later and npm.
- Python 3 for the SEO audit.
- Microsoft Edge for local browser checks on Windows. CI uses Playwright with Chromium; install it with `npx playwright install --with-deps chromium`.

### Commands

```powershell
npm ci --ignore-scripts
npm run build
npm test
npm run test:browser
python scripts/seo_audit.py
npm run preview
```

`npm run build` regenerates the Spanish home and content pages, then creates the English home page, project directory, and legal pages. `npm run preview` serves the local site at `http://127.0.0.1:4173`, including clean URLs, English pages, legacy redirects, video byte ranges, and the 404 page. Preview does not publish the site.

Review the build and generated routes before each release. Internal infrastructure and release details are intentionally omitted from this file.

After merging changes, keep `main` and `developer` synchronized. For future work, develop and review changes on `developer`, merge them into `main`, then synchronize `developer` with `main`.

## Reference files

| File | Purpose |
| --- | --- |
| `content/projects.json` | Spanish project order, copy, technologies, links, and media |
| `content/projects.en.json` | English names, copy, features, and localized media labels |
| `content/pages.json` | Spanish privacy and license content |
| `LICENSE.md` | Repository-level copyright notice in both languages |
| `scripts/build-portfolio.cjs` | Generates Spanish project details and the embedded project catalog |
| `scripts/build-pages.cjs` | Generates Spanish legal pages, `/proyectos`, the 404 page, and review document |
| `license/index.html` | Generated Spanish license page for the `/license` route |
| `scripts/build-english.cjs` | Generates English pages and the localized project catalog |
| `assets/js/portfolio-ai.js` | Navigation, themes, filters, search, and project details |
| `assets/js/project-media.js` | Image galleries and video demonstrations |
| `assets/img/` and `assets/mp4/` | Local image galleries and videos |
| `docs/contenidos-proyectos.md` | Generated Spanish project copy review document |
| `docs/entrega-integracion.md` | Integration and release notes |
| `scripts/seo_audit.py` | SEO metadata audit |

Edit the content sources, run `npm run build`, and review the generated HTML. Do not edit generated project details or `docs/contenidos-proyectos.md` by hand.
