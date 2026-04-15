# Lantonium
**English | Español Latinoamericano**

---

## English
### Executive Summary
Lantonium is a modern, responsive portfolio and product showcase website focused on Android, AI, automation, and enterprise-grade software delivery. The site presents project pages, app detail pages, privacy information, and a branded landing experience with a consistent glassmorphism design system across cards and subcards.

The platform is built as a static web application with a decoupled content layer, enabling fast updates to key copy blocks and page sections without changing core layout code.

### Technology Stack
#### Frontend
- HTML5
- CSS3 (custom design system + responsive breakpoints)
- Bootstrap 5
- Vanilla JavaScript (UI behavior and dynamic interactions)

#### Content Layer
- JSON-based content source (`content/site.json`, `content/privacy.json`)
- Runtime binding via `data-key`, `data-html`, and `data-attr-key`

#### UX / UI
- Global typography using `Ford Antenna Regular`
- Unified card/subcard styling (glass effect, borders, hover/touch interactions)
- Pointer + touch behavior support for consistent desktop/mobile UX

### Main Site Surface
| Area | Route | Purpose |
|---|---|---|
| Landing | `/` | Brand presentation, core value proposition, strategic message |
| Apps Catalog | `/apps.html` | Consolidated app portfolio overview |
| About | `/about.html` | Professional profile and contact points |
| Privacy | `/privacy.html` | Privacy policy and data transparency information |
| App Details | `/paytollapp-details.html` | Product-specific overview and capabilities |
| App Details | `/ofusercontrolapp-details.html` | Product-specific overview and capabilities |
| App Details | `/imbalances.html` | Product-specific overview and capabilities |
| App Details | `/localtranscriptor.html` | Product-specific overview, videos and gallery |
| App Details | `/docusheetbot.html` | Product-specific overview and capabilities |
| Error Page | `/404.html` | Custom not-found experience |

### Project Structure
| Path | Purpose |
|---|---|
| `assets/css/` | Global styles, visual system, responsive behavior |
| `assets/js/` | Client-side interactions and content loading |
| `assets/fonts/` | Brand typography assets |
| `assets/img/` | Static image assets |
| `assets/mp4/` | Video demo assets |
| `content/` | Structured dynamic content in JSON |

### Local Development
1. Clone repository.
2. Open project folder in your editor.
3. Run a local static server (recommended) and open `http://localhost`.

Example:
```bash
python -m http.server 8080
```

### Notes
- This repository is focused on a static, production-ready portfolio website.
- Content and visuals are designed for fast iteration while preserving consistent branding and UI behavior.

---

## Español Latinoamericano
### Resumen Ejecutivo
Lantonium es un sitio web moderno y responsive de portafolio y vitrina de productos, enfocado en Android, IA, automatización y entrega de software de nivel empresarial. El sitio presenta páginas de proyectos, detalles de apps, información de privacidad y una portada de marca con un sistema visual consistente tipo glassmorphism en cards y subcards.

La plataforma está construida como una aplicación web estática con una capa de contenido desacoplada, lo que permite actualizar textos y bloques clave sin modificar la estructura base de layout.

### Stack Tecnológico
#### Frontend
- HTML5
- CSS3 (sistema de diseño propio + breakpoints responsive)
- Bootstrap 5
- JavaScript Vanilla (comportamiento UI e interacciones dinámicas)

#### Capa de Contenido
- Fuente de contenido basada en JSON (`content/site.json`, `content/privacy.json`)
- Enlace dinámico en runtime mediante `data-key`, `data-html` y `data-attr-key`

#### UX / UI
- Tipografía global con `Ford Antenna Regular`
- Estilo unificado de cards/subcards (efecto cristal, bordes, interacciones hover/touch)
- Soporte para puntero y táctil para UX consistente en desktop y móvil

### Superficie Principal del Sitio
| Área | Ruta | Propósito |
|---|---|---|
| Inicio | `/` | Presentación de marca, propuesta de valor y mensaje estratégico |
| Catálogo Apps | `/apps.html` | Vista consolidada del portafolio de aplicaciones |
| Acerca de | `/about.html` | Perfil profesional y puntos de contacto |
| Privacidad | `/privacy.html` | Política de privacidad y transparencia de datos |
| Detalle App | `/paytollapp-details.html` | Reseña y capacidades específicas del producto |
| Detalle App | `/ofusercontrolapp-details.html` | Reseña y capacidades específicas del producto |
| Detalle App | `/imbalances.html` | Reseña y capacidades específicas del producto |
| Detalle App | `/localtranscriptor.html` | Reseña, videos y galería del producto |
| Detalle App | `/docusheetbot.html` | Reseña y capacidades específicas del producto |
| Error | `/404.html` | Experiencia personalizada de página no encontrada |

### Estructura del Proyecto
| Ruta | Propósito |
|---|---|
| `assets/css/` | Estilos globales, sistema visual y responsive |
| `assets/js/` | Interacciones del cliente y carga dinámica de contenido |
| `assets/fonts/` | Activos tipográficos de marca |
| `assets/img/` | Activos de imagen |
| `assets/mp4/` | Activos de video demo |
| `content/` | Contenido dinámico estructurado en JSON |

### Desarrollo Local
1. Clona el repositorio.
2. Abre la carpeta del proyecto en tu editor.
3. Levanta un servidor estático local (recomendado) y abre `http://localhost`.

Ejemplo:
```bash
python -m http.server 8080
```

### Notas
- Este repositorio está orientado a un sitio web estático listo para producción.
- El contenido y la capa visual están preparados para iteraciones rápidas manteniendo consistencia de marca y comportamiento UI.
