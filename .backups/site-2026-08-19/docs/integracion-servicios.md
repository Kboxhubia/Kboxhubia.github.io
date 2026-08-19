# Integración de servicios y flujo de trabajo recomendado

## 0. ¿Qué es MCP y por qué lo necesitamos?

MCP significa Model Context Protocol. Es un estándar para que un agente o asistente inteligente pueda conectarse de manera segura a herramientas y sistemas externos como Notion, Supabase, Linear, GitHub, calendarios y otros servicios.

En este proyecto, MCP sirve para que el portal y los agentes puedan:
- leer contenido desde Notion
- guardar contenido o metadatos en Supabase
- sincronizar roadmap y tareas de Linear o Asana
- consultar datos de GitHub
- administrar archivos privados con reglas de seguridad
- crear un flujo más coordinado entre IA y herramientas reales

### Conectores MCP recomendados para este proyecto
- `kboxhubia-mcp-supabase`
- `kboxhubia-mcp-notion`
- `kboxhubia-mcp-linear`
- `kboxhubia-mcp-asana`
- `kboxhubia-mcp-github`
- `kboxhubia-mcp-fireworks`

### Para qué sirve cada uno
- Supabase MCP: lecturas y escrituras de tablas, almacenamiento y contenido dinámico
- Notion MCP: extracción de bases de datos, páginas, metas y contenido editorial
- Linear MCP: backlog, tareas y roadmap del portal
- Asana MCP: tareas del equipo o gestión de diseño y producción
- GitHub MCP: repos y pull requests, revisión y sincronización de trabajo
- Fireworks MCP: generación de imágenes y texto para branding o ideas visuales

### Cómo se configura normalmente
1. Crear una cuenta o proyecto en el servicio objetivo.
2. Generar una clave o token de acceso.
3. Configurar el servidor MCP en tu entorno local o en un servicio intermedio.
4. Añadir las variables de entorno y permisos.
5. Probar cada conexión con un comando o consulta simple.
6. Validar que el agente puede leer la información sin errores.

### Recomendación para tu caso
Para este portal, los dos MCP más importantes son:
- Supabase MCP para contenido dinámico y almacenamiento privado
- Notion MCP para contenido editorial y administración del portal

---

## 1. Respaldo diario y local del sitio

### Qué hace el script
El script de respaldo crea:
- una copia diaria por fecha
- una copia `site-latest`
- un archivo `.tar.gz` comprimido
- un mirror opcional en una ruta local del equipo

### Cómo usarlo localmente
1. Abre una terminal en la carpeta del repositorio.
2. Ejecuta:
   ```bash
   LOCAL_BACKUP_PATH="/ruta/de/tu/pc/respaldo-kboxhubia" ./scripts/backup-site.sh
   ```
3. Si quieres enviar notificación a tu PC usando ntfy, define antes:
   ```bash
   export NTFY_TOPIC="kboxhubia-backup"
   ./scripts/notify-site.sh "Respaldo del sitio completado"
   ```
4. Para ejecutar respaldo manual en GitHub Actions, usa el botón `Run workflow`.

### Requisitos mínimos
- `rsync` instalado en tu equipo Linux/macOS.
- `curl` para notificaciones.
- GitHub Actions disponible con permisos de escritura.

---

## 2. Integración de Supabase

### Qué es y para qué sirve
Supabase es la base operativa del portal dinámico. Aquí se guarda la información que necesita la web para mostrarse, además de archivos privados y contenido que no tiene que estar dentro del repositorio.

### Qué vas a crear
- un proyecto de Supabase
- una base de datos principal
- tablas de contenido
- un bucket público para recursos visuales
- un bucket privado para archivos y documentos sensibles
- claves de acceso para lectura y administración

### Nombres sugeridos de los elementos
- Proyecto: `kboxhubia-portal`
- Base de datos: `portal_db`
- Bucket público: `site-assets`
- Bucket privado: `private-files`
- Tablas:
  - `profile`
  - `services`
  - `projects`
  - `blog_posts`
  - `media_assets`
  - `private_uploads`
  - `site_settings`

