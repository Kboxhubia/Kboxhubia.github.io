document.addEventListener('DOMContentLoaded', () => {
  const yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const repoList = document.getElementById('repo-list');
  if (repoList) {
    fetch('https://api.github.com/users/Kboxhubia/repos?per_page=6')
      .then((response) => response.ok ? response.json() : [])
      .then((repos) => {
        if (!Array.isArray(repos) || repos.length === 0) {
          repoList.innerHTML = '<p>No pude cargar los repositorios públicos en este momento.</p>';
          return;
        }

        repoList.innerHTML = repos
          .sort((a, b) => Number(b.stargazers_count || 0) - Number(a.stargazers_count || 0))
          .map((repo) => `
            <article class="card">
              <span class="tag">Repo</span>
              <h3>${repo.name}</h3>
              <p>${repo.description || 'Sin descripción disponible.'}</p>
              <p><strong>⭐</strong> ${repo.stargazers_count || 0} · <strong>🍴</strong> ${repo.forks_count || 0}</p>
              <a class="btn ghost" href="${repo.html_url}" target="_blank" rel="noreferrer">Abrir</a>
            </article>
          `)
          .join('');
      })
      .catch(() => {
        repoList.innerHTML = '<p>La API de GitHub no respondió en este momento.</p>';
      });
  }

  const uploadForm = document.getElementById('privateUploadForm');
  const fileInput = document.getElementById('privateFiles');
  const uploadSummary = document.getElementById('uploadSummary');

  if (uploadForm && fileInput && uploadSummary) {
    const key = 'kboxhubia-private-uploads';
    const readSaved = () => {
      try {
        return JSON.parse(localStorage.getItem(key) || '[]');
      } catch {
        return [];
      }
    };

    const renderSummary = () => {
      const saved = readSaved();
      if (!saved.length) {
        uploadSummary.innerHTML = '<p>No hay archivos guardados en este navegador.</p>';
        return;
      }

      uploadSummary.innerHTML = `
        <p><strong>${saved.length}</strong> archivo(s) guardado(s) localmente.</p>
        <ul>${saved.map((name) => `<li>${name}</li>`).join('')}</ul>
      `;
    };

    renderSummary();

    uploadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const files = Array.from(fileInput.files || []);
      if (!files.length) {
        uploadSummary.innerHTML = '<p>Debes seleccionar al menos un archivo antes de guardar.</p>';
        return;
      }

      const existing = readSaved();
      const names = files.map((file) => file.name);
      const merged = [...new Set([...existing, ...names])];
      localStorage.setItem(key, JSON.stringify(merged));
      renderSummary();
      fileInput.value = '';
      uploadSummary.insertAdjacentHTML('beforeend', '<p>Los archivos quedaron disponibles en este navegador para una carga posterior a un almacenamiento privado.</p>');
    });
  }
});
