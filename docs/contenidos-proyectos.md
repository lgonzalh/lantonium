# Textos del portafolio personal

Contacto: lantonium@gmail.com

## Cóndor

**Descripción breve:** Ingeniería de software local-first que preserva el contexto y el conocimiento de cada proyecto.

**Descripción:** Herramienta local-first de ingeniería de software asistida por IA que conserva el contexto, la arquitectura y las decisiones de cada proyecto.

**Reseña:** Condor es una plataforma local-first de ingeniería de software asistida por inteligencia artificial que prioriza el conocimiento del proyecto antes que la generación de código. Preserva el contexto, mantiene la coherencia arquitectónica y convierte cada decisión en conocimiento permanente mediante documentación viva, trazabilidad y desarrollo guiado por arquitectura. En Condor la conversación es temporal: la documentación es la fuente oficial de verdad.

**Funcionalidades:**

- Documentación viva como fuente oficial de verdad: el contexto no se pierde entre sesiones.
- Desarrollo guiado por arquitectura: comprender, planificar, diseñar, implementar, verificar y documentar.
- Trazabilidad de decisiones técnicas en documentos permanentes.
- Modelos de IA locales (LLM) sin dependencia de servicios externos.
- Continuidad entre sesiones, herramientas y modelos sin depender de conversaciones anteriores.

**Tecnologías:** .NET · C# · Ollama para modelos locales · Clean Architecture (CLI / Core / Infrastructure) · Markdown

## VeriPago

**Descripción breve:** Organiza cobros QR, pedidos y seguimiento de confirmaciones de pago.

**Descripción:** Proyecto web y Android para organizar cobros QR con Nequi, Daviplata y Bre-B, con acceso mediante Google y herramientas según el perfil del usuario.

**Reseña:** VeriPago reúne enlaces de pago, pedidos y seguimiento de estados en una experiencia para comercios y compradores. El dinero se transfiere directamente al comercio. La conciliación de notificaciones y la validación integral continúan en desarrollo; no se presenta como una pasarela bancaria ni como un servicio de verificación infalible.

**Funcionalidades:**

- Enlaces públicos de pago y pedidos.
- Acceso con Google y perfiles de usuario.
- Seguimiento de pedidos y estados de cobro.
- Aplicación Android con almacenamiento local y sincronización diferida.

**Tecnologías:** Kotlin · Jetpack Compose · Room · Firebase Authentication · Cloud Firestore · Cloud Functions · aplicación web

## SEVETCO

**Descripción breve:** Gestión operativa, servicios y proveedores desde una plataforma web y móvil.

**Descripción:** Plataforma de gestión operativa con panel web para administración y una aplicación Android para el trabajo desde dispositivos móviles. Proyecto académico de pregrado: Ingeniería de Desarrollo de Software, Politécnico Grancolombiano.

**Reseña:** SEVETCO combina un panel web de administración y proveedores con una aplicación móvil para apoyar las tareas de gestión desde distintos dispositivos.

**Funcionalidades:**

- Panel web para administración y proveedores.
- Acceso desde dispositivos móviles.
- Autenticación y gestión de información integrada con Firebase.

**Tecnologías:** Web: HTML · CSS · JavaScript · Firebase · Firebase Authentication · Cloud Firestore. Android: Kotlin · Jetpack Compose.

## Pixelados

**Descripción breve:** Un lienzo táctil de pixel art con herramientas de dibujo y exportación PNG.

**Descripción:** Aplicación Android para crear pixel art con herramientas de dibujo, paletas de color y exportación de imágenes PNG.

**Reseña:** Pixelados convierte la pantalla táctil en un lienzo de píxeles. Sus controles están pensados para dibujar con un dedo y desplazarse o ampliar el lienzo con dos, con guardado de dibujos y herramientas para continuar editándolos.

**Funcionalidades:**

- Lienzos de varios tamaños y herramientas de dibujo, relleno, borrado y selección.
- Paletas de colores, simetría, cuadrícula y capa de referencia.
- Deshacer por trazo y guardado de dibujos.
- Exportación PNG sin suavizado y con transparencia.
- Paletas de apariencia y modos claro y oscuro.

**Tecnologías:** Android · Kotlin · Jetpack Compose · exportación PNG

## OFUserControlApp

**Descripción breve:** Auditoría y sincronización de identidades entre sistemas externos y Directorio Activo.

**Descripción:** Aplicación para contrastar listados de usuarios en Excel con Active Directory, consultar discrepancias y revisar los resultados del procesamiento.

**Reseña:** OFUserControlApp apoya la revisión de identidades entre sistemas externos y Active Directory. Importa información de hojas de cálculo, compara registros y presenta diferencias que requieren revisión. Su estructura separa la lógica de negocio, la persistencia y la interfaz; SignalR comunica el avance del procesamiento. Es una herramienta de apoyo a la auditoría, cuyos resultados deben interpretarse según las reglas y fuentes de cada organización.

