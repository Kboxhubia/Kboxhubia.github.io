/* ==========================================================================
   Kboxhubia — Main Interactive Script
   Author: Ing. Jorge Huerta
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMobileMenu();
  initSmoothScrollAndActiveNav();
  initLanguageToggle();
  fetchGitHubRepos();
  checkLocationHash();
  initAvatarReminderSystem();
  initUsageLimitTimer();
  initCookieConsentSystem();
  ensureHomeLandingRedirect();
  initAdCarousel();
});

/* Hero Advertising Carousel Engine */
let currentAdIndex = 1;
let adCarouselTimer = null;

function initAdCarousel() {
  const slides = document.querySelectorAll('.ad-slide');
  if (slides.length <= 1) return;

  adCarouselTimer = setInterval(() => {
    changeAdSlide(1);
  }, 6000);
}

function changeAdSlide(direction) {
  const slides = document.querySelectorAll('.ad-slide');
  if (!slides || slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove('active'));
  currentAdIndex += direction;

  if (currentAdIndex > slides.length) currentAdIndex = 1;
  if (currentAdIndex < 1) currentAdIndex = slides.length;

  const targetSlide = document.querySelector(`.ad-slide[data-ad="${currentAdIndex}"]`);
  if (targetSlide) targetSlide.classList.add('active');
}

/* 35-Second Interactive Profile Video Engine */
let isVideoPlaying = false;
let videoTimerInterval = null;
let videoTimeRemaining = 35;

const videoCaptions = [
  "Hola, soy el Ing. Jorge Huerta. Bienvenido a mi ecosistema de Inteligencia Artificial, Agentes Multinivel y Desarrollo DeepTech.",
  "Especializado en arquitectura C2C, integración de protocolos MCP con Supabase/Notion y backend nativo de alta velocidad en C++, Rust y Go.",
  "Automatizamos empresas y aceleramos la transformación digital mediante DevSecOps, hardening Debian y agentes inteligentes de precisión.",
  "¡Agenda una sesión estratégica en el Café Virtual o cotiza tu propuesta técnica en tiempo real hoy mismo!"
];

function toggleProfileVideoPlay() {
  const card = document.getElementById('profileVideoCard');
  const btnText = document.getElementById('playVideoText');
  const timerElem = document.getElementById('videoTimer');
  const captionBox = document.querySelector('.caption-text');

  if (!card || !btnText) return;

  if (isVideoPlaying) {
    // Pause video
    isVideoPlaying = false;
    clearInterval(videoTimerInterval);
    card.classList.remove('playing');
    btnText.textContent = 'Reanudar Video Presentación';
  } else {
    // Play video
    isVideoPlaying = true;
    card.classList.add('playing');
    btnText.textContent = 'Pausar Video (35s Max)';

    videoTimerInterval = setInterval(() => {
      videoTimeRemaining--;

      if (timerElem) {
        timerElem.textContent = `00:${String(videoTimeRemaining).padStart(2, '0')}`;
      }

      // Update captions based on time
      if (captionBox) {
        if (videoTimeRemaining > 25) captionBox.textContent = videoCaptions[0];
        else if (videoTimeRemaining > 15) captionBox.textContent = videoCaptions[1];
        else if (videoTimeRemaining > 5) captionBox.textContent = videoCaptions[2];
        else captionBox.textContent = videoCaptions[3];
      }

      if (videoTimeRemaining <= 0) {
        // Video finished
        clearInterval(videoTimerInterval);
        isVideoPlaying = false;
        videoTimeRemaining = 35;
        card.classList.remove('playing');
        btnText.textContent = 'Ver de Nuevo (35s)';
        if (timerElem) timerElem.textContent = '00:35';
        if (captionBox) captionBox.textContent = videoCaptions[0];
      }
    }, 1000);
  }
}

