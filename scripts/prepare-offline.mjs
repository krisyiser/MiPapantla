/**
 * Este script prepara el proyecto para funcionar 100% OFFLINE (Totems sin internet).
 * 1. Descarga las imágenes del carrusel de Google Drive a local.
 * 2. Descarga la información de los negocios y sus fotos principales.
 * 3. Crea archivos JSON en 'public/' que la app usará como fallback.
 */

import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');
const OFFLINE_IMG_DIR = path.join(PUBLIC_DIR, 'images-offline');

// Crear carpetas si no existen
if (!fs.existsSync(OFFLINE_IMG_DIR)) {
  fs.mkdirSync(OFFLINE_IMG_DIR, { recursive: true });
}

// Configuración (Tomar de .env local si es necesario, o pasar como variables)
const SHEET_ID = '11Ra2_gzewBqAhs-5lo1cPBXI_RAy-YUMLmrJNu_Ufc8';
const DRIVE_API_KEY = process.env.GOOGLE_DRIVE_API_KEY;

async function downloadImage(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.buffer();
    const filePath = path.join(OFFLINE_IMG_DIR, filename);
    fs.writeFileSync(filePath, buffer);
    return `/images-offline/${filename}`;
  } catch (e) {
    console.error(`Error descargando ${url}:`, e);
    return null;
  }
}

async function prepareCarousel() {
  console.log('--- Preparando Carrusel Offline ---');
  if (!DRIVE_API_KEY) {
    console.error('Error: Falta GOOGLE_DRIVE_API_KEY para descargar imágenes del carrusel.');
    return;
  }

  const folderId = '1Xaj3N28CRtU1xTxITOJGFndoTYjXZBdW';
  const q = encodeURIComponent(`'${folderId}' in parents and mimeType contains 'image/' and trashed = false`);
  const fields = encodeURIComponent('files(id, name)');
  const driveApiUrl = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${DRIVE_API_KEY}`;

  const res = await fetch(driveApiUrl);
  const data = await res.json();
  const files = data.files || [];

  const carouselData = [];
  for (const file of files) {
    console.log(`Descargando imagen carrusel: ${file.name}`);
    const localUrl = await downloadImage(`https://lh3.googleusercontent.com/d/${file.id}=s1600`, `carousel_${file.id}.jpg`);
    if (localUrl) {
      carouselData.push({
        id: file.id,
        url: localUrl,
        alt: file.name
      });
    }
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, 'carousel-offline.json'), JSON.stringify(carouselData, null, 2));
  console.log('Carrusel guardado en public/carousel-offline.json');
}

async function prepareBusinesses() {
  console.log('--- Preparando Negocios Offline ---');
  try {
    const url = `https://opensheet.vercel.app/${SHEET_ID}/Respuestas de formulario 1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('No se pudo conectar con Google Sheets');
    let rows = await res.json();
    
    console.log(`[INFO] Procesando ${rows.length} negocios para descarga de imágenes...`);

    // Descargar imágenes de negocios (solo la principal para ahorrar espacio)
    for (const [idx, row] of rows.entries()) {
      // Intentamos identificar la columna de la foto (usando la lógica de fetchBusinesses.ts)
      const fotoUrlRaw = row['Fotos'] || row['fotos'] || '';
      
      // Si tiene una URL que parece de Google Drive (lh3)
      if (fotoUrlRaw.includes('drive.google.com') || fotoUrlRaw.includes('lh3.googleusercontent.com')) {
        const fileIdMatch = fotoUrlRaw.match(/\/d\/([a-zA-Z0-9_-]+)/) || fotoUrlRaw.match(/id=([a-zA-Z0-9_-]+)/);
        const folderId = fileIdMatch ? fileIdMatch[1] : null;

        if (folderId) {
          const driveUrl = `https://lh3.googleusercontent.com/d/${folderId}=s600`;
          const filename = `business_${idx}.jpg`;
          const localPath = await downloadImage(driveUrl, filename);
          if (localPath) {
             // Actualizar la fila para que use la ruta local
             row['foto_offline'] = localPath;
          }
        }
      }
    }

    // Guardamos los datos para que Next.js los use en el build (o como fallback)
    fs.writeFileSync(path.join(PUBLIC_DIR, 'businesses-offline.json'), JSON.stringify(rows, null, 2));
    console.log(`[OK] Datos de ${rows.length} negocios guardados en public/businesses-offline.json`);
    
  } catch (e) {
    console.error('Error preparando negocios:', e);
  }
}

async function run() {
  console.log('--- EXPORTANDO PARA TOTEM (MODO OFFLINE TOTAL) ---');
  await prepareCarousel();
  await prepareBusinesses();
  console.log('--------------------------------------------------');
  console.log('PASOS FINALES:');
  console.log('1. Ejecuta: "npm run build"');
  console.log('2. Copia la carpeta "out" y el archivo "totem-start.bat" a tu USB.');
  console.log('3. ¡Listo! El Tótem podrá abrir el proyecto sin internet.');
  console.log('--------------------------------------------------');
}

run();
