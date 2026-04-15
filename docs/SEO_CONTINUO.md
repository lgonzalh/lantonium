# SEO Continuo (Abril 2026)

## Objetivo
Estandarizar SEO técnico y on-page para que cada nueva página de Lantonium nazca lista para indexar, posicionar y compartir correctamente.

## Qué es y para qué sirve
- SEO es la optimización para buscadores (Google, Bing, etc.) y también para plataformas de compartido social.
- Sirve para mejorar visibilidad orgánica, calidad del tráfico y conversión.
- Su propósito es que los motores entiendan claramente:
  - de qué trata cada URL,
  - cuál es su versión canónica,
  - cómo debe mostrarse en resultados y redes,
  - y cómo se relaciona con el resto del sitio.

## Flujo SEO por cada nueva página
1. Crear la página con slug limpio y descriptivo (`nuevo-proyecto.html`).
2. Completar metadatos base en `<head>`.
3. Añadir datos estructurados (`JSON-LD`) según tipo de página.
4. Agregar enlaces internos desde páginas existentes.
5. Incluir la URL en `sitemap.xml`.
6. Verificar que no tenga `noindex` (excepto páginas técnicas).
7. Ejecutar auditoría local.
8. Publicar y solicitar inspección en Search Console.

## Plantilla mínima obligatoria por página indexable
- `<title>` único y descriptivo.
- `<meta name="description">` clara y con intención.
- `<meta name="robots" content="index,follow,...">`.
- `<link rel="canonical" href="URL_ABSOLUTA">`.
- `<link rel="alternate" hreflang="es">` y `x-default`.
- Open Graph completo:
  - `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`, `og:locale`.
- Twitter completo:
  - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`.
- `JSON-LD` válido (`WebPage`, `CollectionPage`, `ProfilePage`, `SoftwareApplication`, etc.).

## Reglas de indexación
- Indexables: páginas de producto, catálogo, inicio, about, privacidad.
- No indexables: páginas técnicas/internas (ejemplo: `lntcnfg.html`, `404.html`).
- Nunca incluir páginas `noindex` en `sitemap.xml`.

## Reglas de calidad de contenido
- Un único `<h1>` por página.
- Evitar títulos y descripciones duplicadas entre URLs.
- Mantener consistencia semántica entre:
  - `title`,
  - `description`,
  - `h1`,
  - y `JSON-LD`.
- Usar texto alternativo (`alt`) descriptivo en imágenes de valor semántico.

## Rendimiento y UX (impacto SEO)
- Mantener sitio rápido y responsive en móvil.
- Evitar recursos bloqueantes innecesarios.
- Usar imágenes optimizadas (peso y dimensiones correctas).
- Preservar estabilidad visual y accesibilidad básica.

## Cadencia operativa recomendada
- Por release:
  - correr auditoría SEO,
  - validar páginas nuevas,
  - actualizar sitemap.
- Semanal:
  - revisar cambios recientes en páginas indexables.
- Mensual:
  - auditar metadata duplicada/faltante,
  - revisar interlinking y páginas huérfanas.
- Trimestral:
  - revisar estrategia de contenido y entidades en `JSON-LD`.

## Definition Of Done SEO (DoD)
Una URL nueva se considera lista solo si:
- pasa auditoría local sin errores críticos,
- aparece en sitemap,
- tiene canonical absoluto correcto,
- tiene OG/Twitter/JSON-LD válidos,
- y está enlazada desde al menos otra URL del sitio.

## Operación rápida
- Ejecutar auditoría:
```bash
python scripts/seo_audit.py
```
- Resultado esperado:
  - `OK`: página cumple estándar base.
  - `WARN`: mejora sugerida.
  - `ERROR`: corregir antes de publicar.