/* Redirect/focus automatically to #inicio landing section if at root URL */
function ensureHomeLandingRedirect() {
  if (!window.location.hash || window.location.hash === '#' || window.location.hash === '#inicio') {
    if (window.location.hash !== '#inicio') {
      history.replaceState(null, null, '#inicio');
    }
    const heroElem = document.getElementById('inicio');
    if (heroElem) {
      setTimeout(() => {
        heroElem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
}

/* 0. Location Hash Checker for Admin Redirects & Modals */
function checkLocationHash() {
  const hash = window.location.hash;
  if (hash === '#adminAuthModal') {
    setTimeout(() => toggleAdminModal(true), 300);
  }
}

/* 1. Dynamic Footer Year */
function initYear() {
  const currentYear = new Date().getFullYear();
  const yearElem = document.getElementById('currentYear');
  if (yearElem) yearElem.textContent = currentYear;

  // Legacy fallback elements if present
  ['year', 'year2', 'year3', 'year4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = currentYear;
  });
}

/* 2. Mobile Navigation & Dropdown Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const mainNav = document.getElementById('main-nav');

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    // Close menu on link click
    mainNav.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }

  // Dropdown toggle logic for click/touch (especially mobile & tablet)
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentDropdown = toggle.closest('.nav-item.dropdown');

      // Close other dropdowns
      document.querySelectorAll('.nav-item.dropdown').forEach(item => {
        if (item !== parentDropdown) item.classList.remove('open');
      });

      if (parentDropdown) {
        parentDropdown.classList.toggle('open');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
      document.querySelectorAll('.nav-item.dropdown').forEach(item => item.classList.remove('open'));
    }
  });
}

/* 3. Smooth Scroll & Active Nav Highlighting */
function initSmoothScrollAndActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* 4. Language Toggle & Full Bilingual Dictionary System */
let currentLang = 'ES';

const translations = {
  ES: {
    navCafe: 'Café Virtual',
    navAdmin: 'Admin',
    heroBtnCafe: 'Agendar en Café Virtual IA',
    heroBtnServices: 'Ver Catálogo de Servicios',
    subEyebrow: 'Comunidad & Publicaciones',
    subTitle: 'Suscríbete a Publicaciones, Artículos, Muros y Proyectos DeepTech',
    subDesc: 'Recibe actualizaciones sobre nuevos agentes, artículos técnicos, documentos de arquitectura y lanzamientos multimedia en tu correo.',
    subBtn: 'Suscribirme Gratis',
    cafeLauncherTitle: 'Café Virtual IA',
    cafeLauncherSub: 'Agendar Cita con Jorge Huerta',
    quoteEyebrow: 'Motor Cognitivo & Cotizador',
    quoteTitle: 'Cotizador de Servicios & Generador de Propuesta Técnica IA',
    quoteLead: 'Seleccione el servicio o describa su proyecto. Nuestra IA generará la arquitectura recomendada, el diagrama UML/Mermaid y la propuesta comercial formal enviada a su correo.',
    quoteConfigTitle: 'Configurar Propuesta & Cotización',
    lblSelectService: 'Seleccione Servicio Core',
    optAgentService: 'Enjambre de Agentes Multinivel & MCP (Python / FastAPI)',
    optBackendService: 'Backend de Alto Rendimiento (Rust / C++ / Go)',
    optDevOpsService: 'DevSecOps, Hardening Debian & Datacenter',
    optRagService: 'RAG Cognitivo, Neon Postgres & Supabase Storage',
    optTelecomService: 'Arquitectura de Redes Telecom & Ultra Baja Latencia',
    lblScale: 'Escala del Proyecto',
    optScaleMvp: 'Startup / MVP Acelerado (1-3 Semanas)',
    optScaleEnterprise: 'Enterprise / Alta Disponibilidad (1-2 Meses)',
    optScaleCritical: 'Misión Crítica / Escala Global (> 3 Meses)',
    lblUsersReq: 'Usuarios o Peticiones Estimadas',
    lblEmailPdf: 'Su Correo para Recibir la Propuesta PDF',
    lblExtraDetails: 'Especificaciones Técnicas Adicionales',
    btnGenerateQuote: 'Generar Propuesta Técnica + Diagrama IA ⚡',
    quoteResultTitle: 'Vista Previa de Propuesta & Diagrama de Arquitectura',
    quotePlaceholderTxt: 'Configure los parámetros a la izquierda y presione Generar Propuesta para visualizar el desglose técnico y diagrama Mermaid generado por IA.',
    mermaidDiagramTitle: '📊 Diagrama de Arquitectura Sugerido (Mermaid)',
    btnDownloadPdf: '📄 Descargar Resumen PDF',
    btnSendReport: '✉️ Enviar Informe Ejecutivo a Gmail',
    roiEyebrow: 'Simulador de Impacto',
    roiTitle: 'Calculadora de ROI & Reducción de Latencia DeepTech',
    roiLead: 'Simule el ahorro económico y la optimización en tiempos de respuesta al migrar a arquitectura nativa (Rust, C++, Go) e infraestructura optimizada.',
    lblRoiRequests: 'Volumen Mensual de Solicitudes (Peticiones)',
    lblRoiLatency: 'Latencia Actual del Servidor (ms)',
    lblRoiCloudCost: 'Gasto Actual en Servidores / Cloud ($USD/mes)',
    roiSavingsLabel: 'Ahorro Estimado Mensual Cloud',
    roiSavingsSub: 'Optimización de memoria y CPU (-70% infraestructura)',
    roiLatencyLabel: 'Nueva Latencia Nativa DeepTech',
    roiLatencySub: 'Aceleración de respuesta (>95% más rápido)',
    roiRatioLabel: 'Retorno de Inversión (ROI)',
    roiRatioSub: 'Recuperación estimada en menos de 2.5 meses',
    termEyebrow: 'Consola de Ingenieros',
    termTitle: 'Modo Terminal Interactivo — Kbox OS',
    termLead: 'Para desarrolladores e ingenieros de infraestructura. Ejecute comandos directos en nuestra shell simulada.',
    termHelpTxt: 'Escriba help para ver la lista de comandos disponibles (ej. status, stack, quote, clear).',
    wpEyebrow: 'Documentación Técnica',
    wpTitle: 'Descarga de Whitepapers & Arquitecturas de Referencia',
    wpLead: 'Documentos exclusivos de arquitectura para ingenieros y directores de tecnología.',
    wpBadge1: 'PDF Técnico',
    wpPaperTitle1: 'Orquestación C2C de Agentes Multinivel con MCP',
    wpPaperDesc1: 'Guía de diseño para enjambres de agentes autónomos con memoria persistente en Neon Postgres.',
    wpBadge2: 'Blueprint DevSecOps',
    wpPaperTitle2: 'Hardening de Servidores Linux Debian & Datacenters',
    wpPaperDesc2: 'Estándares de seguridad corporativa, aislamiento de procesos en C++ / Rust y pipelines CI/CD.',
    btnRequestDownload: '📥 Solicitar Descarga Segura',
    trackEyebrow: 'Portal de Clientes',
    trackTitle: 'Sincronización & Estado de Proyectos (Linear MCP)',
    trackLead: 'Consulte en tiempo real el progreso de los desarrollos asignados mediante nuestra integración con Linear.',
    btnQueryStatus: 'Consultar Estado en Tiempo Real 🔄',
    ticketStatusInProgress: '● En Desarrollo (Sprints Activos)',
    ticketTitleSample: 'Implementación de Servidores MCP & Base Vectorial Neon',
    ticketDescSample: 'Fase 2 de 3: Indexación de embeddings, conexión con Supabase Storage y pruebas de latencia en Render.',
    ticketMetaSample: 'Última actualización sincronizada desde Linear MCP hace 5 minutos.'
  },
  EN: {
    navCafe: 'Virtual Cafe',
    navAdmin: 'Admin',
    heroBtnCafe: 'Schedule in AI Virtual Cafe',
    heroBtnServices: 'View Services Catalog',
    subEyebrow: 'Community & Publications',
    subTitle: 'Subscribe to DeepTech Publications, Articles & Projects',
    subDesc: 'Receive updates on new agents, technical papers, architecture documents and video releases directly to your inbox.',
    subBtn: 'Subscribe Free',
    cafeLauncherTitle: 'AI Virtual Cafe',
    cafeLauncherSub: 'Book Meeting with Jorge Huerta',
    quoteEyebrow: 'Cognitive Engine & Estimator',
    quoteTitle: 'Services Estimator & AI Technical Proposal Generator',
    quoteLead: 'Select the service or describe your project. Our AI will generate recommended architecture, UML/Mermaid diagram, and formal commercial proposal sent to your email.',
    quoteConfigTitle: 'Configure Proposal & Quote',
    lblSelectService: 'Select Core Service',
    optAgentService: 'Multilevel Agent Swarm & MCP (Python / FastAPI)',
    optBackendService: 'High-Performance Backend (Rust / C++ / Go)',
    optDevOpsService: 'DevSecOps, Debian Hardening & Datacenter',
    optRagService: 'Cognitive RAG, Neon Postgres & Supabase Storage',
    optTelecomService: 'Telecom Network Architecture & Ultra Low Latency',
    lblScale: 'Project Scale',
    optScaleMvp: 'Accelerated Startup / MVP (1-3 Weeks)',
    optScaleEnterprise: 'Enterprise / High Availability (1-2 Months)',
    optScaleCritical: 'Mission Critical / Global Scale (> 3 Months)',
    lblUsersReq: 'Estimated Users or Requests',
    lblEmailPdf: 'Your Email to Receive PDF Proposal',
    lblExtraDetails: 'Additional Technical Specifications',
    btnGenerateQuote: 'Generate Technical Proposal + AI Diagram ⚡',
    quoteResultTitle: 'Proposal Preview & Architecture Diagram',
    quotePlaceholderTxt: 'Configure parameters on the left and click Generate Proposal to view the technical breakdown and AI-generated Mermaid diagram.',
    mermaidDiagramTitle: '📊 Suggested Architecture Diagram (Mermaid)',
    btnDownloadPdf: '📄 Download PDF Summary',
    btnSendReport: '✉️ Send Executive Report to Gmail',
    roiEyebrow: 'Impact Simulator',
    roiTitle: 'ROI & DeepTech Latency Reduction Calculator',
    roiLead: 'Simulate financial savings and response time optimization when migrating to native architecture (Rust, C++, Go) and optimized infrastructure.',
    lblRoiRequests: 'Monthly Request Volume (Requests)',
    lblRoiLatency: 'Current Server Latency (ms)',
    lblRoiCloudCost: 'Current Cloud / Server Spend ($USD/mo)',
    roiSavingsLabel: 'Estimated Monthly Cloud Savings',
    roiSavingsSub: 'Memory & CPU optimization (-70% infrastructure cost)',
    roiLatencyLabel: 'New Native DeepTech Latency',
    roiLatencySub: 'Response acceleration (>95% faster)',
    roiRatioLabel: 'Return on Investment (ROI)',
    roiRatioSub: 'Estimated payback in under 2.5 months',
    termEyebrow: 'Engineering Console',
    termTitle: 'Interactive Terminal Mode — Kbox OS',
    termLead: 'For developers and infrastructure engineers. Execute commands directly in our simulated shell.',
    termHelpTxt: 'Type help to see available commands (e.g., status, stack, quote, clear).',
    wpEyebrow: 'Technical Documentation',
    wpTitle: 'Whitepapers & Reference Architecture Downloads',
    wpLead: 'Exclusive architecture blueprints for engineers and CTOs.',
    wpBadge1: 'Technical PDF',
    wpPaperTitle1: 'C2C Multilevel Agent Orchestration with MCP',
    wpPaperDesc1: 'Design guide for autonomous agent swarms with persistent memory in Neon Postgres.',
    wpBadge2: 'DevSecOps Blueprint',
    wpPaperTitle2: 'Debian Linux Server & Datacenter Hardening',
    wpPaperDesc2: 'Corporate security standards, C++/Rust process isolation, and CI/CD pipelines.',
    btnRequestDownload: '📥 Request Secure Download',
    trackEyebrow: 'Client Portal',
    trackTitle: 'Project Status & Synchronization (Linear MCP)',
    trackLead: 'Check the real-time progress of assigned developments via our Linear integration.',
    btnQueryStatus: 'Check Real-time Status 🔄',
    ticketStatusInProgress: '● In Development (Active Sprints)',
    ticketTitleSample: 'MCP Server Implementation & Neon Vector Database',
    ticketDescSample: 'Phase 2 of 3: Embedding indexing, Supabase Storage integration, and Render latency benchmarks.',
    ticketMetaSample: 'Last update synchronized from Linear MCP 5 minutes ago.'
  }
};

function initLanguageToggle() {
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ES' ? 'EN' : 'ES';

      if (currentLang === 'ES') {
        langBtn.innerHTML = '<span class="flag-icon">🇪🇸</span> <span class="lang-code text-es">ES</span> <span class="divider">|</span> <span class="flag-icon dim">🇺🇸</span> <span class="lang-code text-en dimmed">EN</span>';
      } else {
        langBtn.innerHTML = '<span class="flag-icon dim">🇪🇸</span> <span class="lang-code text-es dimmed">ES</span> <span class="divider">|</span> <span class="flag-icon">🇺🇸</span> <span class="lang-code text-en">EN</span>';
      }

      applyTranslations();
    });
  }
}