### Qué información va en cada tabla
- `profile`: datos del perfil profesional y redes
- `services`: servicios y texto promocional
- `projects`: proyecto, stack y links
- `blog_posts`: publicaciones, contenido y fecha
- `media_assets`: imágenes, audio, logo y archivos visuales
- `private_uploads`: archivos privados con log de subida
- `site_settings`: texto general del sitio, SEO y branding

### Credenciales que necesitas obtener
- URL del proyecto
- anon key
- service role key

### Flujo recomendado
1. Crear el proyecto en Supabase.
2. Crear la base de datos.
3. Crear las tablas y columnas sugeridas.
4. Crear los buckets de almacenamiento.
5. Activar reglas de seguridad.
6. Conectar la web con la URL y claves.
7. Probar una lectura de ejemplo.

---

### Qué te pide Supabase
1. Crea un proyecto nuevo en Supabase.
2. Guarda estos valores:
   - URL del proyecto
   - API key anónima
   - API key service role
3. Crea una tabla para:
   - `posts`
   - `services`
   - `projects`
   - `upload_log`

### Qué necesitas darme
- URL del proyecto
- API key anónima
- nombre del bucket o tabla
- si quieres contenido dinámico o solo contenido estático

### Paso a paso para integrar
1. Crear proyecto en Supabase.
2. Crear tablas.
3. Conectar con fetch o SDK.
4. Usar RLS solo para lectura pública y escritura privada.
5. Activar almacenamiento para archivos privados.

---

## 3. Integración de Notion

### Qué es y para qué sirve
Notion funciona como tu centro de contenido editorial y trabajo del portal. Es útil para redactar artículos, planear proyectos, documentar ideas, mantener roadmap y organizar contenido antes de publicarlo.

### Qué vas a crear
- una integración nueva en Notion
- una base de datos principal para contenido
- bases opcionales para roadmap y archivos
- token de acceso
- IDs de base de datos

### Nombres sugeridos
- Integración: `kboxhubia-portal-integration`
- Base de contenido: `Portal Content`
- Base de roadmap: `Portal Roadmap`
- Base de media: `Media Library`

### Estructura recomendada de cada base
- `Portal Content`
  - título
  - resumen
  - estado
  - categoría
  - fecha
  - enlace
- `Portal Roadmap`
  - tarea
  - prioridad
  - estado
  - fecha estimada
  - responsable
- `Media Library`
  - nombre
  - tipo
  - categoria
  - url
  - notas

### Credenciales que necesitas obtener
- token de integración
- ID de cada base

### Flujo recomendado
1. Crear una integración en Notion.
2. Conectar la integración a la base de datos deseada.
3. Copiar el token secreto.
4. Copiar el ID de la base.
5. Probar la consulta con una página de ejemplo.
6. Conectar ese contenido al portal.

---

### Qué te pide Notion
1. Crear una base de datos.
2. Crear un token de integración.
3. Conceder acceso a la base.
4. Guardar el ID de la base.

### Qué necesitas darme
- Token de integración
- ID de la base
- nombre de la vista o tabla
- si usarás Notion como CMS o solo como backlog

### Paso a paso
1. Crea una integración en Notion.
2. Conéctala a la base de datos.
3. Obtén el ID de la base.
4. Consulta la API con `https://api.notion.com/v1/databases/...`.
5. Mapea cada propiedad para posts, tareas o proyectos.

---

## 4. Integración de Linear

### Qué te pide Linear
1. Crear una API key en Linear.
2. Guardar la clave y el workspace.
3. Elegir entre:
   - backlog de proyectos
   - roadmap del rediseño
   - tickets de mantenimiento

### Qué necesitas darme
- API key
- nombre del workspace
- permisos deseados
- si quieres sincronizar solo tareas o también comentarios

### Paso a paso
1. Crear token en Linear.
2. Conectar con GraphQL.
3. Consultar `issues`, `projects`, `cycles`.
4. Mostrar tareas en la sección de roadmap del portal.

---

