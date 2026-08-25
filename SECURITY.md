# Política de Seguridad — Kboxhubia

Gracias por ayudar a mantener la seguridad de nuestros proyectos. Este documento describe cómo reportar vulnerabilidades, qué esperar del proceso de respuesta y las responsabilidades del equipo de Kboxhubia.

## Contacto de seguridad
- Correo preferente (privado): kuboxhubia@gmail.com
- Reporte seguro vía GitHub Security Advisories: https://github.com/Kboxhubia/Kboxhubia.github.io/security/advisories
- (Opcional) Clave PGP pública para comunicaciones cifradas: (inserte fingerprint / URL si aplica)

> No publique vulnerabilidades en issues públicos ni en foros públicos antes de que sean corregidas.

## Alcance
- Repositorio: Kboxhubia/Kboxhubia.github.io (sitio estático: HTML/CSS/JS).
- Lo que cubre: vulnerabilidades en el contenido del sitio, en el sistema de despliegue (GitHub Pages + workflows), y en dependencias y herramientas usadas para construir/desplegar el sitio (por ejemplo: paquetes Node, acciones de GitHub Actions, etc.).
- Lo que no cubre: problemas en servicios externos de terceros sin relación directa con este repositorio (reportar a los proveedores correspondientes).

## Cómo reportar una vulnerabilidad (plantilla recomendada)
Envía un correo a kuboxhubia@gmail.com o abre un Advisory privado en GitHub. Incluye:
1. Título breve.
2. Componente afectado / URL / versión (si aplica).
3. Descripción clara del problema.
4. Pasos para reproducir (instrucciones concretas, comandos, parámetros).
5. Prueba de concepto (PoC) o captura de pantalla / vídeo, si es posible.
6. Impacto estimado (confidencialidad, integridad, disponibilidad).
7. Entorno donde se reproduce (navegador, versión, OS, etc.).
8. Tu información de contacto para seguimiento (email, seudónimo).
9. Si deseas acreditación pública (sí/no).

## Proceso y tiempos de respuesta
- Confirmación de recepción: dentro de 72 horas laborables.
- Triage inicial y prioridad: dentro de 7 días laborables.
- Mitigación/solución: dependerá de la gravedad; trabajamos por fases:
  - Crítico: patch inmediato / hotfix (24–72 h preferente).
  - Alto: solución dentro de 7–30 días según complejidad.
  - Medio/Bajo: programado en el ciclo normal de mantenimiento o en el próximo release.
- Comunicación: mantendremos informado al reportante por correo hasta la resolución.
- Divulgación pública: coordinada con el reportante; por defecto aplicamos un periodo de divulgación responsable (p. ej. 90 días) salvo riesgo inminente que requiera acelerar la publicación.

## Clasificación de severidad (orientativa)
- Crítico: ejecución remota de código sin interacción, acceso total a datos/infraestructura.
- Alto: fuga de datos sensibles, escalada de privilegios locales.
- Medio: bypasses limitados, fuga de información no sensible.
- Bajo: información pública o problemas de configuración menores.

## Remediación y seguimiento
- Publicaremos parches y actualizaciones en el repo y en el Advisory de GitHub.
- Para dependencias: habilitar/usar Dependabot o actualizaciones automáticas y documentar versiones afectadas y fijas.
- Después de aplicar el parche, solicitaremos pruebas de verificación al reportante si está disponible.

## Reconocimientos
- Podemos reconocer a las personas que reporten vulnerabilidades de forma responsable (con su permiso) en un archivo `SECURITY_ACKNOWLEDGEMENTS.md` o similar.

## Aviso legal / Safe Harbor
- Agradecemos los reportes de buena fe. No tomaremos acciones legales contra investigadores que actúen de buena fe y respeten este proceso (no hacer pruebas destructivas ni divulgar públicamente antes de la corrección).

## Versiones soportadas
- Este repositorio contiene un sitio estático; no aplica el modelo de versiones tradicional. Si tu reporte afecta una dependencia (p. ej. una acción de GitHub, paquete NPM), indica la versión exacta afectada. Mantendremos un registro de dependencias críticas y su estado en este documento.

## Recomendaciones operativas (para los mantenedores)
- Añadir CODEOWNERS con responsables de seguridad.
- Habilitar GitHub Security Alerts y Dependabot para dependencias.
- Mantener el canal de comunicación y la clave PGP si se desea intercambio cifrado.
- Revisar y actualizar SECURITY.md cada 6–12 meses.

---
Fecha de última revisión: 2026-08-25