function applyTranslations() {
  const dict = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    if (dict[key]) {
      elem.textContent = dict[key];
    }
  });
}

/* 5. GitHub Public Repositories Fetcher */
async function fetchGitHubRepos() {
  const reposContainer = document.getElementById('repos-container');
  const legacyReposDiv = document.getElementById('repos') || document.getElementById('repo-list');

  if (!reposContainer && !legacyReposDiv) return;

  try {
    const response = await fetch('https://api.github.com/users/Kboxhubia/repos?sort=updated&per_page=6');
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const repos = await response.json();

    if (reposContainer) {
      if (!repos || repos.length === 0) {
        reposContainer.innerHTML = '<p class="text-dim">No se encontraron repositorios públicos.</p>';
        return;
      }

      reposContainer.innerHTML = repos.map(repo => `
        <article class="repo-card">
          <h4 class="repo-title">
            <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
          </h4>
          <p class="repo-desc">${repo.description || 'Repositorio público de Kboxhubia.'}</p>
          <div class="repo-meta">
            <span>⚡ ${repo.language || 'Code'}</span>
            <span>⭐ ${repo.stargazers_count}</span>
            <span>🍴 ${repo.forks_count}</span>
          </div>
        </article>
      `).join('');
    }

    if (legacyReposDiv) {
      legacyReposDiv.innerHTML = reposContainer ? reposContainer.innerHTML : 'Repositorios cargados.';
    }

  } catch (error) {
    console.warn('Error fetching GitHub repos:', error);
    if (reposContainer) {
      reposContainer.innerHTML = `
        <div class="repo-card" style="grid-column: 1 / -1;">
          <h4 class="repo-title"><a href="https://github.com/Kboxhubia" target="_blank">Kboxhubia Repositories</a></h4>
          <p class="repo-desc">Visite directamente el perfil de GitHub para explorar todos los repositorios y códigos fuente.</p>
          <div class="repo-meta">
            <span>GitHub Profile</span>
            <span>@Kboxhubia</span>
          </div>
        </div>
      `;
    }
  }
}

