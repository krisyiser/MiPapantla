// src/lib/fetchBusinesses.ts
export interface Business {
  id: number
  nombre: string
  giros: string[]
  descripcion: string
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
  photo: string
}

// === CONFIGURA AQUÍ TU HOJA ===
const SHEET_ID = '11Ra2_gzewBqAhs-5lo1cPBXI_RAy-YUMLmrJNu_Ufc8'
const TAB_NAME = 'Respuestas de formulario 1'

const url = `https://opensheet.vercel.app/${SHEET_ID}/${encodeURIComponent(TAB_NAME)}`

// Fila cruda que devuelve opensheet (todas las celdas como string o vacío)
type SheetRow = Record<string, string | null | undefined>

// Normaliza encabezados
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

// Drive -> URL directo
function normalizeDriveUrl(u: string) {
  if (!u) return ''
  const id =
    u.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
    u.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1]
  return id ? `https://drive.google.com/uc?export=view&id=${id}` : u
}

// =IMAGE("...") -> url
function extractImageFromFormula(v: string) {
  if (!v) return ''
  const m = v.match(/^\s*=?\s*image\s*\(\s*"(.*?)"/i)
  return m?.[1] || v
}

// =HYPERLINK("url","texto") -> url
function extractHyperlinkFromFormula(v: string) {
  if (!v) return ''
  const m = v.match(/^\s*=?\s*hyperlink\s*\(\s*"(.*?)"/i)
  return m?.[1] || v
}

export async function fetchBusinesses(): Promise<Business[]> {
  // Puedes usar ISR si quieres cachear: next.revalidate
  const res = await fetch(url, { next: { revalidate: 600 } })
  if (!res.ok) throw new Error('No se pudieron obtener los datos de la hoja')

  const rows = (await res.json()) as SheetRow[]
  if (!Array.isArray(rows) || rows.length === 0) return []

  return rows.map((row, idx) => {
    // normalizamos claves
    const nrow: Record<string, string> = {}
    Object.entries(row).forEach(([k, v]) => {
      nrow[normKey(k)] = (v ?? '').toString().trim()
    })

    const nombre      = nrow['nombre comercial del negocio'] || ''
    const giroRaw     = nrow['giro del negocio'] || ''
    const descripcion = nrow['breve descripcion del negocio'] || ''
    const direccion   = nrow['direccion completa'] || ''
    const referencia  = nrow['punto de referencia cercano'] || ''
    const telefono    = nrow['telefono celular de empresa whatsapp'] || nrow['telefono fijo de empresa opcional'] || ''
    const email       = nrow['correo electronico de contacto'] || ''
    const redes       = nrow['sitio web o redes sociales facebook instagram etc colocar link'] || ''
    const horario     = nrow['horario de atencion especifique por dia si varia'] || ''
    const precios     = nrow['rango de precios aproximado'] || ''
    const pagos       = splitCsv(nrow['formas de pago aceptadas'] || '')
    const servicios   = nrow['servicios o productos que ofrece'] || ''
    const especial    = nrow['que lo hace unico o especial frente a otros negocios similares'] || ''
    const idiomas     = nrow['ofrece atencion en algun idioma adicional al espanol'] || ''
    const dias        = nrow['dias de operacion'] || ''
    const googleMaps  = nrow['si respondio si por favor copie el enlace'] || ''
    const accesible   = /si/i.test(nrow['cuenta con instalaciones accesibles para personas con discapacidad'] || '')
    const extras      = splitCsv(nrow['servicios adicionales disponibles'] || '')
    const certific    = nrow['cuenta con algun tipo de certificacion turistica sanitaria o ambiental'] || ''

    // FOTO: acepta "Foto" o "Columna 29"
    let photoRaw = nrow['foto'] || nrow['columna 29'] || ''
    photoRaw = extractImageFromFormula(photoRaw)
    photoRaw = extractHyperlinkFromFormula(photoRaw)
    const photo = ensureHttp(normalizeDriveUrl(photoRaw))

    const giros = splitCsv(giroRaw).map(g => g.toLowerCase())

    return {
      id: idx + 1,
      nombre,
      giros,
      descripcion,
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
    }
  })
}
