function initSlides() {
  // No buscamos slides-root porque no existe más
  const agregadosCont = document.querySelector('.slide-agregados');
  const estrenosCont = document.querySelector('.slide-estrenos');

  if (!agregadosCont && !estrenosCont) return;

  const path = location.pathname;
  const isAnimeList = (
    path === '/' ||
    (path.startsWith('/anime') && !location.search.includes('search=') && location.search === '')
  );
  if (!isAnimeList) {
    if (agregadosCont) agregadosCont.innerHTML = '';
    if (estrenosCont) estrenosCont.innerHTML = '';
    return;
  }

  const agregadoKeys = [];
  const estrenoKeys = [];

  for (const [key, info] of Object.entries(infoAnimes)) {
    if (info.estado === 'agregado') agregadoKeys.push(key);
    if (info.estado === 'estreno') estrenoKeys.push(key);
  }

  const makeSlideColumn = (keys, titulo) => {
    const cont = document.createElement('div');
    cont.className = 'slide-section';
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

  if (agregadosCont) {
    agregadosCont.innerHTML = ''; // limpiamos el aside
    agregadosCont.appendChild(makeSlideColumn(agregadoKeys, 'Agregados'));
  }

  if (estrenosCont) {
    estrenosCont.innerHTML = ''; // limpiamos el aside
    estrenosCont.appendChild(makeSlideColumn(estrenoKeys, 'Estrenos'));
  }
}

window.addEventListener('DOMContentLoaded', initSlides);
window.addEventListener('popstate', initSlides);
