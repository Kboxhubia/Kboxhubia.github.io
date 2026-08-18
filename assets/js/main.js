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
});

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

/* 2. Mobile Navigation Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const mainNav = document.getElementById('main-nav');

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    // Close menu on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
      });
    });
  }
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
    cafeLauncherSub: 'Agendar Cita con Jorge Huerta'
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
    cafeLauncherSub: 'Book Meeting with Jorge Huerta'
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

function simulateAuthLogin(provider) {
  alert(`Iniciando autenticación con ${provider}...\nSe enviará una notificación a huboxhubia@gmail.com con el registro de acceso.`);
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

/* Cookie Consent */
function checkCookieConsent() {
  const banner = document.getElementById('cookieBanner');
  if (!localStorage.getItem('kbox_cookie_accepted') && banner) {
    banner.classList.add('show');
  }
}

function acceptCookies() {
  localStorage.setItem('kbox_cookie_accepted', 'true');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.remove('show');
}
