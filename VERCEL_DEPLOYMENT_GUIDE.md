# Guía de Resolución de Despliegues y Configuración Vercel

**Autor:** Ing. Jorge Huerta
**Fecha:** 27 de Agosto de 2026
**Proyecto:** Portal Web & Presentación DeepTech — Kboxhubia

---

## 📌 Diagnóstico del Error en Despliegues (Deployments) de Vercel

Si se observan 2 o más despliegues fallidos o colgados en el panel de **Vercel**, las causas más frecuentes en sitios HTML/estáticos con activos pesados son:

1. **Ruta de Build / Ajustes de Framework:** Vercel detecta automáticamente proyectos Node/Next.js/Vite. Si no existe un `package.json` con scripts de build, Vercel intenta deducir un framework o falla si la raíz del repositorio no se especifica como un *Other / HTML Static Site*.
2. **Ignorado de Archivos de Salida o Scripts:** Si hay scripts ejecutable de Python o temporales en la raíz, Vercel puede intentar ejecutarlos durante la fase de instalación/build.
3. **Límite de Tamaño de Commits / Caché de Git:** Subir PDFs de alta resolución (como `assets/docs/Presentacion_Ing_Jorge_Huerta_DeepTech_LinkedIn.pdf`, 19 MB) directamente en Git puede causar timeouts durante el git clone de Vercel en la fase de construcción si los límites de transferencia se exceden.

---

## 🛠️ Solución Paso a Paso para Reparar Vercel

### 1. Archivo de Configuración NATIVO (`vercel.json`)
Se ha generado en la raíz del repositorio el archivo `vercel.json` con la siguiente estructura limpia para hosting estático de alta velocidad:

```json
{
  "version": 2,
  "name": "kboxhubia-deeptech-portal",
  "cleanUrls": true,
  "trailingSlash": false,
  "routes": [
    {
      "src": "/presentation",
      "dest": "/presentation.html"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/assets/docs/Presentacion_Ing_Jorge_Huerta_DeepTech_LinkedIn.pdf",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/pdf"
        },
        {
          "key": "Content-Disposition",
          "value": "attachment; filename=\"Presentacion_Ing_Jorge_Huerta_DeepTech_LinkedIn.pdf\""
        }
      ]
    }
  ]
}
```

### 2. Ajustes en el Panel Web de Vercel (Dashboard)
Ingrese a su cuenta en [vercel.com](https://vercel.com/) y realice los siguientes pasos:

1. Ingrese al **Project Settings** de su proyecto `Kboxhubia.github.io` o `kboxhubia-deeptech-portal`.
2. Diríjase a **Build & Development Settings**:
   - **Framework Preset:** Seleccione **`Other`** (o *Static Site*).
   - **Build Command:** Déjelo **VACÍO** (o desactívelo marcando *Override* sin escribir comando).
   - **Output Directory:** Déjelo **VACÍO** o escribe `./` (para publicar directamente la raíz del repositorio).
   - **Install Command:** Déjelo **VACÍO** (desactive `npm install`).
3. En la sección **Git**:
   - Asegúrese de que la rama conectada sea `main` o `feature/linkedin-deeptech-presentation`.
   - Si un despliegue anterior quedó bloqueado, presione **Redeploy** > desmarque **Use existing Build Cache** y presione **Redeploy**.

### 3. Despliegue Manual con Vercel CLI (Opción Rápida)
Si prefiere realizar el despliegue directo desde su terminal local sin depender de Git webhooks:

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Autenticarse en Vercel
vercel login

# Desplegar a entorno de Preview
vercel

# Desplegar a Producción directamente
vercel --prod
```

---

## 🚀 Estado de la Integración

- **Visualización en Sitio Web:** La presentación ahora se encuentra integrada en la sección `#presentacion` de `index.html` y accesible de forma directa en `presentation.html`.
- **Embudo de Suscripción (Lead Magnet):** Para descargar el PDF oficial de 18 láminas, el usuario ingresa su correo en el formulario, enviando una notificación instantánea a `huboxhubia@gmail.com` e iniciando la descarga automatizada del archivo.
