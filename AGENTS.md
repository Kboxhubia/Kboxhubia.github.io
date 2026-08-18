# Manual de Agentes y Reglas Operativas — Kboxhubia

Este documento define las reglas de conducta, habilidades, convenciones y directrices de integración para los agentes de Inteligencia Artificial y desarrolladores que colaboran con el **Ing. Jorge Huerta** en **Kboxhubia**.

---

## 1. Reglas Generales de Interacción y Trabajo

1. **Protocolo de Reglas ("Regla")**:
   - Cada vez que el Ing. Jorge Huerta indique la frase `"regla"` o solicite incorporar una norma de desarrollo o comportamiento, el agente debe registrarla inmediatamente en este archivo (`AGENTS.md`) o en la documentación correspondiente.
2. **Enfoque de Desarrollo**:
   - Enfoque **DeepTech**, innovador, con estándares visuales y de código profesionales, limpios y eficientes.
   - Código libre de dependencias innecesarias, optimizado para alto rendimiento (Static HTML/CSS/JS, GitHub Pages, CI/CD).
3. **Comunicación**:
   - Clara, precisa, respetuosa y estructurada.
   - Explicaciones técnicas y no técnicas según se requiera, priorizando la agilidad en la toma de decisiones.

---

## 2. Ecosistema Tecnológico y Stack

### Lenguajes Core & Backend
- **Core Languages**: Python, C++, Rust, Go.
- **Backend & APIs**: FastAPI, Node.js, REST APIs, Microservicios.

### Agentes & Herramientas IA Modernas
- **Ecosistema Agentic & Coding**: Claude Code, Cursor, Lovable, Kimi, OpenCode, Codex, Antigravity.
- **Arquitectura IA**: Agentes Multinivel, Prompt Engineering, RAG, MCP (Model Context Protocol).

### Infraestructura, Cloud & Ciberseguridad
- **Sistemas Operativos**: Linux Debian, Datacenters.
- **DevOps & Security**: CI/CD, GitHub Actions, DevSecOps, Ciberseguridad y Endpoints seguros.
- **Cloud & DB**: GitHub Pages, Supabase (DB + Storage), Notion (CMS / Editorial).

---

## 3. Configuración de Servicios MCP e Integraciones

Los agentes deben mantener el estándar MCP para la conexión segura con los servicios del ecosistema:

- **kboxhubia-mcp-supabase**: Gestión de base de datos, autenticación y storage privado.
- **kboxhubia-mcp-notion**: Conexión con tableros, roadmap y CMS editorial.
- **kboxhubia-mcp-github**: Automatización de repositorios, workflows y despliegues en GitHub Pages.
- **kboxhubia-mcp-linear / asana**: Seguimiento de tareas y sprints.
- **kboxhubia-mcp-fireworks**: Inferencia y modelos de IA.

### Protocolo de Integración MCP
1. Definir variables de entorno en el entorno o GitHub Secrets.
2. Limitar permisos al principio de mínimo privilegio (Least Privilege).
3. Probar la conectividad de forma aislada antes de conectar al flujo principal.

---

## 4. Estándares para el Sitio Web (GitHub Pages)

- **Landing Page**: One-Page dinámico, responsivo, estético y realista con estética DeepTech.
- **Internacionalización**: Soporte Multilingüe (ES / EN).
- **Despliegue**: Publicación automática en `https://kboxhubia.github.io/` mediante GitHub Pages.
- **Respaldos**: Workflows automatizados con GitHub Actions para backup diario del sitio.

---

## 5. Historial de Reglas Incorporadas

* **[Regla 001]**: Estructura One-Page para la landing principal, integrando perfil profesional completo, proyectos estrella (estilo 77oaking) y catálogo ampliado de servicios DeepTech.
* **[Regla 002]**: Inclusión explícita de stack tecnológico especializado (Python, C++, Rust, Go, FastAPI, DevSecOps, Linux Debian, herramientas AI agentic).
