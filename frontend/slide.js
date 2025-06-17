function initSlides() {
  // Contenedores destino en el HTML
  const agregadosCont = document.querySelector('.slide-agregados');
  const estrenosCont  = document.querySelector('.slide-estrenos');

  // Si no hay ninguno, salimos
  if (!agregadosCont && !estrenosCont) return;

  // Solo en la lista principal de animes
  const path = location.pathname;
  const isAnimeList = (
    path === '/' ||
    (path.startsWith('/anime') && !location.search.includes('search=') && location.search === '')
  );
  if (!isAnimeList) {
    if (agregadosCont) agregadosCont.innerHTML = '';
    if (estrenosCont)  estrenosCont.innerHTML = '';
    return;
  }

  // Separar claves por estado
  const agregadoKeys = [];
  const estrenoKeys  = [];
  for (const [key, info] of Object.entries(infoAnimes)) {
    if (info.estado === 'agregado') agregadoKeys.push(key);
    if (info.estado === 'estreno')  estrenoKeys.push(key);
  }

  // Función genérica para renderizar tarjetas en un container
  const renderCards = (container, keys, titulo) => {
    container.innerHTML = '';               // limpia contenido previo
    const h3 = document.createElement('h3');
    h3.textContent = titulo;                // título semántico
    container.appendChild(h3);

    keys.forEach(key => {
      const anime = infoAnimes[key];
      const card = document.createElement('div');
      card.className = 'slide-card';
      card.innerHTML = `
        <img src="${anime.imagen}" alt="${anime.nombre}">
        <p>${anime.nombre}</p>
      `;
      card.onclick = () => navigateTo(`/anime/${key}/1`);
      container.appendChild(card);
    });
  };

  // Inyectar en cada contenedor si existe
  if (agregadosCont) renderCards(agregadosCont, agregadoKeys, 'Agregados');
  if (estrenosCont)  renderCards(estrenosCont,  estrenoKeys,  'Estrenos');
}

window.addEventListener('DOMContentLoaded', initSlides);
window.addEventListener('popstate', initSlides);
