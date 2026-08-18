# Workpaper del proyecto: portal digital profesional, respaldo y sistema de integración

## 1. Objetivo general
Crear un portal web moderno, dinámico y profesional para Kboxhubia, con:
- presencia digital premium
- respaldo automático del sitio
- panel de administración para archivos privados
- integración con Supabase y Notion
- estrategia para crecimiento profesional y networking en LinkedIn
- documentación clara para continuidad y mantenimiento

## 2. Alcance del proyecto

### 2.1 Portal web
- landing page moderna
- secciones de servicios
- perfil profesional
- proyectos y repositorios
- contacto
- blog / artículos
- panel privado para archivos

### 2.2 Respaldo de seguridad
- copia completa del sitio por fecha
- versión latest para restauración rápida
- sincronización local opcional
- notificación vía ntfy
- backup automatizado en GitHub Actions

### 2.3 Integraciones
- Supabase: base de datos, archivos privados y contenido dinámico
- Notion: gestión editorial y roadmap
- MCP: conexión segura entre agentes y herramientas externas
- LinkedIn strategy agent: perfil técnico, marca personal, estrategia de contenidos

## 3. Estado actual del proyecto

### Completado
- creación de agentes especializados
- respaldo diario configurado
- panel admin base funcional
- documentación de servicios e integraciones
- base visual premium del portal

### En curso
- conexión real con Supabase
- conexión real con Notion
- diseño final del portal dinámico completo
- estrategia de contenido y marca para LinkedIn

### Pendiente
- credenciales reales y proyectos de Supabase
- token y bases de Notion
- configuración final de conexión
- revisión de contenido y branding profesional

## 4. Agentes creados

### 4.1 site-backup
Responsabilidad:
- respaldo diario del sitio
- mirror de archivos
- versiones por fecha
- commit y notificación

### 4.2 portal-redesign
Responsabilidad:
- diseño integral del portal moderno
- estructura visual premium
- organización de contenido
- plan para integración dinámica

### 4.3 linkedin-brand
Responsabilidad:
- estrategia de contenido
- perfil profesional para LinkedIn
- networking y marca personal
- propuestas de posts y roadmap de publicación

## 5. Estructura de archivos relevante

- [.github/agents/site-backup.agent.md](.github/agents/site-backup.agent.md)
- [.github/agents/portal-redesign.agent.md](.github/agents/portal-redesign.agent.md)
- [.github/agents/linkedin-brand.agent.md](.github/agents/linkedin-brand.agent.md)
- [.github/workflows/backup-site.yml](.github/workflows/backup-site.yml)
- [scripts/backup-site.sh](scripts/backup-site.sh)
- [scripts/notify-site.sh](scripts/notify-site.sh)
- [admin.html](admin.html)
- [assets/css/style.css](assets/css/style.css)
- [assets/js/main.js](assets/js/main.js)
- [docs/integracion-servicios.md](docs/integracion-servicios.md)

## 6. Integración MCP y servicios del ecosistema

### 6.1 Qué es MCP en este proyecto
MCP permite que los agentes puedan comunicarse de forma segura con servicios externos sin depender de trabajo manual constante. En este proyecto, el valor principal es reforzar la capacidad de coordinación entre:
- Supabase
- Notion
- GitHub
- Linear
- Asana
- Fireworks

### 6.2 Conectores MCP recomendados
- `kboxhubia-mcp-supabase`
- `kboxhubia-mcp-notion`
- `kboxhubia-mcp-linear`
- `kboxhubia-mcp-asana`
- `kboxhubia-mcp-github`
- `kboxhubia-mcp-fireworks`

### 6.3 Flujo recomendado de integración MCP
1. Configurar el servicio objetivo
2. Crear token o clave de acceso
3. Registrar el servidor MCP
4. Añadir variables de entorno
5. Validar acceso con una prueba simple
6. Conectar el agente o el portal a la herramienta
7. Revisar permisos y limitar acceso mínimo necesario

### 6.4 Supabase
Objetivo:
- almacenamiento de contenido y archivos privados
- datos del sitio
- panel de administración seguro
- contenido y media

Elementos a crear:
- proyecto de Supabase
- base de datos
- tablas
- buckets de almacenamiento
- API keys
- conector del portal a Supabase

### 6.5 Notion
Objetivo:
- contenido editorial y backlog
- gestión de tareas, artículos, roadmap y proyectos

Elementos a crear:
- integración de Notion
- base de datos
- propiedades y filtros
- token de acceso
- conector del portal a Notion

### 6.6 LinkedIn
Objetivo:
- posicionamiento profesional
- estrategia de networking
- contenido técnico y de marca personal

Elementos a crear:
- posicionamiento del perfil
- contenido en pilares definidos
- plan editorial
- estrategia de networking

## 7. Requisitos de configuración esperados

### Supabase
- URL del proyecto
- anon key
- service role key
- nombre del proyecto
- bucket principal

### Notion
- token de integración
- ID de base de datos
- base(s) necesarias para contenido y tareas

### LinkedIn
- perfil actual
- público objetivo
- temas prioritarios
- estrategia de publicaciones

## 8. Siguientes pasos recomendados

1. Crear el proyecto de Supabase con el nombre recomendado.
2. Crear las tablas y buckets necesarios.
3. Crear la base de datos y la integración en Notion.
4. Configurar la capa MCP para Supabase y Notion.
5. Recuperar las credenciales necesarias.
6. Conectar el portal a Supabase y Notion.
7. Diseñar la versión final del portal dinámico.
8. Crear la estrategia de LinkedIn y plan de contenido.
9. Revisar el roadmap de marketing / networking y oportunidades.

## 9. Entrega final prevista
La entrega final del proyecto consiste en una plataforma digital profesional con:
- diseño premium y moderno
- respaldo automático diario
- panel de administración para archivos privados
- dinámica por Supabase
- contenido editorial por Notion
- conectores MCP para expandir la automatización
- estrategia de crecimiento y marca personal en LinkedIn

## 10. Conclusión
Este proyecto combina un sitio web moderno, una capa de seguridad y respaldo, una base para contenido dinámico, una estructura basada en MCP y una estrategia profesional más allá del portal. El enfoque actual es robusto y escalable: primero estabilizar la base técnica, luego activar la capa de gestión editorial y contenido, y finalmente reforzar la presencia profesional en LinkedIn y herramientas de automatización.
