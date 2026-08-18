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

/* 4. Language Toggle Mock / Multilingual Handler */
let currentLang = 'ES';
function initLanguageToggle() {
  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'ES' ? 'EN' : 'ES';
      langBtn.innerHTML = currentLang === 'ES'
        ? '<span class="lang-code">ES</span> / <span class="lang-code dimmed">EN</span>'
        : '<span class="lang-code dimmed">ES</span> / <span class="lang-code">EN</span>';

      // Simple alert or notice indicating language state
      console.log(`Idioma cambiado a: ${currentLang}`);
    });
  }
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
