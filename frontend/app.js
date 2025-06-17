// frontend/app.js

const API = 'https://pruebaslide3.onrender.com/api';
const STREAMWISH_KEY = '26687qtx53fsc42bilx4m';
const app = document.getElementById('app');
let idiomaActual = localStorage.getItem('idiomaActual') || 'latino';

window.addEventListener('popstate', router);
window.addEventListener('hashchange', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      // extraemos la parte después del '#' o la añadimos
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        navigateTo(href);
      } else {
        navigateTo('#' + new URL(href).pathname + window.location.search);
      }
    }
  });

  // Buscador de anime en header (sin cambios)
  const input = document.getElementById('anime-search');
  const sugg  = document.getElementById('anime-suggestions');
  const icon  = document.querySelector('.search-icon');
  input.addEventListener('input',  /* ...tu código... */);
  sugg.addEventListener('click',  /* ...tu código... */);
  input.addEventListener('keydown', /* ...tu código... */);
  icon.addEventListener('click',   /* ...tu código... */);

  // Arrancamos en base al hash actual
  router();
});


function navigateTo(hash) {
  // Cambiamos sólo el hash, sin recargar la página
  location.hash = hash;
}


function router() {
  // Leemos el hash sin el '#'
  const hash = location.hash.slice(1);
  // Dividimos ruta y query
  const [path, queryString] = hash.split('?');
  const parts = (path || '').split('/').filter(Boolean).map(p => p.toLowerCase());
  const params = new URLSearchParams(queryString || '');

  const sc = document.querySelector('.search-container');
  const slides = document.getElementById('slides-root');
  const recientes = document.getElementById('recientes');

  // Ruta raíz o /anime
  if (parts.length === 0 || (parts[0] === 'anime' && parts.length === 1)) {
    sc.style.display = 'flex';
    slides.style.display = 'block';
    recientes.style.display = 'block';

    renderAnimeView(params.get('search') || '');
    initSlides();
    return;
  }

  // /manga ...
  if (parts[0] === 'manga') {
    sc.style.display = 'none';
    slides.style.display = 'none';
    recientes.style.display = 'none';

    if (parts.length === 1) renderMangaView();
    else if (parts.length === 2) renderMangaChapters(decodeURIComponent(parts[1]));
    else renderMangaImages(
      decodeURIComponent(parts[1]),
      decodeURIComponent(parts[2])
    );
    return;
  }

  // /anime/:key/:ep
  if (parts[0] === 'anime' && parts.length === 3) {
    sc.style.display = 'flex';
    slides.style.display = 'none';
    recientes.style.display = 'none';
    renderAnimePlayer(parts[1], parts[2]);
    return;
  }

  // 404
  sc.style.display = 'none';
  slides.style.display = 'none';
  recientes.style.display = 'none';
  renderNotFound();
}


/* ================================
   VISTA ANIME (lista)
================================ */
function renderAnimeView(searchTerm = '') {
  document.title = 'Series de Anime – Anime & Manga';
  app.innerHTML = `
    <h1>Series de Anime</h1>
    <div class="grid-cards" id="anime-list"></div>
  `;
  populateAnimeGrid(searchTerm);
}

function populateAnimeGrid(searchTerm) {
  const cont = document.getElementById('anime-list');
  cont.innerHTML = '';
  let entries = Object.entries(animeData);

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    const starts = entries.filter(([, i]) => i.name.toLowerCase().startsWith(q));
    const contains = entries.filter(([, i]) =>
      i.name.toLowerCase().includes(q) && !i.name.toLowerCase().startsWith(q)
    );
    entries = [...starts, ...contains];
  }

  entries.forEach(([key, { name, imgUrl }]) => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `<img src="${imgUrl}" alt="${name}"><p>${name}</p>`;
    card.onclick = () => navigateTo(`/anime/${key}/1`);
    cont.appendChild(card);
  });
}

/* ================================
   VISTAS MANGA
   (idénticas a las tuyas, sin cambios…)
================================ */
// renderMangaView, renderMangaChapters, renderMangaImages…

/* ================================
   VISTA PLAYER ANIME
================================ */
// renderAnimePlayer…

/* ================================
   INICIALIZAR SLIDES (idéntica)
================================ */

/* ================================
   VISTAS MANGA
================================ */
async function renderMangaView() {
  document.title = 'Manga - Anime & Manga';
  app.innerHTML = `<h1>Series de Manga</h1><div class="grid-cards" id="manga-list"></div>`;
  const series = await fetch(`${API}/capitulos`).then(r => r.json());
  const cont = document.getElementById('manga-list');

  series.forEach(({ name }) => {
    const card = document.createElement('div');
    card.className = 'manga-card';
    card.innerHTML = `<img src="" alt="${name}"><p>${name}</p>`;
    card.onclick = () => navigateTo(`/manga/${encodeURIComponent(name)}`);

    fetch(`${API}/portada/${encodeURIComponent(name)}`)
      .then(r => r.json())
      .then(({ url }) => {
        card.querySelector('img').src = url || placeholder();
      })
      .catch(() => {
        card.querySelector('img').src = placeholder();
      });

    cont.appendChild(card);
  });
}

