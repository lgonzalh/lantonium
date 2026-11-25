# Entrega de la integración / Portfolio integration delivery

## Español

### Alcance y estado

El sitio personal de Luis Gonzalez integra la portada, el perfil profesional y los quince proyectos en el orden de `content/projects.json`. Conserva la paleta, tipografía, animaciones y tema oscuro predeterminado del portafolio. Las fichas integran textos, galerías y videos disponibles en el catálogo.

El sitio ofrece idioma español latinoamericano e inglés, con cambio mediante banderas de Colombia y del Reino Unido. La versión inglesa traduce las páginas, fichas de proyectos, textos alternativos de medios, videos y páginas legales. Ambas versiones incluyen rutas equivalentes para proyectos, privacidad y licencia.

VeriPago y SEVETCO tienen galerías separadas para web y Android. AppSistemaClientes incluye capturas reales de la interfaz con registros de demostración, además de diagramas que están identificados como tales. La política de privacidad cubre el tratamiento de datos por proyecto, Google Authentication, Firebase y el marco colombiano de protección de datos. La licencia global reserva los derechos y respeta licencias explícitas de proyectos y materiales de terceros.

El sitio está publicado en <https://lantonium.com/>. La versión inglesa está en <https://lantonium.com/en/>. Los cambios se integraron a `main` y las ramas `main` y `developer` quedaron sincronizadas.

### Fuentes y mantenimiento

- `content/projects.json`: catálogo español, orden, textos, enlaces y medios.
- `content/projects.en.json`: traducción inglesa por proyecto y etiquetas de medios.
- `content/pages.json`: política de privacidad y licencia en español.
- `scripts/build-portfolio.cjs`, `scripts/build-pages.cjs` y `scripts/build-english.cjs`: generación del sitio y páginas estáticas.
- `assets/js/portfolio-ai.js` y `assets/js/project-media.js`: fichas, navegación y galerías.
- `docs/contenidos-proyectos.md`: copia generada para revisar los textos españoles.

Para revisar los textos, edita las fuentes y ejecuta `npm run build`. Las páginas generadas no son fuentes de contenido. El README documenta comandos de pruebas y vista previa. Los detalles de infraestructura y publicación se mantienen fuera de la documentación pública.

## English

### Scope and current status

Luis Gonzalez’s personal website brings together the home page, professional profile, and fifteen projects in the order defined in `content/projects.json`. It retains the portfolio palette, typography, animations, and dark default theme. Project details include the copy, galleries, and videos available in the catalog.

The site supports Latin American Spanish and English, with Colombian and United Kingdom flag controls. The English version localizes the pages, project details, media alternative text, videos, and legal pages. Both languages provide corresponding project, privacy, and license routes.

VeriPago and SEVETCO have separate web and Android galleries. AppSistemaClientes includes real interface screenshots populated with demonstration records, plus diagrams labeled as diagrams. The privacy policy covers project data handling, Google Authentication, Firebase, and Colombia’s data protection framework. The general copyright notice reserves rights while respecting explicit project licenses and third-party materials.

The website is live at <https://lantonium.com/>. The English version is at <https://lantonium.com/en/>. The changes have been merged into `main`; `main` and `developer` are synchronized.

### Sources and maintenance

Edit the content sources and run `npm run build` to regenerate the site. Generated HTML and the Spanish project-copy document are review outputs, not content sources. The README describes the test and preview commands. Infrastructure and release details are intentionally omitted from public documentation.
