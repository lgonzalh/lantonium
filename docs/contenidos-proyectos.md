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

**Descripción:** Audita identidades mediante archivos Excel, contrasta usuarios con Active Directory y sincroniza los resultados.

**Reseña:** OFUserControlApp es una solución de ingeniería de software desarrollada en ASP.NET Core 10.0 diseñada para la gestión crítica de identidades mediante el procesamiento automatizado de archivos Excel de alta volumetría. La aplicación implementa Clean Architecture para garantizar una separación estricta de intereses, utilizando PostgreSQL sobre Supabase como motor de persistencia cloud-native. El sistema optimiza el flujo de validación de usuarios contra el Directorio Activo, permitiendo detectar discrepancias de acceso y estados de actividad de forma ágil, asegurando el cumplimiento de las políticas de seguridad y gobernanza de datos en entornos empresariales complejos. (2025)

**Funcionalidades:**

- Validación Cruzada Automatizada: Ejecución de algoritmos de coincidencia entre listados externos y el Directorio Activo mediante el cruce de datos en capas de base de datos optimizadas.
- Arquitectura N-Layer Escalable: Implementación estructurada (Domain, Application, Infrastructure) que permite la extensibilidad del sistema y el desacoplamiento de la lógica de negocio.
- Monitoreo Transaccional en Tiempo Real: Interfaz dinámica potenciada por SignalR que proporciona retroalimentación instantánea sobre el progreso de la carga y el procesamiento de registros.
- Procesamiento de Datos: Motor de integración de hojas de cálculo de alto rendimiento para la extracción, validación y exportación de reportes técnicos detallados.

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

**Descripción:** Transcribe voz en tiempo real y archivos de audio desde Android, manteniendo el procesamiento y el historial en el dispositivo.

**Reseña:** LocalTranscriptor es una solución especializada en la conversión de señales acústicas a texto legible mediante procesamiento local estrictamente privado. El sistema permite transformar tanto flujos de voz en tiempo real como archivos multimedia preexistentes en registros textuales, eliminando la necesidad de conexión a internet para asegurar una latencia mínima de respuesta.

**Funcionalidades:**

- Transcripción instantánea con reconocimiento de pausas y segmentos de voz.
- Procesamiento de archivos locales en formatos comprimidos y de alta fidelidad.
- Almacenamiento persistente en base de datos para consulta diferida del historial.
- Ejecución robusta en segundo plano para permitir la captura sin interrupciones.

**Tecnologías:** Kotlin · Android SDK · modelos locales de IA · SQLite

## PayTollApp

**Descripción breve:** Gestión automatizada de pagos de peaje y recargas electrónicas.

**Descripción:** Plataforma cloud para administrar vehículos, tarjetas de peaje, pagos, recargas y extractos. Proyecto de grado: Tecnólogo en Desarrollo de Software, SENA.

**Reseña:** PayTollApp es una solución web full-stack diseñada para centralizar y agilizar las operaciones de peaje electrónico. El sistema integra un backend robusto y escalable desarrollado en .NET 8 con una interfaz de usuario limpia e intuitiva. Mediante una arquitectura serverless desplegada en Google Cloud Run, garantiza alta disponibilidad, seguridad en las transacciones y una experiencia fluida para la administración de vehículos, tarjetas y pagos, eliminando fricciones operativas.

**Funcionalidades:**

- Gestión integral de usuarios, vehículos y tarjetas de peaje vinculadas.
- Procesamiento de pagos y recargas de saldo en tiempo real.
- Generación automática de extractos y consultas de historial de movimientos.
- Arquitectura serverless escalable alojada en Google Cloud Run.
- Módulo interactivo "Shortcut" para la ejecución y diagnóstico de consultas SQL.
- Persistencia de datos segura mediante PostgreSQL en Supabase.

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

**Descripción:** Aplicación de escritorio para analizar balances y apoyar la conciliación financiera intercompany desde Excel.