**Funcionalidades:**

- Comparación de listados de usuarios con información de Active Directory.
- Importación, validación y exportación de información desde hojas de cálculo.
- Consulta de discrepancias y estados de actividad de usuarios.
- Seguimiento del avance de carga y procesamiento mediante SignalR.

**Tecnologías:** .NET 10 · ASP.NET Core · C# · Clean Architecture · PostgreSQL · Supabase · SignalR

## DocuSheetBot

**Descripción breve:** Automatiza documentos y sincroniza datos con IA desde Android.

**Descripción:** Automatiza la captura y lectura de documentos en Android, valida los datos extraídos y los sincroniza con hojas de cálculo.

**Reseña:** DocuSheetBot acelera la gestión documental en Android. Procesa imágenes, extrae datos y organiza la información para análisis y reporte.

**Funcionalidades:**

- Escaneo y procesamiento inteligente de documentos.
- Sincronización con hojas de cálculo.
- Validación y auditoría básica de cambios.
- Diseño minimalista y optimizado para móvil.

**Tecnologías:** Kotlin · Android SDK · OCR e IA en el dispositivo · Google Sheets API

## LocalTranscriptor

**Descripción breve:** Transcribe audio a texto en el dispositivo y mantiene el procesamiento local.

**Descripción:** Aplicación Android para transcribir voz y archivos de audio, con procesamiento local e historial en el dispositivo.

**Reseña:** LocalTranscriptor convierte voz y archivos de audio en texto desde Android. Mantiene el procesamiento y el historial en el dispositivo para trabajar con el contenido localmente. La calidad de la transcripción depende del audio, el modelo utilizado y los recursos del equipo; el texto resultante puede revisarse antes de reutilizarlo.

**Funcionalidades:**

- Transcripción de voz con identificación de pausas y segmentos.
- Procesamiento de archivos de audio almacenados en el dispositivo.
- Historial local de transcripciones para consulta posterior.
- Captura de audio en segundo plano según los permisos y restricciones de Android.

**Tecnologías:** Kotlin · Android SDK · modelos locales de IA · SQLite

## PayTollApp

**Descripción breve:** Gestión automatizada de pagos de peaje y recargas electrónicas.

**Descripción:** Aplicación web para administrar vehículos, tarjetas de peaje, pagos, recargas y extractos. Proyecto de grado de la formación tecnológica en desarrollo de software del SENA.

**Reseña:** PayTollApp reúne en una aplicación web la administración de vehículos y tarjetas de peaje, junto con el registro y la consulta de pagos y recargas. El proyecto integra una interfaz web, servicios en .NET y una base de datos PostgreSQL. Fue desarrollado como proyecto de grado de la formación tecnológica en el SENA y permite mostrar el flujo completo entre interfaz, lógica de negocio y persistencia.

**Funcionalidades:**

- Gestión de usuarios, vehículos y tarjetas de peaje vinculadas.
- Registro y consulta de pagos y recargas de saldo.
- Generación de extractos e historial de movimientos.
- Servicios backend en .NET y persistencia en PostgreSQL.
- Módulo Shortcut para ejecutar y revisar consultas SQL.

**Tecnologías:** .NET 8 · ASP.NET Core · Entity Framework Core · PostgreSQL en Supabase · HTML · CSS · Bootstrap 5 · JavaScript · Google Cloud Run

## PDF+

**Descripción breve:** Herramientas de escritorio para editar, organizar y convertir documentos PDF.

**Descripción:** Aplicación de escritorio para editar, organizar y convertir documentos PDF.

**Reseña:** PDF+ reúne herramientas habituales para trabajar con documentos PDF en una interfaz de escritorio: edición, gestión de páginas, inserción de imágenes y conversión de archivos.

**Funcionalidades:**

- Edición de texto e imágenes en páginas PDF.
- Reordenamiento y administración de páginas.
- Fusión de documentos y creación de PDF desde imágenes.
- Conversión y herramientas de visualización del documento.

**Tecnologías:** .NET 8 · Windows Forms · PDFiumViewer · PdfPig · PDFsharp

## Video to Frames

**Descripción breve:** Extrae fotogramas de videos MP4 y los guarda como imágenes JPG.

**Descripción:** Herramienta web que extrae fotogramas de archivos MP4 y los guarda como imágenes JPG.

**Reseña:** Video to Frames (VTF) procesa videos para generar imágenes individuales. La interfaz acompaña el flujo desde la selección del archivo hasta la descarga de los fotogramas.

**Funcionalidades:**

- Carga de videos MP4.
- Conversión de fotogramas a imágenes JPG.
- Vista previa de los pasos de procesamiento.
- Descarga de los resultados generados.

**Tecnologías:** Next.js 15 · React 18 · TypeScript

## Imbalances

**Descripción breve:** Auditoría financiera intercompany y conciliación de balances desde Excel.