async function renderMangaChapters(serie) {
  document.title = `${serie} - Manga - Anime & Manga`;
  app.innerHTML = `
    <button id="back">← Volver</button>
    <h2>${serie}</h2>
    <div class="grid-cards" id="manga-chaps"></div>
  `;
  document.getElementById('back').onclick = () => history.back();

  const subs = await fetch(`${API}/subcapitulos/${encodeURIComponent(serie)}`)
    .then(r => r.json());
  const cont = document.getElementById('manga-chaps');

  subs.forEach(({ name }) => {
    const card = document.createElement('div');
    card.className = 'capitulo-card';
    card.innerHTML = `<p>${name}</p>`;
    card.onclick = () =>
      navigateTo(`/manga/${encodeURIComponent(serie)}/${encodeURIComponent(name)}`);
    cont.appendChild(card);
  });
}

async function renderMangaImages(serie, cap) {
  document.title = `${serie} / ${cap} - Manga - Anime & Manga`;
  app.innerHTML = `
    <button id="back">← Volver</button>
    <h2>${serie} / ${cap}</h2>
    <div class="mode-switch">
      <button id="btn-cascade">Cascada</button>
      <button id="btn-carousel">Carrusel</button>
    </div>
    <div id="cascade" class="cascade-mode"><div id="images-cascade"></div></div>
    <div id="carousel" class="carousel-mode" style="display:none">
      <span id="prev">&#10094;</span>
      <img id="img-carousel" src="" alt="">
      <span id="next">&#10095;</span>
    </div>
  `;
  document.getElementById('back').onclick = () => history.back();

  const imgs = await fetch(
    `${API}/imagenes/${encodeURIComponent(serie)}/${encodeURIComponent(cap)}`
  ).then(r => r.json()).catch(() => []);

  const cascadeContainer = document.getElementById('images-cascade');
  const carouselImg = document.getElementById('img-carousel');
  let idx = 0;

  imgs.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    cascadeContainer.appendChild(img);
  });
  if (imgs.length) carouselImg.src = imgs[0];

  document.getElementById('btn-cascade').onclick = () => {
    document.getElementById('cascade').style.display = 'block';
    document.getElementById('carousel').style.display = 'none';
    idx = 0;
    if (imgs.length) carouselImg.src = imgs[idx];
  };
  document.getElementById('btn-carousel').onclick = () => {
    document.getElementById('cascade').style.display = 'none';
    document.getElementById('carousel').style.display = 'flex';
    idx = 0;
    if (imgs.length) carouselImg.src = imgs[idx];
  };
  document.getElementById('prev').onclick = () => {
    if (!imgs.length) return;
    idx = (idx - 1 + imgs.length) % imgs.length;
    carouselImg.src = imgs[idx];
  };
  document.getElementById('next').onclick = () => {
    if (!imgs.length) return;
    idx = (idx + 1) % imgs.length;
    carouselImg.src = imgs[idx];
  };
}

