# Lantonium · Luis Gonzalez

Portafolio personal de un desarrollador de software: aplicaciones web, móviles y de escritorio, datos, automatización e inteligencia artificial aplicada. El sitio está en español latinoamericano y usa el diseño del portafolio original, con modo oscuro por defecto y selector de tema.

## Desarrollo y publicación

La integración se trabaja y sincroniza con GitHub en la rama `developer`. La rama `main` permanece sin cambios. **No publicar en Firebase sin confirmación expresa del usuario.** La versión en inglés, su enlace y el selector con bandera del Reino Unido se crearán únicamente cuando el usuario confirme que el sitio puede publicarse. Por ahora, la bandera de Colombia identifica el español.

Regla de trabajo: **una unidad funcional = un test + un commit**. Se debe ejecutar la prueba correspondiente antes de confirmar el cambio y sincronizarlo con GitHub.

## Preparar y verificar

Requiere Node.js 22 o posterior, npm y Python 3 para la auditoría SEO.

```powershell
npm ci --ignore-scripts
npm run build
npm test
npm run test:browser
python scripts/seo_audit.py
```

Las pruebas de navegador usan Microsoft Edge instalado en Windows. En CI usan Chromium de Playwright; antes de ejecutarlas en ese entorno se instala con `npx playwright install --with-deps chromium`. La integración continua verifica el sitio y no publica en Firebase.

Para revisar el sitio localmente, ejecuta `npx serve .` y abre la dirección que indique. Es un servidor estático con soporte de rutas limpias, por ejemplo `/privacy`. Esta vista previa no aplica las redirecciones de Firebase. Las pruebas de navegador usan un servidor local que comprueba las redirecciones exactas configuradas para el sitio.

## Contenido y estructura

| Fuente | Uso |
| --- | --- |
| `content/projects.json` | Orden, textos, tecnologías, enlaces y medios de los quince proyectos |
| `content/pages.json` | Textos de privacidad y licencia |
| `scripts/build-portfolio.cjs` | Regenera tarjetas, cinta de proyectos y catálogo integrado en `index.html` |
| `scripts/build-pages.cjs` | Regenera páginas legales, catálogo accesible, página 404 y documento de textos |
| `assets/img/` y `assets/mp4/` | Capturas y demostraciones locales |
| `firebase.json` | Configuración de alojamiento y redirecciones; no implica publicación |
| `docs/contenidos-proyectos.md` | Copia de revisión de los textos de proyectos, generada desde el catálogo |
| `docs/entrega-integracion.md` | Alcance y condiciones de entrega |

Después de editar las fuentes de contenido, ejecuta `npm run build` y confirma también los archivos generados. `index.html` conserva la estructura de portada, perfil, navegación y contacto. Los modales se controlan con `assets/js/portfolio-ai.js` y las galerías con `assets/js/project-media.js`.

## Proyectos

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

VeriPago y SEVETCO presentan sus versiones web y Android con galerías separadas. Las fichas muestran únicamente los medios disponibles en el catálogo; no se inventan demostraciones ni resultados. Las direcciones antiguas de proyectos apuntan a sus fichas del sitio unificado.

## Privacidad y derechos

El contacto público es `lantonium@gmail.com`. El portafolio no exige cuentas ni utiliza Google Analytics. La política explica el tratamiento de datos según las funciones de cada aplicación, el acceso con Google, los servicios Firebase y los derechos previstos en el marco colombiano.

La reserva general de derechos respeta licencias particulares y materiales de terceros. Entre las excepciones documentadas están la licencia CC BY 4.0 publicada en PDF a PNG Móvil y las condiciones propias de Pixelados. Esta integración no modifica licencias en otros repositorios.