**Descripción:** Aplicación de escritorio para comparar balances entre compañías y apoyar la conciliación de cuentas a partir de archivos Excel.

**Reseña:** Imbalances apoya la revisión de saldos entre compañías mediante archivos Excel. Recorre carpetas de trabajo, contrasta cuentas por cobrar y por pagar, y presenta diferencias para su análisis. Los hallazgos y estados de revisión se gestionan sobre las plantillas de origen, sin requerir una base de datos adicional. La herramienta organiza la información de apoyo al cierre; la validación contable corresponde a quien realiza la revisión.

**Funcionalidades:**

- Lectura de libros de Excel organizados en carpetas y subcarpetas.
- Comparación de cuentas por cobrar y por pagar entre compañías.
- Identificación de reportes disponibles y pendientes para el cierre.
- Registro de hallazgos y estados de revisión en las plantillas de origen.
- Panel de diferencias para apoyar el análisis y las correcciones contables.

**Tecnologías:** Aplicación de escritorio · Excel · conciliación intercompany y validación de balances

## PDF a PNG Móvil

**Descripción breve:** Convierte documentos PDF a imágenes PNG directamente desde el móvil.

**Descripción:** Aplicación Android para convertir páginas de documentos PDF a imágenes PNG mediante procesamiento local.

**Reseña:** PDF a PNG Móvil permite convertir documentos PDF en imágenes desde un teléfono o una tableta Android. El procesamiento se realiza en el dispositivo y facilita reutilizar páginas como imágenes para compartirlas o archivarlas. El tamaño de los archivos resultantes depende del documento y de la resolución de conversión; convertir a PNG no implica reducir su tamaño.

**Funcionalidades:**

- Conversión de páginas PDF a imágenes PNG.
- Procesamiento local de los documentos, sin conexión a internet para la conversión.
- Uso desde teléfonos y tabletas Android compatibles.

**Tecnologías:** Android 12+ · Kotlin · Jetpack Compose · conversión local de páginas PDF a PNG

## YT Downloader - Clipper

**Descripción breve:** Descarga videos y extrae segmentos precisos de audio y video.

**Descripción:** Aplicación de escritorio para descargar videos o audio y seleccionar segmentos de contenido propio o autorizado.

**Reseña:** YT Downloader - Clipper combina una interfaz de escritorio en Python con yt-dlp y FFmpeg. Permite analizar un enlace, elegir los formatos disponibles y descargar el contenido completo o un intervalo seleccionado. Presenta el progreso de la operación y permite definir la carpeta de salida. Está orientado al uso con contenido propio, autorizado o cuyo aprovechamiento esté permitido, respetando las condiciones del servicio de origen.

**Funcionalidades:**

- Selección de tiempos de inicio y finalización para preparar clips.
- Modos de video con audio, solo video o extracción de audio a MP3.
- Selección de calidad según los formatos disponibles en el origen.
- Seguimiento de progreso, velocidad y tiempo estimado de descarga.
- Entrada de enlaces desde el portapapeles y selección de carpeta de destino.

**Tecnologías:** Python 3 · Tkinter · yt-dlp · FFmpeg · Pillow · SQLite

## YT2MP3

**Descripción breve:** Convierte el audio de listas de YouTube a MP3 desde Android.

**Descripción:** Aplicación Android para descargar audio de listas de YouTube y convertirlo a MP3 a 192 kbps, destinada a contenido propio o con autorización de uso.

**Reseña:** Permite revisar una lista antes de descargarla, consultar el tamaño estimado y el espacio disponible, y elegir la carpeta de destino. Las descargas se ejecutan en segundo plano con notificaciones de progreso. Requiere Android 13 o posterior y una clave de YouTube Data API configurada por el usuario.

**Funcionalidades:**

- Validación de enlaces de listas de YouTube.
- Confirmación de canciones, tamaño estimado y espacio libre.
- Descargas en segundo plano con WorkManager.
- Conversión a MP3 y elección de carpeta de destino.

**Tecnologías:** Kotlin · Jetpack Compose · Material 3 · WorkManager · Retrofit · Moshi · DataStore · YouTube Data API v3 · yt-dlp · FFmpeg

## AppSistemaClientes

**Descripción breve:** Proyecto académico en Java orientado a un sistema de clientes.

**Descripción:** Aplicación de escritorio para gestionar registros de clientes, desarrollada en Java durante la formación tecnológica en el SENA.

**Reseña:** Integra una interfaz JavaFX con servicios Spring Boot y persistencia en MySQL. Permite consultar, guardar y eliminar clientes mediante una separación entre presentación, servicios y repositorio.

**Funcionalidades:**

- Listado y búsqueda de clientes por identificador.
- Registro y actualización de clientes.
- Eliminación de registros.
- Interfaz JavaFX y persistencia con Spring Data JPA.

**Tecnologías:** Java 22 · JavaFX 22 · Spring Boot 3.2 · Spring Data JPA · MySQL · Maven

