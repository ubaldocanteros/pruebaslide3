function initSlides() {
  const root = document.getElementById('slides-root');
  if (!root) return;

  const path = location.pathname;
  const isAnimeList = (
    path === '/' ||
    (path.startsWith('/anime') && !location.search.includes('search=') && location.search === '')
  );
  if (!isAnimeList) {
    root.innerHTML = '';
    return;
  }

  const agregadoKeys = [];
  const estrenoKeys = [];

  for (const [key, info] of Object.entries(infoAnimes)) {
    if (info.estado === 'agregado') agregadoKeys.push(key);
    if (info.estado === 'estreno') estrenoKeys.push(key);
  }

  const makeSlideColumn = (keys, positionClass, titulo) => {
    const cont = document.createElement('div');
    cont.className = `slide-section ${positionClass}`;
    const h3 = document.createElement('h3');
    h3.textContent = titulo.toUpperCase();
    cont.appendChild(h3);

    keys.forEach(key => {
      const anime = infoAnimes[key];
      const card = document.createElement('div');
      card.className = 'slide-card';
      card.innerHTML = `
        <img src="${anime.imagen}" alt="${anime.nombre}">
        <p>${anime.nombre}</p>
      `;
      card.onclick = () => navigateTo(`/anime/${key}/1`);
      cont.appendChild(card);
    });

    return cont;
  };

  root.innerHTML = '';
  if (agregadoKeys.length) root.appendChild(makeSlideColumn(agregadoKeys, 'slide-izq', 'Agregados'));
  if (estrenoKeys.length) root.appendChild(makeSlideColumn(estrenoKeys, 'slide-der', 'Estrenos'));
}

window.addEventListener('DOMContentLoaded', initSlides);
window.addEventListener('popstate', initSlides);