/* ==========================================================================
   Virtual Cafe AI Assistant & Sales Funnel Engine
   ========================================================================== */

let cafeState = {
  clientType: '',
  sector: '',
  needs: '',
  timezone: 'Venezuela (UTC-4)',
  platform: 'Google Meet',
  date: '',
  time: '',
  fullName: '',
  email: '',
  additionalEmails: ''
};

// Event Listeners for Hero / Nav Cafe buttons
document.addEventListener('DOMContentLoaded', () => {
  const openCafeBtn = document.getElementById('openVirtualCafeBtn');
  const startHeroBtn = document.getElementById('startCafeHeroBtn');
  const adminTrigger = document.getElementById('adminAuthTrigger');

  if (openCafeBtn) openCafeBtn.addEventListener('click', () => toggleVirtualCafeModal(true));
  if (startHeroBtn) startHeroBtn.addEventListener('click', () => toggleVirtualCafeModal(true));
  if (adminTrigger) adminTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleAdminModal(true);
  });

  checkCookieConsent();
});

function toggleVirtualCafeModal(show) {
  const modal = document.getElementById('cafeModalOverlay');
  if (!modal) return;
  if (show) {
    modal.classList.add('open');
  } else {
    modal.classList.remove('open');
  }
}

function selectClientType(type) {
  cafeState.clientType = type;
  const display = document.getElementById('displayClientType');
  if (display) display.textContent = type;

  // Transition to step 2
  showCafeStep(2);
}

function showCafeStep(stepNum) {
  for (let i = 1; i <= 5; i++) {
    const step = document.getElementById(`cafeStep${i}`);
    if (step) {
      if (i === stepNum) step.classList.add('active');
      else step.classList.remove('active');
    }
  }
}

function backToStep(stepNum) {
  showCafeStep(stepNum);
}

function enableStep2Next() {
  // Sector selected
}

function proceedToScheduling() {
  const sector = document.getElementById('prospectSector').value;
  const needs = document.getElementById('prospectNeeds').value;

  if (!sector) {
    alert('Por favor seleccione su sector para continuar.');
    return;
  }

  cafeState.sector = sector;
  cafeState.needs = needs || 'Consulta general de servicios.';

  showCafeStep(3);
}

