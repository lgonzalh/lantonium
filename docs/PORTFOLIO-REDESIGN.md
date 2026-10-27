# Rediseño del portafolio

## Decisiones de arquitectura y contenido

- Se conserva la navegación global definida en `index.html`: **Apps**, **Acerca de**, **Privacidad**, en ese orden y con los mismos destinos. La ficha de Acerca de no incluía el tercer enlace; se restableció para que la navegación sea consistente.
- El footer conserva el texto corporativo en la barra fija translúcida. Se retiró el contador de GoatCounter que no cargaba.
- La portada presenta a Luis Gonzalez como ingeniero de software y conserva el mensaje B2B/local-first de Lantonium en una sección propia. SEVETCO se usa como imagen destacada porque ya cuenta con una captura real clara de su panel web.
- La imagen principal se rota como **Producto del día** por las 12 fichas en orden de catálogo cada vez que se abre o restaura la portada. Se recuerda la última aplicación en el navegador para que no se repita consecutivamente. No se muestra un total global de visitas: el hosting estático no ofrece un contador compartido y un número en `localStorage` sería solo local, no una cifra real de visitantes.
- La página **Apps** adapta la composición editorial de la referencia `p5aholic.me/projects`: índice tipográfico numerado, reglas finas y una vista previa enmarcada que responde al hover y al foco de teclado con capturas locales reales. En Lantonium se mantienen la cabecera, el footer, la tipografía, los tonos de marca y los filtros; en móvil la vista previa pasa encima de la lista.
- El catálogo contiene las 12 aplicaciones con ficha disponible. Imbalances ya tenía ficha, video y capturas, pero no aparecía en Apps; se incorporó como producto de escritorio de finanzas.
- El filtro **Web** incluye VTF como herramienta web y SEVETCO por su panel web; PDF+ e Imbalances están en **Escritorio**; las aplicaciones con ficha Android aparecen bajo **Android**. SEVETCO pertenece a Web y Android.
- Condor es el único producto marcado **En Desarrollo**. Las demás fichas se muestran como **Desarrollado**, de acuerdo con el estado confirmado para el catálogo.
- Se usan las capturas existentes y se ajusta el encuadre para conservar la interfaz completa en las vistas móviles y de escritorio. No se añadieron imágenes de relleno. PDFr permanece fuera del sitio y del catálogo.

## Interacción, accesibilidad y rendimiento

- La búsqueda y los filtros se alojan en el contenido de Apps, fuera del menú global. Admiten búsqueda por nombre o descripción, proyectos asignados a más de una plataforma, contador de resultados, estado vacío y el atajo `/` para enfocar la búsqueda.
- Se mantiene Ford Antenna, el interruptor claro/oscuro y los estados de foco visibles. El contraste de superficies y textos se define para ambos temas.
- La animación de partículas usa 76 elementos en escritorio y 28 en móvil de forma predeterminada, se limita a 30 cuadros por segundo y a un DPR máximo de 1.5 (1.25 en móvil). También se pausa en pestañas ocultas y respeta `prefers-reduced-motion`.
- Las tarjetas reveladas al hacer scroll, el movimiento de imágenes y los controles tienen alternativa sin movimiento para quien la solicite en el sistema.

## Plantilla de las fichas de aplicaciones

- Todas las fichas siguen el orden **título → descripción de una oración → reseña → funcionalidades → galería → tecnología/enlaces**. La galería solo muestra los medios que existen; no se inventan videos ni capturas para completar el patrón.
- VTF, PDF+ y las capturas cuadradas mantienen la proporción original de cada imagen. Las cuadrículas responden por CSS propio, incluso sin Bootstrap, y las capturas de SEVETCO se separan en grupos web y móvil con dimensiones apropiadas a cada formato.
- La sección **Tecnología y enlaces** reúne el stack confirmado y los destinos públicos disponibles. Si el código fuente no está publicado, se explica que el repositorio es privado; no se muestra un botón de GitHub que abra contenido distinto.
- El menú usa la misma estructura, nombres, destinos y orden en todas las páginas. Su botón móvil tiene un control JavaScript de respaldo cuando no está disponible Bootstrap; las galerías también conservan el zoom, los controles de teclado y el cierre accesible sin esa dependencia.
- Los títulos de portada, catálogo y fichas usan una escala más contenida, manteniendo Ford Antenna y la jerarquía de marca.

## Comprobación

`tests/site-apps.test.cjs` comprueba las opciones y el orden del menú en todas las páginas con cabecera, los 12 productos/estados, los enlaces e imágenes reales, filtros, tema/tipografía, la estructura común de las fichas, las galerías y los límites de las partículas.
