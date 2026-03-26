// src/lib/fetchBusinesses.ts
export interface Business {
  id: number
  nombre: string
  giros: string[]
  descripcion: string          // breve (o derivada)
  descripcionLarga?: string    // larga
  direccion: string
  referencia: string
  telefono: string
  phoneDigits: string
  email: string
  redes: string
  horario: string
  precios: string
  pagos: string[]
  servicios: string
  especial: string
  idiomas: string
  dias: string
  googleMaps: string
  accesible: boolean
  extras: string[]
  certificaciones: string
  photo: string                // principal si hay
  photos?: string[]            // galería si hay

  // ===== Menú =====
  menuPhotos?: string[]        // si la carpeta tiene imágenes
  menuPdfUrl?: string | null   // si encontramos un PDF
  menuFolderUrl?: string | null// siempre: url cruda de la carpeta (fallback)
}

// === CONFIG HOJA ===
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '11Ra2_gzewBqAhs-5lo1cPBXI_RAy-YUMLmrJNu_Ufc8'
const TAB_NAME = 'Respuestas de formulario 1'
const url = `https://opensheet.vercel.app/${SHEET_ID}/${encodeURIComponent(TAB_NAME)}`

type SheetRow = Record<string, string | null | undefined>

// ------------------------- Utilidades generales -------------------------
function normKey(s: string) {
  return s
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function digitsOnly(s: string) {
  return (s || '').toString().replace(/[^\d]/g, '')
}

function splitCsv(s: string): string[] {
  if (!s) return []
  return s.split(/[,;•]| y /i).map(v => v.trim()).filter(Boolean)
}

function ensureHttp(u: string) {
  if (!u) return ''
  if (/^https?:\/\//i.test(u)) return u
  return `https://${u}`
}

// =HYPERLINK("url","texto") -> url
function extractHyperlinkFromFormula(v: string) {
  if (!v) return ''
  const m = v.match(/^\s*=?\s*hyperlink\s*\(\s*"(.*?)"/i)
  return m?.[1] || v
}

// Crea un resumen a partir de un texto más largo
function summarize(s: string, max = 180) {
  const txt = (s || '').trim()
  if (!txt) return ''
  if (txt.length <= max) return txt
  return txt.slice(0, max).replace(/\s+\S*$/, '') + '…'
}

// ------------------------- Google Drive helpers -------------------------
const DRIVE_API = 'https://www.googleapis.com/drive/v3/files'
const DRIVE_KEY = process.env.GOOGLE_DRIVE_API_KEY || ''

function getDriveFolderId(u?: string): string | null {
  if (!u) return null
  const a = u.match(/\/folders\/([a-zA-Z0-9_-]+)/)?.[1]
  if (a) return a
  const b = u.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1]
  return b || null
}

function driveImageUrl(id: string) {
  return `https://lh3.googleusercontent.com/d/${id}=s1600`
}

type DriveFile = {
  id: string
  name: string
  mimeType: string
  modifiedTime: string
  webViewLink?: string
  exportLinks?: Record<string, string>
}

async function listDriveFolderFiles(folderUrl: string): Promise<DriveFile[]> {
  const folderId = getDriveFolderId(folderUrl)
  if (!folderId || !DRIVE_KEY) return []

  const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`)
  const fields = encodeURIComponent('files(id,name,mimeType,modifiedTime,webViewLink,exportLinks)')
  const apiUrl = `${DRIVE_API}?q=${q}&fields=${fields}&pageSize=200&key=${DRIVE_KEY}`

  const res = await fetch(apiUrl, { next: { revalidate: 300 } })
  if (!res.ok) return []

  const json = await res.json() as { files?: DriveFile[] }
  return json.files || []
}

function pickImages(files: DriveFile[]): string[] {
  const imgs = files.filter(f => f.mimeType.startsWith('image/'))
  imgs.sort((a, b) => {
    const pa = a.name?.toLowerCase().includes('portada') ? -1 : 0
    const pb = b.name?.toLowerCase().includes('portada') ? -1 : 0
    if (pa !== pb) return pa - pb
    return new Date(b.modifiedTime).getTime() - new Date(a.modifiedTime).getTime()
  })
  return imgs.map(f => driveImageUrl(f.id))
}

function pickPdf(files: DriveFile[]): string | null {
  const pdf = files.find(f => f.mimeType === 'application/pdf')
  if (!pdf) return null
  return pdf.webViewLink || pdf.exportLinks?.['application/pdf'] || null
}

// ------------------------- Fetch principal (Dynamic Sheets) -------------------------
export async function fetchBusinesses(): Promise<Business[]> {
  let rows: SheetRow[] = [];
  try {
     // Fetch from OpenSheet con 10 mins de cache ISR
     const res = await fetch(url, { next: { revalidate: 600 } })
     if (!res.ok) throw new Error('Failed to fetch from sheet');
     rows = (await res.json()) as SheetRow[]
  } catch (error) {
     console.error('Error fetching businesses:', error);
     return [];
  }

  if (!Array.isArray(rows) || rows.length === 0) return []

  const items = await Promise.all(rows.map(async (row, idx) => {
    const nrow: Record<string, string> = {}
    Object.entries(row).forEach(([k, v]) => {
      nrow[normKey(k)] = (v ?? '').toString().trim()
    })

    const nombre = nrow['nombre comercial del negocio'] || ''
    const giroRaw = nrow['giro del negocio'] || ''

    const descripcionCorta = nrow['breve descripcion del negocio'] || ''
    const descripcionLarga =
      nrow['descripcion larga'] ||
      nrow['descripcion larga del negocio'] ||
      nrow['descripcion extendida'] || ''
    const descripcion = descripcionCorta || summarize(descripcionLarga)

    const direccion = nrow['direccion completa'] || ''
    const referencia = nrow['punto de referencia cercano'] || ''
    const telefono = nrow['telefono celular de empresa whatsapp'] || nrow['telefono fijo de empresa opcional'] || ''
    const email = nrow['correo electronico de contacto'] || ''
    const redes = nrow['sitio web o redes sociales facebook instagram etc colocar link'] || ''
    const horario = nrow['horario de atencion especifique por dia si varia'] || ''
    const precios = nrow['rango de precios aproximado'] || ''
    const pagos = splitCsv(nrow['formas de pago aceptadas'] || '')
    const servicios = nrow['servicios o productos que ofrece'] || ''
    const especial = nrow['que lo hace unico o especial frente a otros negocios similares'] || ''
    const idiomas = nrow['ofrece atencion en algun idioma adicional al espanol'] || ''
    const dias = nrow['dias de operacion'] || ''
    const googleMaps = nrow['si respondio si por favor copie el enlace'] || ''
    const accesible = /si/i.test(nrow['cuenta con instalaciones accesibles para personas con discapacidad'] || '')
    const extras = splitCsv(nrow['servicios adicionales disponibles'] || '')
    const certific = nrow['cuenta con algun tipo de certificacion turistica sanitaria o ambiental'] || ''

    // FOTOS (Siempre desde Drive)
    const fotosCellRaw = nrow['fotos'] || ''
    const fotosFolderUrl = ensureHttp(extractHyperlinkFromFormula(fotosCellRaw))
    let photo = '';
    let photos: string[] | undefined

    if (fotosFolderUrl) {
      try {
        const files = await listDriveFolderFiles(fotosFolderUrl)
        const imgs = pickImages(files)
        if (imgs.length) {
          photo = imgs[0]
          photos = imgs
        }
      } catch { /* skip */ }
    }

    // MENÚ
    const menuCellRaw = nrow['menu'] || ''
    const menuFolderUrl = ensureHttp(extractHyperlinkFromFormula(menuCellRaw)) || ''
    let menuPhotos: string[] | undefined
    let menuPdfUrl: string | null = null
    const menuFolderOut = menuFolderUrl || null

    if (menuFolderUrl) {
      try {
        const files = await listDriveFolderFiles(menuFolderUrl)
        menuPdfUrl = pickPdf(files)
        if (!menuPdfUrl) {
          const mImgs = pickImages(files)
          if (mImgs.length) menuPhotos = mImgs
        }
      } catch { /* skip */ }
    }

    const giros = splitCsv(giroRaw).map(g => g.toLowerCase())

    const item: Business = {
      id: idx + 1,
      nombre,
      giros,
      descripcion,
      descripcionLarga,
      direccion,
      referencia,
      telefono,
      phoneDigits: digitsOnly(telefono),
      email,
      redes: ensureHttp(redes),
      horario,
      precios,
      pagos,
      servicios,
      especial,
      idiomas,
      dias,
      googleMaps: ensureHttp(googleMaps),
      accesible,
      extras,
      certificaciones: certific,
      photo,
      photos,
      menuPhotos,
      menuPdfUrl,
      menuFolderUrl: menuFolderOut,
    }

    return item
  }))

  return items
}