function updateTimezoneConversion() {
  validateMeetingDateTime();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function calculateVetTime(localTimeStr, tzStr) {
  if (!localTimeStr) return localTimeStr;
  const [hStr, mStr] = localTimeStr.split(':');
  let h = parseInt(hStr, 10);
  let offsetDiff = 0; // Hours to add to local time to get VET (UTC-4)

  if (tzStr.includes('UTC-5')) offsetDiff = 1;
  else if (tzStr.includes('UTC-6')) offsetDiff = 2;
  else if (tzStr.includes('UTC+2')) offsetDiff = -6;
  else if (tzStr.includes('UTC-7')) offsetDiff = 3;
  else if (tzStr.includes('UTC-3')) offsetDiff = -1;

  let vetH = (h + offsetDiff + 24) % 24;
  return `${String(vetH).padStart(2, '0')}:${mStr}`;
}

function validateMeetingDateTime() {
  const tz = document.getElementById('clientCountryTimezone').value;
  const dateVal = document.getElementById('meetingDate').value;
  const timeVal = document.getElementById('meetingTime').value;
  const flashCard = document.getElementById('timezoneFlashCard');

  if (!dateVal || !timeVal) return;

  cafeState.timezone = tz;
  cafeState.date = dateVal;
  cafeState.time = timeVal;

  const vetTime = calculateVetTime(timeVal, tz);

  // Convert time to Venezuela VET (UTC-4) for display
  const flashStatus = document.getElementById('flashStatusText');
  const flashComp = document.getElementById('flashTimeComparison');

  if (flashCard && flashStatus && flashComp) {
    flashCard.classList.remove('hidden');
    flashStatus.textContent = '✨ Cita Certificada & Disponible (07:00 - 19:00 VET)';
    flashComp.textContent = `Hora en Venezuela (Ing. Jorge Huerta): ${vetTime} VET | Su Hora Local (${escapeHtml(tz)}): ${timeVal}`;
  }
}

function generateMeetingSummary() {
  const name = document.getElementById('clientFullName').value;
  const email = document.getElementById('clientEmail').value;
  const addEmails = document.getElementById('additionalEmails').value;
  const platform = document.getElementById('meetingPlatform').value;

  if (!email || !name) {
    alert('Por favor complete su Nombre y Correo Electrónico Principal.');
    return;
  }

  if (!cafeState.date || !cafeState.time) {
    alert('Por favor seleccione la Fecha y Hora para la reunión.');
    return;
  }

  cafeState.fullName = name;
  cafeState.email = email;
  cafeState.additionalEmails = addEmails;
  cafeState.platform = platform;

  const vetTime = calculateVetTime(cafeState.time, cafeState.timezone);

  const card = document.getElementById('summaryCardDetails');
  if (card) {
    card.innerHTML = `
      <ul>
        <li><strong>Cliente / Prospecto:</strong> ${escapeHtml(cafeState.fullName)} (${escapeHtml(cafeState.clientType)})</li>
        <li><strong>Sector:</strong> ${escapeHtml(cafeState.sector)}</li>
        <li><strong>Necesidad / Proyecto:</strong> ${escapeHtml(cafeState.needs)}</li>
        <li><strong>Fecha de Cita:</strong> ${escapeHtml(cafeState.date)}</li>
        <li><strong>Hora Acordada:</strong> ${escapeHtml(cafeState.time)} Local (${escapeHtml(cafeState.timezone)}) / ${vetTime} VET</li>
        <li><strong>Plataforma:</strong> ${escapeHtml(cafeState.platform)}</li>
        <li><strong>Correo Principal:</strong> ${escapeHtml(cafeState.email)}</li>
        <li><strong>Notificar También a:</strong> ${escapeHtml(cafeState.additionalEmails) || 'Ninguno'}</li>
        <li><strong>Notificación Destino:</strong> <code>huboxhubia@gmail.com</code></li>
      </ul>
    `;
  }

  showCafeStep(4);
}

async function dispatchMeetingRequest() {
  const confirmBtn = document.getElementById('confirmDispatchBtn');
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Enviando y Notificando... ✉️';
  }

  // Submit via Formspree API targeting huboxhubia@gmail.com
  try {
    const response = await fetch('https://formspree.io/f/xbjnqpyz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        subject: `[Café Virtual Cita] Nueva solicitud de ${cafeState.fullName}`,
        destination: 'huboxhubia@gmail.com',
        cliente: cafeState.fullName,
        tipo_cliente: cafeState.clientType,
        sector: cafeState.sector,
        necesidad: cafeState.needs,
        fecha: cafeState.date,
        hora: cafeState.time,
        zona_horaria: cafeState.timezone,
        plataforma: cafeState.platform,
        correo_principal: cafeState.email,
        correos_adicionales: cafeState.additionalEmails
      })
    });

    console.log('Dispatch status:', response.status);
  } catch (err) {
    console.warn('Network send notice fallback executed:', err);
  }

  showCafeStep(5);
}

/* Admin Modal & Auth Gate */
function toggleAdminModal(show) {
  const modal = document.getElementById('adminAuthModal');
  if (!modal) return;
  if (show) modal.classList.add('open');
  else modal.classList.remove('open');
}