/* ================================
   VISTA PLAYER ANIME
================================ */
async function renderAnimePlayer(key, startIndex) {
  const info = animeData[key];
  if (!info) return renderNotFound();

  document.title = `${info.name} – Player`;
  app.innerHTML = '';

  // Portada e info
  const ficha = infoAnimes[key] || {};
  const divInfo = document.createElement('div');
  divInfo.className = 'info-anime';
  divInfo.innerHTML = `
    <div class="info-portada">
      <img src="${ficha.imagen || info.imgUrl}" alt="Portada ${ficha.nombre || info.name}">
    </div>
    <div class="info-datos">
      <h2>${ficha.nombre || info.name}</h2>
      ${ficha.año ? `<p><strong>Año:</strong> ${ficha.año}</p>` : ''}
      ${ficha.genero ? `<p><strong>Género:</strong> ${ficha.genero}</p>` : ''}
      ${ficha.descripcion ? `<p class="descripcion">${ficha.descripcion}</p>` : ''}
    </div>
  `;
  app.appendChild(divInfo);

  // Contenedor 3 columnas
  const player = document.createElement('div');
  player.className = 'player-container';

  // Izquierda: capítulos
  const chapPanel = document.createElement('div');
  chapPanel.className = 'chapter-panel';
  chapPanel.innerHTML = `
    <h3>CAPÍTULOS</h3>
    <input type="text" id="chap-search" placeholder="Buscar capítulo">
    <div class="chapter-list"><ul id="chap-list"></ul></div>
    <div class="chapter-nav">
      <button id="chap-up">↑</button>
      <button id="chap-down">↓</button>
    </div>
  `;
  player.appendChild(chapPanel);

  // Centro: idioma + video
  const central = document.createElement('div');
  central.className = 'video-panel';
  central.innerHTML = `
    <div id="idioma-selector">
      <button id="btnLatino" class="idioma-btn">Latino</button>
      <button id="btnJapones" class="idioma-btn">Japonés</button>
    </div>
    <div id="video-player"></div>
  `;
  player.appendChild(central);

  // Derecha: relaciones
  const right = document.createElement('aside');
  right.className = 'sidebar-relations';
  player.appendChild(right);

  app.appendChild(player);

  // Selector de idioma
  const btnLat = document.getElementById('btnLatino');
  const btnJap = document.getElementById('btnJapones');
  if (!info.idLatino) btnLat.style.display = 'none';
  if (!info.idJapones) btnJap.style.display = 'none';
  idiomaActual = (!info.idLatino && info.idJapones)
    ? 'japones'
    : (info.idLatino && !info.idJapones)
    ? 'latino'
    : idiomaActual;
  localStorage.setItem('idiomaActual', idiomaActual);
  btnLat.classList.toggle('activo', idiomaActual === 'latino');
  btnJap.classList.toggle('activo', idiomaActual === 'japones');
  btnLat.addEventListener('click', () => cambiarIdioma('latino'));
  btnJap.addEventListener('click', () => cambiarIdioma('japones'));

  // Carga y renderizado de capítulos
  const ul = document.getElementById('chap-list');
  const videoPlayer = document.getElementById('video-player');
  let currentIdx = parseInt(startIndex) - 1;
  let files = [];

  async function cargarCapitulos() {
    const fld = idiomaActual === 'latino' ? info.idLatino : info.idJapones;
    if (!fld) {
      ul.innerHTML = '<li>No disponible</li>';
      return;
    }
    try {
      const res = await fetch(
        `https://api.streamwish.com/api/folder/list?key=${STREAMWISH_KEY}&fld_id=${fld}&files=1`
      );
      const data = await res.json();
      files = (data.result.files || []).sort((a, b) => {
        const num = s => { const m = s.match(/(\d{1,3})/g); return m ? parseInt(m.pop()) : 0; };
        return num(a.title) - num(b.title);
      });
      renderLista();
      // cargar primer video automáticamente
      if (files.length) loadVideo(files[0].file_code, 0);
    } catch {
      ul.innerHTML = '<li>Error al cargar capítulos</li>';
    }
  }

  function renderLista() {
    ul.innerHTML = '';
    files.forEach((v, i) => {
      const li = document.createElement('li');
      li.textContent = i + 1;
      li.dataset.index = i;
      li.addEventListener('click', () => loadVideo(v.file_code, i));
      ul.appendChild(li);
    });
    const prev = ul.querySelector('li.active');
    if (prev) prev.classList.remove('active');
    const cur = ul.querySelector(`li[data-index="${currentIdx}"]`);
    if (cur) cur.classList.add('active');
  }

  document.getElementById('chap-up').onclick = () => {
    document.querySelector('.chapter-list').scrollBy({ top: -100, behavior: 'smooth' });
  };
  document.getElementById('chap-down').onclick = () => {
    document.querySelector('.chapter-list').scrollBy({ top: 100, behavior: 'smooth' });
  };

  document.getElementById('chap-search').addEventListener('input', e => {
    const q = e.target.value.trim();
    if (!q) return;
    // desplazar sin ocultar
    const target = ul.querySelector(`li:nth-child(${parseInt(q)})`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  function loadVideo(code, idx) {
    videoPlayer.innerHTML = `<iframe src="https://streamwish.to/e/${code}" frameborder="0" allowfullscreen></iframe>`;
    currentIdx = idx;
    renderLista();
  }

  function cambiarIdioma(nuevo) {
    if (idiomaActual === nuevo) return;
    idiomaActual = nuevo;
    localStorage.setItem('idiomaActual', idiomaActual);
    btnLat.classList.toggle('activo', idiomaActual === 'latino');
    btnJap.classList.toggle('activo', idiomaActual === 'japones');
    cargarCapitulos();
  }

  await cargarCapitulos();

  // Relaciones dinámicas
  function renderRelaciones(currentKey, container) {
    const infoRel = animeData[currentKey].relaciones;
    if (!infoRel) return;
    const tiposLabels = {
      precuela: "Precuela", secuela: "Secuela",
      serie: "Serie", ovas: "OVA",
      especiales: "Especiales", peliculas: "Películas",
      liveaction: "Live Action"
    };
    Object.entries(infoRel).forEach(([tipo, valor]) => {
      const keys = Array.isArray(valor) ? valor : [valor];
      keys.forEach(idRel => {
        const animeR = animeData[idRel];
        if (!animeR) return;
        const div = document.createElement('div');
        div.className = 'rel-item';
        div.innerHTML = `
          <a href="/anime/${idRel}/1" data-link>
            <img src="${animeR.imgUrl}" alt="${animeR.name}">
            <p>${tiposLabels[tipo] || tipo}</p>
          </a>
        `;
        container.appendChild(div);
      });
    });
  }

  renderRelaciones(key, right);
}