## 5. Integración de Asana

### Qué te pide Asana
1. Crear un token personal o app.
2. Obtener ID del proyecto.
3. Definir tareas asociadas al portal.

### Qué necesitas darme
- token de acceso
- ID del proyecto
- si deseas tareas públicas o solo internas

### Paso a paso
1. Crear proyecto en Asana.
2. Generar token.
3. Consultar proyectos y tareas.
4. Mostrar el estado del rediseño o roadmap.

---

## 6. Integración de Fireworks

### Qué te pide Fireworks
1. Crear cuenta.
2. Generar API key.
3. Definir el uso: texto, imágenes o generación de prompts.

### Qué necesitas darme
- API key
- caso de uso principal
- tipo de contenido: texto, imágenes o UX

### Paso a paso
1. Crear acceso a Fireworks AI.
2. Conectar la API con tu backend o frontend.
3. Usar un endpoint para generar metáforas visuales, anuncios o variantes de UI.
4. Guardar resultados en tu repositorio o Supabase.

---

## 7. Integración de Google Calendar / Google Drive / Google Workspace

### Qué te pide Google
1. Crear un proyecto en Google Cloud.
2. Habilitar Calendar API o Drive API.
3. Generar credenciales.
4. Definir un alcance necesario.

### Qué necesitas darme
- proyecto de Google Cloud
- cliente ID / secret
- calendario o carpeta a usar
- si quieres reuniones o almacenamiento de archivos

### Paso a paso
1. Crear proyecto y habilitar API.
2. Configurar OAuth.
3. Observar disponibilidad del calendario.
4. Enlazar la agenda con la página de contacto o reservas.

---

## 8. Subida privada de archivos

### Opción recomendada
Usar Supabase Storage o AWS S3 con autenticación privada.

### Qué necesitas darme
- proveedor de almacenamiento
- bucket o carpeta
- credenciales
- si quieres que sea solo visible por ti o por usuarios autenticados

### Recomendación segura
- no hacer upload directo desde GitHub Pages sin backend
- usar un formulario protegido o un portal admin con auth
- guardar una referencia del archivo en la base de datos

---

## 9. Rediseño del portal dinámico

### Recomendación de arquitectura
- Frontend: HTML + CSS + JS moderno
- CMS: Supabase o Notion
- Portafolio: GitHub API + contenido local
- Assets: SVG, ilustraciones y video premium
- Subidas privadas: Supabase Storage o S3

### Mejor ruta para este proyecto
1. Presentación con diseño premium.
2. Portafolio dinámico y automatizado.
3. Blog y publicaciones gestionadas.
4. Formulario de contacto con reservas y agenda.
5. Panel privado para upload de archivos.

---

## 10. Lo que necesito de ti para cada servicio

### Para cada integración, necesito exactamente esto:
- nombre del servicio
- cuenta o proyecto ya existente
- credenciales o permisos de acceso
- si el servicio será público, privado o interno
- objetivo funcional concreto

### Si no me das esos datos, puedo dejarte:
- la arquitectura
- el flujo técnico
- el paso a paso
- la plantilla para que tú lo configures
- pero no podré completar la conexión desde aquí sin tus credenciales reales.

---

## 11. Próximo paso recomendado

1. Elige los servicios que quieres activar primero:
   - Supabase
   - Notion
   - Linear
   - Asana
   - Fireworks
   - Google Calendar
2. Me indicas el orden de prioridad.
3. Yo te dejo el esquema final por cada uno, con:
   - qué crear
   - qué configuración exacta necesitas
   - qué archivos del repositorio se modifican
   - qué pruebas se deben hacer

---

## 12. Resumen corto

La solución moderna para este proyecto es combinar:
- GitHub Pages o repositorio estático para la web
- GitHub Actions para backup diario
- Supabase para contenido y archivos privados
- Notion/Linear/Asana para gestión
- Fireworks para diseño o contenido asistido
- Google Calendar para agenda

Con esto se obtiene un portal dinámico, profesional, con respaldo, automatización y una base sólida para crecer.