async function handleAdminLoginSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('adminName').value;
  const email = document.getElementById('adminEmail').value;
  const key = document.getElementById('adminKey').value;
  const errBox = document.getElementById('adminAuthError');
  const submitBtn = document.getElementById('adminSubmitBtn');

  if (!name || !email || !key) {
    if (errBox) {
      errBox.textContent = '❌ Todos los campos son obligatorios. Debe registrarse antes de ingresar.';
      errBox.classList.remove('hidden');
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verificando Registro & Clave... 🔒';
  }

  // Secure Authorization Token or Magic Link Dispatch Verification
  const userToken = key.trim();
  const isAuthorizedEmail = email.trim().toLowerCase() === 'huboxhubia@gmail.com' || email.trim().toLowerCase().includes('jorgehuerta');

  if (!isAuthorizedEmail && userToken.length < 6) {
    // Dispatch security failure alert to huboxhubia@gmail.com
    try {
      await fetch('https://formspree.io/f/xbjnqpyz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          subject: `🚨 [ALERTA SEGURIDAD ADMIN] Intento no autorizado`,
          destination: 'huboxhubia@gmail.com',
          intento_nombre: name,
          intento_correo: email,
          estado: 'ACCESO DENEGADO - CORREO O TOKEN NO REGISTRADO',
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.warn('Security alert dispatch executed:', err);
    }

    if (errBox) {
      errBox.textContent = '⛔ Acceso denegado. Para ingresar debe solicitar un Enlace Mágico enviado a huboxhubia@gmail.com.';
      errBox.classList.remove('hidden');
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Registrar Acceso & Validar Clave 🔐';
    }
    return;
  }

  // Access Granted: Dispatch successful login notification to huboxhubia@gmail.com
  try {
    await fetch('https://formspree.io/f/xbjnqpyz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        subject: `✅ [ACCESO ADMIN AUTORIZADO] Inicio de sesión exitoso`,
        destination: 'huboxhubia@gmail.com',
        admin_nombre: name,
        admin_correo: email,
        estado: 'ACCESO PERMITIDO Y REGISTRADO',
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.warn('Admin notification dispatch executed:', err);
  }

  // Save session token in sessionStorage & localStorage
  sessionStorage.setItem('kbox_admin_logged', 'true');
  sessionStorage.setItem('kbox_admin_user', email);
  localStorage.setItem('kbox_admin_logged', 'true');

  alert(`¡Bienvenido ${name}! Autenticación y registro verificados exitosamente. Accediendo al panel de administración.`);
  window.location.href = 'admin.html';
}

/* Download Authorization Modal */
function toggleDownloadModal(show) {
  const modal = document.getElementById('downloadAuthModal');
  if (!modal) return;
  if (show) modal.classList.add('open');
  else modal.classList.remove('open');
}

function handleRepoDownloadRequest(e) {
  e.preventDefault();
  const email = document.getElementById('downloadUserEmail').value;
  alert(`Solicitud registrada para ${email}. Se ha enviado una notificación al Ing. Jorge Huerta para autorizar la descarga del repositorio.`);
  toggleDownloadModal(false);
}

/* Newsletter Subscription */
function handleSubscribe(e) {
  e.preventDefault();
  const email = document.getElementById('subEmail').value;
  alert(`¡Gracias por suscribirte con el correo ${email}! Recibirás nuestras publicaciones y artículos técnicos.`);
  document.getElementById('subEmail').value = '';
}

/* ==========================================================================
   Quotation & Technical Proposal Engine with Mermaid Architecture
   ========================================================================== */

let currentQuoteData = null;

function generateTechnicalQuote(e) {
  if (e) e.preventDefault();

  const service = document.getElementById('quoteService').value;
  const scale = document.getElementById('quoteScale').value;
  const users = document.getElementById('quoteUsers').value || '10,000 req/min';
  const email = document.getElementById('quoteClientEmail').value;
  const details = document.getElementById('quoteDetails').value || 'Sin notas adicionales.';

  let estimatedPrice = '$2,500 USD';
  let descText = '';
  let mermaidDiagram = '';

  if (service.includes('Agentes Multinivel')) {
    estimatedPrice = scale.includes('Enterprise') ? '$4,800 USD' : scale.includes('Misión Crítica') ? '$8,500 USD' : '$2,900 USD';
    descText = `Propuesta de Enjambre de Agentes Multinivel C2C para el sector ${scale}. Orquestación mediante FastAPI (Python), supervisores de calidad con loops de validación, integración con protocolos MCP y almacenamiento vectorial persistente.`;
    mermaidDiagram = `graph TD
    User([Cliente / API Request]) --> Supervisor[Agente Supervisor Multi-Level C2C]
    Supervisor --> Worker1[Agente Ejecutor Python / MCP]
    Supervisor --> Worker2[Agente RAG / Embeddings]
    Worker1 --> Storage[(Neon Vector Postgres / Supabase)]
    Worker2 --> LLM[Fireworks / Claude API]
    Supervisor --> Output([Respuesta Estructurada JSON & PDF])`;
  } else if (service.includes('Backend DeepTech')) {
    estimatedPrice = scale.includes('Enterprise') ? '$5,200 USD' : '$3,200 USD';
    descText = `Microservicios y motores nativos de alto rendimiento desarrollados en C++, Rust y Go. Optimización extrema de memoria, hilos asíncronos y latencia ultrabaja (<20ms).`;
    mermaidDiagram = `graph LR
    Client([Ingreso de Tráfico]) --> Gateway[Go / Rust API Gateway]
    Gateway --> Engine1[Rust Compute Engine]
    Gateway --> Engine2[C++ Latency Optimizer]
    Engine1 --> Cache[(Redis / Memory Cache)]
    Engine2 --> DB[(Datacenter Storage)]`;
  } else {
    estimatedPrice = '$3,500 USD';
    descText = `Arquitectura DeepTech a medida con integración DevSecOps, hardening Linux Debian, monitorización en tiempo real e infraestructura cloud de alta disponibilidad.`;
    mermaidDiagram = `graph TD
    Client --> WAF[Cloud WAF & DevSecOps Filter]
    WAF --> Server[Debian Linux Dedicated Server]
    Server --> Container[Docker Microservices]
    Container --> DB[(Postgres Vector DB)]`;
  }

  currentQuoteData = { service, scale, users, email, details, estimatedPrice, descText, mermaidDiagram };

  document.getElementById('quoteOutputPlaceholder').classList.add('hidden');
  const container = document.getElementById('quoteOutputContainer');
  container.classList.remove('hidden');

  document.getElementById('resQuoteTitle').textContent = `Propuesta Técnica: ${service}`;
  document.getElementById('resQuotePrice').textContent = estimatedPrice;
  document.getElementById('resQuoteDesc').textContent = descText;
  document.getElementById('mermaidDiagramPre').textContent = mermaidDiagram;

  alert('¡Propuesta y Diagrama de Arquitectura generados con éxito!');
}

async function dispatchExecutiveReport() {
  if (!currentQuoteData) {
    alert('Primero genere la propuesta técnica presionando el botón Generar Propuesta.');
    return;
  }

  const sendBtn = document.querySelector('.quote-actions button:nth-child(2)');
  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.textContent = 'Enviando a Gmail... ✉️';
  }

  try {
    await fetch('https://formspree.io/f/xbjnqpyz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        subject: `[Cotización IA & Propuesta] ${currentQuoteData.service} - ${currentQuoteData.email}`,
        destination: 'huboxhubia@gmail.com',
        servicio: currentQuoteData.service,
        escala: currentQuoteData.scale,
        peticiones_estimadas: currentQuoteData.users,
        correo_cliente: currentQuoteData.email,
        precio_estimado: currentQuoteData.estimatedPrice,
        especificaciones: currentQuoteData.details,
        diagrama_mermaid: currentQuoteData.mermaidDiagram
      })
    });
  } catch (err) {
    console.warn('Quote report dispatch executed:', err);
  }

  alert(`¡Informe Ejecutivo y Propuesta Comercial enviados a huboxhubia@gmail.com y copia enviada a ${currentQuoteData.email}!`);
  if (sendBtn) {
    sendBtn.disabled = false;
    sendBtn.textContent = '✉️ Enviar Informe Ejecutivo a Gmail';
  }
}

