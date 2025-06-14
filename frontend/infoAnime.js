// frontend/infoAnime.js
const infoAnimes = {
  opm: {
    nombre: "One Punch Man",
    año: 2015,
    genero: "Acción, Comedia, Superhéroes",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377140/One_Punch_Man_hnv4pt.webp",
    descripcion: "Saitama, un héroe que vence a cualquier enemigo de un solo golpe, busca emoción en la batalla.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2015-10-05"       // <<< NUEVO
  },
  opm2: {
    nombre: "One Punch Man 2",
    año: 2019,
    genero: "Acción, Comedia, Superhéroes",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748727436/One_Punch_Man_2T_Anime_c1orqv.webp",
    descripcion: "Mientras Saitama busca nuevos desafíos, la Asociación de Héroes enfrenta amenazas crecientes.",
    estado: "estreno",         // <<< NUEVO
    fecha:  "2025-06-10"       // <<< NUEVO (ejemplo: estreno hoy)
  },
  naruto: {
    nombre: "Naruto",
    año: 2002,
    genero: "Shōnen, Aventura, Ninja",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748377137/MV5BZTNjOWI0ZTAtOGY1OS00ZGU0LWEyOWYtMjhkYjdlYmVjMDk2XkEyXkFqcGc_._V1_FMjpg_UX1000__ryemcd.jpg",
    descripcion: "Naruto Uzumaki, un joven ninja solitario, sueña con convertirse en el Hokage y ganarse el respeto de su aldea.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2002-10-03"       // <<< NUEVO    
    // sin estado → no sale en ningún slide
  },
  zatchbell: {
    nombre: "ZatchBell",
    año: 2003,
    genero: "Aventura, Fantasía, Comedia",
    imagen: "https://res.cloudinary.com/dj5v7zdxp/image/upload/v1748312916/zatchbell_yenllr.jpg",
    descripcion: "Kiyo y Zatch luchan contra otros mamodos para convertirse en el rey del mundo mamodo.",
    estado: "agregado",        // <<< NUEVO
    fecha:  "2003-04-05"       // <<< NUEVO
  },
  // ... resto sin modificar
};
