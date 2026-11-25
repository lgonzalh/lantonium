# Entrega de la integración del portafolio

## Alcance

El sitio reúne la portada personal, el perfil profesional y quince proyectos en el orden definido en `content/projects.json`. Mantiene la paleta, la tipografía, los temas y las animaciones del portafolio; incorpora las reseñas y los medios disponibles del sitio anterior en fichas interactivas.

Las fichas incluyen descripción, reseña, funcionalidades, tecnologías y enlaces según la información de cada proyecto. VeriPago y SEVETCO distinguen web y Android, con galerías separadas. La página `/proyectos` ofrece las descripciones y recursos sin depender de los modales. Las páginas `/privacy` y `/license` contienen los textos legales globales; las rutas antiguas se conservan mediante redirecciones configuradas.

La presentación profesional identifica a Luis Gonzalez como desarrollador de software, tecnólogo del SENA y estudiante de Ingeniería de Software. LinkedIn se utiliza como contexto, sin trasladar una cronología laboral extensa al sitio. El contacto es `lantonium@gmail.com`.

## Condiciones de entrega

- El trabajo se sincroniza con GitHub en `developer`; `main` permanece sin cambios.
- No publicar en Firebase sin confirmación expresa del usuario. Tener redirecciones y configuración de alojamiento no autoriza un despliegue.
- Crear la versión en inglés, su enlace y la opción con bandera del Reino Unido solo después de la confirmación de publicación. Por ahora se identifica el español con la bandera de Colombia.
- Una unidad funcional = un test + un commit. Las comprobaciones y los commits deben poder relacionarse con el cambio realizado.
- Las licencias particulares y los derechos de terceros prevalecen en sus respectivos ámbitos. No se modifican licencias de otros repositorios.

## Comprobaciones disponibles

Los comandos de verificación están en el README: instalación reproducible, generación de páginas, pruebas de contenido y recursos, pruebas de navegador y auditoría SEO. Las pruebas de navegador cubren fichas, medios, galerías por plataforma, temas, búsqueda, menú y rutas antiguas en los escenarios implementados.

Este documento describe el alcance y los mecanismos de revisión; no certifica por sí mismo que una prueba haya pasado, que se haya auditado la seguridad de las aplicaciones o que el sitio esté publicado. Los resultados deben comprobarse en las salidas de ejecución y en el historial de la rama.

## Revisar los textos

`docs/contenidos-proyectos.md` contiene una copia generada de los textos de cada proyecto. Los cambios se realizan en `content/projects.json` y después se ejecuta `npm run build`; no se edita esa copia manualmente. Los textos de privacidad y licencia se mantienen en `content/pages.json`.