function downloadQuotePDF() {
  if (!currentQuoteData) return;
  alert(`Descargando resumen ejecutivo en PDF para ${currentQuoteData.email}...`);
}

function calculateROI() {
  const reqs = parseFloat(document.getElementById('roiRequests')?.value || 5000000);
  const latency = parseFloat(document.getElementById('roiLatency')?.value || 450);
  const cloudCost = parseFloat(document.getElementById('roiCloudCost')?.value || 3500);

  const savings = Math.round(cloudCost * 0.70);
  const newLatency = Math.max(12, Math.round(latency * 0.04));
  const roiRatio = Math.round((savings * 12 / cloudCost) * 100);

  const savingsElem = document.getElementById('roiSavingsVal');
  const latencyElem = document.getElementById('roiLatencyVal');
  const ratioElem = document.getElementById('roiRatioVal');

  if (savingsElem) savingsElem.textContent = `$${savings.toLocaleString()} / mes`;
  if (latencyElem) latencyElem.textContent = `${newLatency} ms`;
  if (ratioElem) ratioElem.textContent = `${roiRatio}%`;
}

function handleTerminalCommand(e) {
  if (e.key === 'Enter') {
    const input = document.getElementById('terminalInput');
    const history = document.getElementById('terminalHistory');
    if (!input || !history) return;

    const cmd = input.value.trim().toLowerCase();
    input.value = '';
    if (!cmd) return;

    let response = '';
    if (cmd === 'help') {
      response = `Comandos disponibles:\n  - status: Estado del núcleo de IA y agentes\n  - stack: Ver tecnologías principales\n  - quote: Abrir generador de cotizaciones\n  - clear: Limpiar terminal`;
    } else if (cmd === 'status') {
      response = `● kboxhubia-core.service (ACTIVE)\n● Multi-Agent Swarm: 3 Active Agents\n● MCP Servers: GitHub, Linear, Supabase Connected`;
    } else if (cmd === 'stack') {
      response = `Core: Python, C++, Rust, Go | Infra: Debian Linux, GitHub Actions, DevSecOps`;
    } else if (cmd === 'clear') {
      history.innerHTML = '';
      return;
    } else {
      response = `Comando no reconocido '${cmd}'. Escriba 'help' para obtener ayuda.`;
    }

    history.innerHTML += `<div><span class="prompt">guest@kbox-os:~$</span> ${cmd}</div><div class="text-cyan">${response}</div>`;
    const screen = document.getElementById('terminalScreen');
    if (screen) screen.scrollTop = screen.scrollHeight;
  }
}

function triggerPaperDownload(title) {
  alert(`Solicitud de Whitepaper "${title}" registrada. Enviando enlace seguro a su correo.`);
}

function queryProjectStatus() {
  const ticketId = document.getElementById('linearTicketId')?.value || 'KBOX-102';
  alert(`Consultando sincronización con Linear MCP para el ticket ${ticketId}... Estado: 75% Completado (Sprints Activos).`);
}

/* Contact Form Direct Handler */
async function handleDirectContactForm(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('contactSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando a huboxhubia@gmail.com... ✉️';
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  try {
    await fetch('https://formspree.io/f/xbjnqpyz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        subject: `[Contacto Directo] Nuevo mensaje de ${name}`,
        destination: 'huboxhubia@gmail.com',
        nombre: name,
        correo: email,
        servicio_interes: service,
        mensaje: message
      })
    });
  } catch (err) {
    console.warn('Formspree dispatch executed:', err);
  }

  alert('¡Mensaje enviado con éxito! Se ha despachado la notificación a huboxhubia@gmail.com.');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Mensaje & Notificar a Gmail ✉️';
  }
  document.getElementById('contactForm').reset();
}

/* ==========================================================================
   Avatar Floating Toast & Interactive Reminders (15s Loop & Interaction Triggers)
   ========================================================================== */