**Reseña:** Imbalances es una solución de ingeniería financiera desarrollada en C# que optimiza la auditoría de holdings mediante el procesamiento acelerado de volúmenes diversos de archivos Excel. La arquitectura permite una integración recursiva con OneDrive, validando de forma ágil la reciprocidad entre Cuentas por Cobrar (CxC) y Cuentas por Pagar (CxP). Al operar directamente sobre los archivos fuente, el sistema garantiza una trazabilidad inmediata sin necesidad de infraestructura de base de datos adicional.

**Funcionalidades:**

- Procesamiento Masivo y Ágil: Ejecución de algoritmos de lectura rápida sobre múltiples libros de Excel distribuidos en diversas subcarpetas para un análisis simultáneo de datos.
- Auditoría de Reciprocidad: Identificación precisa de desequilibrios financieros entre entidades del holding mediante el cruce de cuentas relacionadas.
- Validación de Disponibilidad Documental: Monitoreo automatizado de la presencia o ausencia de reportes críticos para el cierre mensual.
- Persistencia Directa en Origen: Gestión de hallazgos y estados de verificación realizada íntegramente sobre las plantillas originales, asegurando la portabilidad de la información.
- Panel de Disconformidades en Tiempo Real: Visualización técnica de hallazgos para agilizar la toma de decisiones y correcciones contables.

**Tecnologías:** Aplicación de escritorio · Excel · conciliación intercompany y validación de balances

## PDF a PNG Móvil

**Descripción breve:** Convierte documentos PDF a imágenes PNG directamente desde el móvil.

**Descripción:** Convierte páginas de documentos PDF a imágenes PNG directamente en un dispositivo Android.

**Reseña:** PDF a PNG Móvil es una herramienta de conversión optimizada para transformar documentos PDF en formato de imagen PNG, diseñada específicamente para funcionar eficientemente en dispositivos móviles. La aplicación permite procesar archivos PDF directamente desde el teléfono o tablet, manteniendo la calidad de la imagen y reduciendo el tamaño del archivo resultante para facilitar el compartir y almacenar conversiones de documentos.

**Funcionalidades:**

- Conversión de PDF a PNG con alta fidelidad visual.
- Optimización automática para dispositivos móviles.
- Procesamiento local sin necesidad de conexión a internet.
- Compatibilidad con múltiples resoluciones de pantalla.
- Interfaz intuitiva y fácil de usar.

**Tecnologías:** Android 12+ · Kotlin · Jetpack Compose · conversión local de páginas PDF a PNG

## YT Downloader - Clipper

**Descripción breve:** Descarga videos y extrae segmentos precisos de audio y video.

**Descripción:** Herramienta de escritorio para descargar videos y extraer segmentos específicos de audio y video.

**Reseña:** YT Downloader - Clipper es una aplicación de escritorio desarrollada en Python que proporciona una interfaz gráfica intuitiva y directa para la gestión de descargas multimedia. El sistema integra el potente motor de procesamiento de yt-dlp y FFMPEG, permitiendo no solo la descarga de videos completos y audios en alta definición, sino la capacidad avanzada de extraer segmentos de tiempo específicos ("clipping"). Esto reduce significativamente los tiempos de transferencia, el uso de ancho de banda y el almacenamiento, descargando únicamente el fragmento de interés. Su diseño legacy standalone y portabilidad lo convierten en una utilidad altamente eficiente y robusta para preparar el material audiovisual desde esa fuente de manera local.

**Funcionalidades:**

- Extracción Precisa de Segmentos: Controles integrados para establecer tiempos de inicio y finalización exactos, permitiendo descargar clips específicos directamente desde el origen sin necesidad de post-procesamiento.
- Selección Multi-Formato y Calidad: Permite configurar la descarga en modo Video + Audio, Solo Video o Solo Audio, con selector dinámico de resoluciones hasta 1080p y superiores según disponibilidad.
- Monitoreo de Telemetría de Red: Barra de progreso en tiempo real que expone métricas críticas como porcentaje completado, velocidad de transferencia (MiB/s), tiempo estimado de finalización (ETA) y tamaño del archivo.
- Interfaz Gráfica Funcional (GUI): Panel de control minimalista que incluye integración directa con el portapapeles del sistema para agilizar el flujo de entrada de URLs y definición de directorios de destino.

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

