// backend/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 1) Listar series (carpetas raíz)
app.get('/api/capitulos', async (req, res) => {
  try {
    const result = await cloudinary.api.sub_folders('');
    const series = result.folders.map(f => ({ name: f.name }));
    res.json(series);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener series' });
  }
});

// 2) Obtener portada de serie
app.get('/api/portada/:serie', async (req, res) => {
  const { serie } = req.params;
  try {
    const result = await cloudinary.search
      .expression(`folder:${serie}`)
      .sort_by('public_id','asc')
      .max_results(1)
      .execute();
    res.json({ url: result.resources[0]?.secure_url || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener portada' });
  }
});

// 3) Listar capítulos (subcarpetas) de una serie (usado SOLO para manga)
app.get('/api/subcapitulos/:serie', async (req, res) => {
  const { serie } = req.params;
  try {
    const result = await cloudinary.api.sub_folders(serie);
    const subs = result.folders.map(f => ({ name: f.name }));
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener subcapítulos' });
  }
});

// 4) Obtener imágenes de un capítulo
app.get('/api/imagenes/:serie/:capitulo', async (req, res) => {
  const { serie, capitulo } = req.params;
  const folder = `${serie}/${capitulo}`;
  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by('public_id','asc')
      .max_results(500)
      .execute();
    const urls = result.resources.map(r => r.secure_url);
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