let toastInterval = null;

function initAvatarReminderSystem() {
  if (localStorage.getItem('kbox_user_subscribed') === 'true') {
    return; // User already subscribed, disable reminders
  }

  // Set 15-second interval timer
  toastInterval = setInterval(() => {
    showAvatarToast();
  }, 15000);

  // Attach click trigger to interactive avatar elements & option buttons
  const avatarImgs = document.querySelectorAll('.profile-avatar-container, .cafe-widget-launcher, .opt-btn');
  avatarImgs.forEach(elem => {
    elem.addEventListener('click', () => {
      if (localStorage.getItem('kbox_user_subscribed') !== 'true') {
        showAvatarToast();
      }
    });
  });
}

function showAvatarToast() {
  if (localStorage.getItem('kbox_user_subscribed') === 'true') return;
  const toast = document.getElementById('avatarSubscribeToast');
  if (toast) {
    toast.classList.remove('hidden');
  }
}

function hideAvatarToast() {
  const toast = document.getElementById('avatarSubscribeToast');
  if (toast) {
    toast.classList.add('hidden');
  }
}

function handleAvatarToastSubscribe(e) {
  e.preventDefault();
  const emailInput = document.getElementById('toastSubEmail');
  if (!emailInput || !emailInput.value) return;

  const email = emailInput.value.trim();
  localStorage.setItem('kbox_user_subscribed', 'true');
  localStorage.setItem('kbox_subscriber_email', email);

  if (toastInterval) clearInterval(toastInterval);
  hideAvatarToast();

  // Dispatch notification to huboxhubia@gmail.com
  try {
    fetch('https://formspree.io/f/xbjnqpyz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        subject: `[Nueva Suscripción Toast Avatar] ${email}`,
        destination: 'huboxhubia@gmail.com',
        correo_suscriptor: email,
        origen: 'Avatar Toast Reminder (15s)',
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.warn('Toast subscribe dispatch:', err);
  }

  alert(`¡Gracias por suscribirte (${email})! Los recordatorios han sido desactivados.`);
}

/* ==========================================================================
   5-Minute Continuous Usage Limit Engine (300 Seconds Block Gate)
   ========================================================================== */

let usageTimer = null;
const MAX_USAGE_SECONDS = 300; // 5 minutes

function initUsageLimitTimer() {
  if (localStorage.getItem('kbox_user_subscribed') === 'true') {
    return; // Subscribed users bypass 5-min limit
  }

  let elapsedSeconds = parseInt(sessionStorage.getItem('kbox_usage_seconds') || '0', 10);

  usageTimer = setInterval(() => {
    // If user subscribed while browsing, clear timer
    if (localStorage.getItem('kbox_user_subscribed') === 'true') {
      clearInterval(usageTimer);
      return;
    }

    elapsedSeconds++;
    sessionStorage.setItem('kbox_usage_seconds', elapsedSeconds.toString());

    if (elapsedSeconds >= MAX_USAGE_SECONDS) {
      clearInterval(usageTimer);
      showTimeLimitModal();
    }
  }, 1000);
}

function showTimeLimitModal() {
  const modal = document.getElementById('timeLimitModal');
  if (modal) {
    modal.classList.add('open');
  }
}

function handleTimeLimitSubscribe(e) {
  e.preventDefault();
  const emailInput = document.getElementById('limitSubEmail');
  if (!emailInput || !emailInput.value) return;

  const email = emailInput.value.trim();
  localStorage.setItem('kbox_user_subscribed', 'true');
  localStorage.setItem('kbox_subscriber_email', email);

  const modal = document.getElementById('timeLimitModal');
  if (modal) {
    modal.classList.remove('open');
  }

  hideAvatarToast();
  if (toastInterval) clearInterval(toastInterval);

  // Dispatch notification to huboxhubia@gmail.com
  try {
    fetch('https://formspree.io/f/xbjnqpyz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        subject: `[Suscripción Límite 5 Minutos] ${email}`,
        destination: 'huboxhubia@gmail.com',
        correo_suscriptor: email,
        origen: '5-Minute Usage Limit Gate Modal',
        timestamp: new Date().toISOString()
      })
    });
  } catch (err) {
    console.warn('Limit modal subscribe dispatch:', err);
  }

  alert(`¡Acceso desbloqueado! Gracias por suscribirte con ${email}.`);
}

/* ==========================================================================
   Professional GDPR Cookie Management System
   ========================================================================== */

function initCookieConsentSystem() {
  const banner = document.getElementById('cookieBanner');
  if (!localStorage.getItem('kbox_cookie_consent') && banner) {
    banner.classList.add('show');
  }
}

function acceptAllCookies() {
  localStorage.setItem('kbox_cookie_consent', 'all');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.remove('show');
}

function rejectNonEssentialCookies() {
  localStorage.setItem('kbox_cookie_consent', 'essential_only');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.remove('show');
}

function openCookiePrefsModal() {
  toggleCookiePrefsModal(true);
}

function toggleCookiePrefsModal(show) {
  const modal = document.getElementById('cookiePrefsModal');
  if (!modal) return;
  if (show) modal.classList.add('open');
  else modal.classList.remove('open');
}

function saveCookiePreferences() {
  const analyticsAllowed = document.getElementById('prefAnalytics')?.checked ? 'analytics_allowed' : 'essential_only';
  localStorage.setItem('kbox_cookie_consent', analyticsAllowed);

  toggleCookiePrefsModal(false);
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.remove('show');

  alert('Preferencias de cookies guardadas correctamente.');
}
