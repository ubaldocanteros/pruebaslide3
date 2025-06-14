const MAX_RECIENTES = 20;

async function fetchCapitulosRecientes() {
  const allCaps = [];

  for (const [animeKey, info] of Object.entries(animeData)) {
    const ids = [];
    if (info.idLatino) ids.push(info.idLatino);
    if (info.idJapones) ids.push(info.idJapones);

    for (const fldId of ids) {
      try {
        const url = new URL('https://api.streamwish.com/api/file/list');
        url.searchParams.set('key', STREAMWISH_KEY);
        url.searchParams.set('fld_id', fldId);
        url.searchParams.set('per_page', 100);
        url.searchParams.set('public', ''); // opcional: ajustar visibilidad

        const res = await fetch(url);
        const data = await res.json();
        const files = (data.result && data.result.files) ? data.result.files : [];

        files.forEach(file => {
          const fecha = file.uploaded ? new Date(file.uploaded) : new Date(0);
          allCaps.push({
            animeKey,
            numero: parseInt((file.title.match(/\d+/) || [0])[0], 10),
            fecha,
            thumb: file.thumbnail || null
          });
        });

      } catch (e) {
        console.warn(`Error conversando con file/list fld ${fldId}:`, e);
      }
    }
  }

  allCaps.sort((a, b) => b.fecha - a.fecha);

  return allCaps.slice(0, MAX_RECIENTES);
}

function renderRecientes(caps) {
  const cont = document.getElementById('recientes-list');
  cont.innerHTML = '';

  caps.forEach(({ animeKey, numero, thumb }) => {
    const info = animeData[animeKey];
    const card = document.createElement('div');
    card.className = 'recent-card';

    const imgSrc = thumb || info.imgUrl;
    card.innerHTML = `
      <img src="${imgSrc}" alt="${info.name}">
      <p>${info.name}</p>
      <p>Capítulo ${numero}</p>
    `;

    card.onclick = () => navigateTo(`/anime/${animeKey}/${numero}`);
    cont.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const recientes = await fetchCapitulosRecientes();
  renderRecientes(recientes);
});
